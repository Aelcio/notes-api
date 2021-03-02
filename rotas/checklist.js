//const express = require('express');
//const router = express.Router();

const {Router} = require('express');
const router = Router();
const controller = require('../controller/controlechecklist');

router.get('/', (req, res) => {
    const checklist = controller.getChecklist();
    res.send(checklist);
});

router.post('/', (req, res) => {
    const checklist = controller.postChecklist();
    res.send(checklist);
});

router.put('/', (req, res) => {
    const checklist = controller.putChecklist();
    res.send(checklist);
});

router.delete('/', (req, res) => {
    const checklist = controller.deleteChecklist();
    res.send(checklist);
});

module.exports = router;