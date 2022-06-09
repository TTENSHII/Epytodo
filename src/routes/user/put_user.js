module.exports = function(app, bcrypt ,jwt, db) {
    app.put("/users/:id", (req, res) => {
        const token = req.headers['access_token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ msg: "Token is not valid" });
                } else if (decoded.email) {
                    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        firstname: req.body.firstname,
                        password: hashedPassword
                    } 
                    if (!req.body.email || !req.body.password || !req.body.name || !req.body.firstname) {
                        res.status(400).send("All input is required");
                    } else {
                        db.query("UPDATE user SET ? WHERE id = ?", [user, req.params.id], (err, result) => {
                            if (err) console.error(err);
                        });
                        db.execute('SELECT * FROM `user` WHERE id = ?', [req.params.id], function(err, results, fields) {
                            if (results.length > 0) {
                                res.status(200).json({ email: results[0].email, password: results[0].password, firstname: results[0].firstname , name: results[0].name});
                            } else {
                                res.status(404).json({ msg: "Not found" });
                            }
                        });
                    }
                } else {
                    res.status(401).json({ msg: "No token, authorization denied" });
                }
            });
        } else {
            res.status(401).json({ msg: "No token, authorization denied" });
        }
    });
};
