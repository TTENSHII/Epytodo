module.exports = function(app, bcrypt, jwt, db) {
    app.get("/user/todos", (req, res) => {
        const token = req.headers['access_token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ msg: "Token is not valid" });
                } else if (decoded.email) {
                    db.execute('SELECT * FROM `user` WHERE email = ?', [decoded.email], function(err, results, fields) {
                        if (err) {
                            res.status(500).json({ msg: "Internal server error" });
                        } else if (results > 0){
                            db.execute('SELECT * FROM `todo` WHERE user_id = ?', results[0].id, function(err, results, fields) {
                                if (err) {
                                    res.status(500).json({ msg: "Internal server error" });
                                } else if (results > 0){
                                    res.status(200).json(results);
                                } else {
                                    res.status(200).json({ msg: "No todos" });
                                }
                            });
                        } else {
                            res.status(404).json({ msg: "Not found" });
                        }
                    });
                } else {
                    res.status(401).json({ msg: "No token, authorization denied" });
                }
            });
        } else {
            res.status(401).json({ msg: "No token, authorization denied" });
        }
    });
}
