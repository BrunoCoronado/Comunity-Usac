const express = require('express');
const router = new express.Router();
const facultad = require('../controllers/facultad');
const rol = require('../controllers/rol');
const carrera = require('../controllers/carrera');
const ciencia = require('../controllers/ciencia');

router.route('/facultad/:codigo?')
    .get(facultad.get)
    .post(facultad.post)
    .put(facultad.put)
    .delete(facultad.delete)

router.route('/rol/:codigo?')
    .get(rol.get)
    .post(rol.post)
    .put(rol.put)
    .delete(rol.delete);

router.route('/carrera/:codigo?')
    .get(carrera.get)
    .post(carrera.post)
    .put(carrera.put)
    .delete(carrera.delete);

router.route('/ciencia/:codigo?')
    .get(ciencia.get)
    .post(ciencia.post)
    .put(ciencia.put)
    .delete(ciencia.delete);

module.exports = router;