module.exports = function(app, bcrypt, jwt, db) {
    app.get("/users/:info", (req, res) => {
        const token = req.headers['access_token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ msg: "Token is not valid" });
                } else {
                    db.execute('SELECT * FROM `user` WHERE email = ?', [req.params.info], function(err, results, fields) {
                        if (results.length > 0) {
                            res.status(200).json(results[0]);
                        } else {
                            db.execute('SELECT * FROM `user` WHERE id = ?', [req.params.info], function(err, results, fields) {
                                if (results.length > 0) {
                                    res.status(200).json(results[0]);
                                } else {
                                    res.status(404).json({ msg: "Not found" });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            res.status(401).json({ msg: "No token, authorization denied" });
        }
    });
};
