module.exports = function(app, bcrypt, jwt, db) {
    app.delete("/todos/:id", (req, res) => {
        const token = req.headers['access_token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ msg: "Token is not valid" });
                } else {
                    db.execute('SELECT * FROM `todo` WHERE id = ?', [req.params.id], function(err, results, fields) {
                        if (err) {
                            res.status(500).json({ msg: "Internal server error" });
                        } else if (results.length > 0){
                            db.query("DELETE FROM todo WHERE id = ?", [req.params.id], (err, result) => {
                                if (err) console.error(err);
                            });
                            res.status(200).json({ msg: `Successfully deleted record number ${req.params.id}` });
                        } else {
                            res.status(404).json({ msg: "Not found" });
                        }
                    });
                }
            });
        } else {
            res.status(401).json({ msg: "No token, authorization denied" });
        }
    });
};
