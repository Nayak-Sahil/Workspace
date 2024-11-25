const { nanoid } = require('nanoid');
const ValidateRole = require('../middlewares/ValidateRole');
const ValidateToken = require('../middlewares/ValidateToken');
const AuthorizationRouter = require('express').Router();
const db = require('../Database/MockData');

AuthorizationRouter.post('/grant', [ValidateToken, ValidateRole], (req, res) => {
    const {email, role} = req.body;
    
    if(!email || !role){
        res.status(400).json({message: 'Invalid request!'});
        return;
    }

    const user = {
        id: nanoid(5),
        password: nanoid(10),
        username: email.split('@')[0],
        email,
        role,
        status: 'Invited',
        createdAt: new Date().toLocaleString()
    }

    // Add to database
    db.push(user);

    // send mail to the user
    res.status(200).json({message: 'User has been invited!'});
});

AuthorizationRouter.post('/revoke', [ValidateToken, ValidateRole], (req, res) => {
    const {email} = req.body;
    
    if(!email){
        res.status(400).json({message: 'Invalid request!'});
        return;
    }

    if(!db.find((user)=> user.email === email)){
        res.status(404).json({message: 'User not found!'});
        return;
    }

    // Revoke the role
    db.forEach((user)=>{
        if(user.email === email){
            user.role = "Delete";
            user.status = 'Revoked';
        }
    })
 
    res.status(200).json({message: `User Role has been revoked!`});
});

AuthorizationRouter.put('/change', [ValidateToken, ValidateRole], (req, res) => {
    const {email, role} = req.body;
    
    if(!email || !role){
        res.status(400).json({message: 'Invalid request!'});
        return;
    }

    if(!db.find((user)=> user.email === email)){
        res.status(404).json({message: 'User not found!'});
        return;
    }

    // Revoke the role
    db.forEach((user)=>{
        if(user.email === email){
            user.role = role;
            user.status = 'Grant';
        }
    })

    res.status(200).json({message: `User Role has been changed!`});
});

AuthorizationRouter.get('/get', (req, res) => {
    res.json(db);
});

module.exports = AuthorizationRouter;
