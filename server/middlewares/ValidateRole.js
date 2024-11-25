const validActions = ["Edit", "Read", "Admin"];
//? Here "Admin" action means all the actions likes Grant, Revoke and Delete User Role

function ValidateRole(req, res, next){
    // Get the requested action
    const {action} = req.body;
    
    if(!action || action === '' || !validActions.includes(action)){
        res.status(400).json({message: 'Invalid action!'});
        return;
    }

    //? Check if the user is authorized to perform the requested action
    //? There can be 3 role: {Admin, Editor, Viewer}
    const user = req.decodedToken;
    console.log(user);
    const ViewerInvalidAction = validActions.filter((action) => action != "Read");
    if(user.role === "Editor" && action === "Admin" || user.role === "Viewer" && ViewerInvalidAction.includes(action)){
        res.status(401).json({message: 'Unauthorized!'});
        return;
    }


    // success
    next();
}

module.exports = ValidateRole;