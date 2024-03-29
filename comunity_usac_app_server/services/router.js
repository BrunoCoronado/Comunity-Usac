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
const examen = require('../controllers/examen/examen');
const pregunta = require('../controllers/examen/pregunta');
const respuesta_examen = require('../controllers/examen/respuesta');
const pregunta_examen = require('../controllers/examen/pregunta-examen');
const sala = require('../controllers/examen/sala');
const estudiante_sala = require('../controllers/examen/estudiante-sala');
const respuesta_estudiante = require('../controllers/examen/respuesta-estudiante');
const conversacion = require('../controllers/conversacion/conversacion');
const mensaje_conversacion = require('../controllers/conversacion/mensaje-conversacion');
const grupo = require('../controllers/conversacion/grupo/grupo');
const miembro_grupo = require('../controllers/conversacion/grupo/miembro-grupo');
const mensaje_grupo = require('../controllers/conversacion/grupo/mensaje-grupo');
const estadistica = require('../controllers/estadistica');
const usuario_imagen = require('../controllers/usuario/usuario-imagen');

const  multipart  =  require('connect-multiparty');
const multipartMiddlewareUsers = multipart({
    uploadDir: './assets/user'
});

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
    .put(multipartMiddlewareUsers, usuario.put)
    .delete(usuario.delete);


router.route('/usuario-rol/:registro?/:codigo?')
    .post(usuario_rol.post)
    .delete(usuario_rol.delete);

router.route('/usuario-carrera/:registro?/:codigo?')
    .post(usuario_carrera.post)
    .delete(usuario_carrera.delete);

router.route('/usuario-ciencia/:registro?/:codigo?')
    .get(usuario_ciencia.get)
    .post(usuario_ciencia.post)
    .delete(usuario_ciencia.delete);

router.route('/autenticar')
    .post(autenticacion.post);

router.route('/tema/:codigo?')
    .get(tema.get)
    .post(tema.post)
    .put(tema.put);

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

router.route('/examen/:registro?/:codigo?')
    .get(examen.get)  
    .post(examen.post)
    .put(examen.put)
    .delete(examen.delete);

router.route('/pregunta-examen/:codigo?')
    .get(pregunta_examen.get)
    .post(pregunta_examen.post);

router.route('/pregunta/:codigo?')
    .post(pregunta.post)
    .delete(pregunta.delete);

router.route('/respuesta-examen/:codigo?')
    .post(respuesta_examen.post);

router.route('/sala/:codigo?')
    .get(sala.get)
    .post(sala.post)
    .delete(sala.delete);

router.route('/estudiante-sala/:codigo?')
    .post(estudiante_sala.post);

router.route('/respuesta-estudiante/:codigo?')
    .post(respuesta_estudiante.post);

router.route('/conversacion/:codigo?')
    .get(conversacion.get)
    .post(conversacion.post)
    .delete(conversacion.delete);

router.route('/mensaje-conversacion/:codigo?')
    .get(mensaje_conversacion.get)
    .post(mensaje_conversacion.post);

router.route('/grupo/:codigo?')
    .get(grupo.get)
    .post(grupo.post)
    .delete(grupo.delete);

router.route('/miembro-grupo/:codigo?')
    .get(miembro_grupo.get)
    .post(miembro_grupo.post)
    .delete(miembro_grupo.delete);

router.route('/mensaje-grupo/:codigo?')
    .get(mensaje_grupo.get)
    .post(mensaje_grupo.post);

router.route('/estadistica/:tipo/:rol?/:ciencia?')
    .get(estadistica.get);

router.route('/usuario-imagen/:registro')
    .get(usuario_imagen.get);


module.exports = router;