//const express = require('express');
//const router = express.Router();

const { Router } = require('express');
const router = Router();
const controller = require('../controller/controletag');

router.get('/', (req, res) => {
    const tag = controller.getTag();
    res.send(tag);
});

router.post('/', (req, res) => {
    const tag = controller.postTag();
    res.send(tag);
});

router.put('/', (req, res) => {
    const tag = controller.putTag();
    res.send(tag);
});

router.delete('/', (req, res) => {
    const tag = controller.deleteTag();
    res.send(tag);
});

module.exports = router;
