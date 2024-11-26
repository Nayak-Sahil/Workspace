const WorkspaceRouter = require('express').Router();
const ValidateRole = require('../middlewares/ValidateRole');
const ValidateToken = require('../middlewares/ValidateToken');
let EditorData = require('../Database/WorkspaceData');

WorkspaceRouter.post("/set", [ValidateToken, ValidateRole], (req, res) => {
    const { data } = req.body;

    if(!data) return res.status(400).send({ message: "Not found data!" });

    EditorData = data;

    res.status(200).send({ message: "Workspace setted!" });
});

module.exports = WorkspaceRouter;