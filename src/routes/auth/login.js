module.exports = function(app, bcrypt, jwt, db) {
    app.post("/login", (req, res) => {
        if (!req.body.email || !req.body.password) {
            res.status(400).send("All input is required");
            return;
        }
        db.execute('SELECT * FROM `user` WHERE email = ?', [req.body.email], function(err, results, fields) {
            if (err) {
                res.status(500).json({ msg : "Internal server error" });
                return;
            }
            if (results.length > 0) {
                if (bcrypt.compareSync(req.body.password, results[0].password)) {
                    const token = jwt.sign({email:results[0].email, password:results[0].password}, process.env.SECRET, { expiresIn: '1h' });
                    res.status(200).json({token});
                } else {
                    res.status(401).json({ msg: "Invalid Credentials" });
                }
            } else {
                res.status(401).json({ msg: "Invalid Credentials" });
            }
        }
        );
    });
};
