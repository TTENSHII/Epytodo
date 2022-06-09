module.exports = function(app, bcrypt, jwt, db) {
    app.get("/user", (req, res) => {
        const token = req.headers['access_token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ msg: "Token is not valid" });
                } else if (decoded.email) {
                    db.execute('SELECT * FROM `user` WHERE email = ?', [decoded.email], function(err, results, fields) {
                        if (err) {
                            res.status(500).json({ msg: "Internal server error" });
                        } else if (results.length > 0){
                            res.status(200).json({ id: results[0].id, email: results[0].email, password: results[0].password, created_at: results[0].created_at, firstname: results[0].firstname, name: results[0].name });
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
