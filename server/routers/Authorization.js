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
        username: email.split('@')[0],
        email,
        password: nanoid(10),
        role,
        status: 'Invited',
        createdAt: new Date().toLocaleString()
    }

    // Add to database
    db.push(user);

    // send mail to the user
    res.status(200).json({data: user, message: 'User has been invited!'});
});

AuthorizationRouter.post('/revoke', [ValidateToken, ValidateRole], (req, res) => {
    const {userId} = req.body;

    if(!userId){
        res.status(400).json({message: 'Invalid request!'});
        return;
    }

    if(!db.find((user)=> user.id === userId)){
        res.status(404).json({message: 'User not found!'});
        return;
    }

    // Revoke the role
    db.forEach((user)=>{
        if(user.id === userId){
            user.role = "Deleted";
            user.status = 'Revoked';
        }
    })
 
    res.status(200).json({message: `User Role has been revoked!`});
});

AuthorizationRouter.put('/change', [ValidateToken, ValidateRole], (req, res) => {
    const {userId, role} = req.body;
    
    if(!userId || !role){
        res.status(400).json({message: 'Invalid request!'});
        return;
    }

    const user = db.find((user)=> user.id === userId);
    if(!user){
        res.status(404).json({message: 'User not found!'});
        return;
    }

    // Revoke the role
    db.forEach((user)=>{
        if(user.id === userId){
            user.role = role;
            user.status = 'Grant';
        }
    })

    res.status(200).json({message: `User Role has been changed!`, data: user});
});

AuthorizationRouter.get('/get-all', [ValidateToken, ValidateRole], (req, res) => {
    //! Deep copy of the database
    let collaborator = JSON.parse(JSON.stringify(db));
    collaborator = collaborator.map((user)=> {
        delete user.password
        return user;
    });

    collaborator = collaborator.filter((user)=> user.role !== 'Deleted');
    res.json(collaborator);
});

module.exports = AuthorizationRouter;
