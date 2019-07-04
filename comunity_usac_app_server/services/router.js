const express = require('express');
const router = new express.Router();
const facultad = require('../controllers/facultad');
const rol = require('../controllers/rol');
const carrera = require('../controllers/carrera');
const ciencia = require('../controllers/ciencia/ciencia');
const ciencia_carrera = require('../controllers/ciencia/ciencia-carrera'); 
const usuario = require('../controllers/usuario/usuario');
const usuario_rol = require('../controllers/usuario/usuario-rol');
const usuario_carrera = require('../controllers/usuario/usuario-carrera');
const usuario_ciencia = require('../controllers/usuario/usuario-ciencia');

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

router.route('/ciencia-carrera/:codigo_carrera?/:codigo_ciencia?')
    .post(ciencia_carrera.post)
    .delete(ciencia_carrera.delete);

router.route('/usuario/:registro?')
    .get(usuario.get)
    .post(usuario.post)
    .put(usuario.put)
    .delete(usuario.delete);

router.route('/usuario-rol/:registro?/:codigo?')
    .post(usuario_rol.post)
    .delete(usuario_rol.delete);

router.route('/usuario-carrera/:registro?/:codigo?')
    .post(usuario_carrera.post)
    .delete(usuario_carrera.delete);

router.route('/usuario-ciencia/:registro?/:codigo?')
    .post(usuario_ciencia.post)
    .delete(usuario_ciencia.delete);

module.exports = router;