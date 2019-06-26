const express = require('express');
const router = new express.Router();
const facultad = require('../controllers/facultad');

router.route('/facultad/:codigo?')
    .get(facultad.get)
    .post(facultad.post)
    .put(facultad.put)
    .delete(facultad.delete);

module.exports = router;