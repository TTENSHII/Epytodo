module.exports = function(app, bcrypt, jwt, db) {
    app.put("/todos/:id", (req, res) => {
        const token = req.headers['access_token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ msg: "Token is not valid" });
                } else {
                    const new_todo = {
                        title: req.body.title,
                        description: req.body.description,
                        due_time: req.body.due_time,
                        user_id: req.body.user_id,
                        status: req.body.status
                    }
                    if (!req.body.title || !req.body.description || !req.body.user_id || !req.body.status) {
                        res.status(400).send("All input is required");
                    } else {
                        db.query("UPDATE todo SET ? WHERE id = ?", [new_todo, req.params.id], (err, result) => {
                            if (err) console.error(err);
                        });
                        db.execute('SELECT * FROM `todo` WHERE id = ?', [req.params.id], function(err, results, fields) {
                            if (results.length > 0) {
                                res.status(200).json(results[0]);
                            } else {
                                res.status(404).json({ msg: "Not found" });
                            }
                        });
                    }
                }
            });
        } else {
            res.status(401).json({ msg: "No token, authorization denied" });
        }
    });
};
