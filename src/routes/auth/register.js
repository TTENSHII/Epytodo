module.exports = function(app, bcrypt, jwt, db) {
    app.post("/register", (req, res) => {
        if (!req.body.email || !req.body.password || !req.body.name || !req.body.firstname) {
            res.status(400).send("All input is required");
            return;
        }
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let user = {
            name: req.body.name,
            email: req.body.email,
            firstname: req.body.firstname,
            password: hashedPassword
        }
        db.execute('SELECT * FROM `user` WHERE email = ?', [user.email], function(err, results, fields) {
            if (err) {
                res.status(500).json({ msg : "Internal server error" });
                return;
            }
            if (results.length > 0) {
                res.json({ msg: "Account already exists" });
            } else {
                db.query("INSERT INTO user SET ?", user, (err, result) => {
                    if (err) console.error(err);
                    const token = jwt.sign({email:user.email, password:user.password,}, process.env.SECRET, { expiresIn: '1h' });
                    res.status(200).json({token});
                }); 
            }
        });
    });
};
