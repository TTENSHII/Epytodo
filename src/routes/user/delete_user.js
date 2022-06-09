const { param } = require("express/lib/request");

module.exports = function(app, bcrypt, jwt, db) {
    app.delete("/users/:id", (req, res) => {
        const token = req.headers['access_token'];
        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    res.status(401).json({ msg: "Token is not valid" });
                } else {
                    db.execute('SELECT * FROM `user` WHERE id = ?', [req.params.id], function(err, results, fields) {
                        if (err) {
                            res.status(500).json({ msg: "Internal server error" });
                        } else if (results.length > 0){
                            db.execute('DELETE FROM `user` WHERE id = ?', [req.params.id], function(err, results, fields) {
                                if (err) {
                                    res.status(500).json({ msg: "Internal server error" });
                                } else {
                                    res.status(200).json({ msg: `Successfully deleted record number ${req.params.id}` });
                                }
                            });
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
}
