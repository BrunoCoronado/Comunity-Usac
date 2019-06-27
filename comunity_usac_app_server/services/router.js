const express = require('express');
const router = new express.Router();
const facultad = require('../controllers/facultad');
const rol = require('../controllers/rol');

router.route('/facultad/:codigo?')
    .get(facultad.get)
    .post(facultad.post)
    .put(facultad.put)
    .delete(facultad.delete);

router.route('/rol/:codigo?')
    .get(rol.get)
    .post(rol.post)
    .put(rol.put)
    .delete(rol.delete);

module.exports = router;