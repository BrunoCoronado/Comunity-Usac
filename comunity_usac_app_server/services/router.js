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
const autenticacion = require('../controllers/autenticacion');
const tema = require('../controllers/tema/tema');
const categoria = require('../controllers/tema/categoria');
const multimedia = require('../controllers/multimedia');
const respuesta = require('../controllers/tema/respuesta');

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

router.route('/autenticar')
    .post(autenticacion.post);

router.route('/tema/:codigo?')
    .get(tema.get)
    .post(tema.post);

router.route('/tema-categoria/:codigo?')
    .post(categoria.post)
    .delete(categoria.delete);

router.route('/tema-respuesta/:codigo?')
    .get(respuesta.get)
    .post(respuesta.post);

router.route('/multimedia/:codigo?')
    .get(multimedia.get)
    .post(multimedia.post)
    .delete(multimedia.delete);

module.exports = router;