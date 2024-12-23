const AuthRouter = require('express').Router();
const data = require('../Database/MockData');
const jwt = require('jsonwebtoken');
const ValidateToken = require('../middlewares/ValidateToken');

AuthRouter.post('/login', [ValidateToken], (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Please enter your login credentials to proceed.' });
        return;
    }

    //? Check if the email and password are correct
    const user = JSON.parse(JSON.stringify(data.filter((user) => user.email === email && user.password === password)));

    //! Remove the password 'key' from the user object
    delete user[0].password;

    if (user.length === 0) {
        res.status(401).json({ message: 'Invalid login credentials!' });
        return;
    } else {
        const token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1d' });
        try {
            res.cookie('WS_TOKEN', token, { sameSite: 'None', secure: true, httpOnly: false, path: '/', maxAge: 86400000 });
        } catch (err) {
            console.log(err);
        }
        res.status(200).json({ ...user });
    }
});


module.exports = AuthRouter;