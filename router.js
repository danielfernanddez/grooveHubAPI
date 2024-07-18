const express = require('express') // Importar Express para manejar las rutas
const { getUsuarios, getUsuariosId, postUsuarios, putUsuarios, deleteUsuariosId, getUsuariosEmail, getUsuariosPass, getCards, getCardsId, getSlider, getSliderId, getHeader, getHeaderId, getTeachers, getTeachersId } = require('./controller') // Importar los controladores desde el archivo 'controller'

const router = express.Router() // Crear una instancia del enrutador de Express

// Rutas para USUARIOS
router
    .route('/usuarios') // Ruta base para '/usuarios'
    .get(getUsuarios) // Obtener todos los usuarios
    .post(postUsuarios) // Crear un nuevo usuario
    
router
    .route('/usuarios/id/:id') // Ruta para operaciones con un usuario específico por ID
    .get(getUsuariosId) // Obtener un usuario por su ID
    .delete(deleteUsuariosId) // Eliminar un usuario por su ID
    .put(putUsuarios) // Actualizar un usuario por su ID

router.route('/usuarios/email/:email').get(getUsuariosEmail) // Obtener usuarios por email
router.route('/usuarios/password/:password').get(getUsuariosPass) // Obtener usuarios por contraseña

// Rutas para CARDS
router
    .route('/cards') // Ruta base para '/cards'
    .get(getCards) // Obtener todos los cards

router
    .route('/cards/id/:id') // Ruta para obtener un card específico por ID
    .get(getCardsId) // Obtener un card por su ID

// Rutas para SLIDER
router
    .route('/slider') // Ruta base para '/slider'
    .get(getSlider) // Obtener todos los sliders

router
    .route('/slider/id/:id') // Ruta para obtener un slider específico por ID
    .get(getSliderId) // Obtener un slider por su ID

// Rutas para HEADER
router
    .route('/header') // Ruta base para '/header'
    .get(getHeader) // Obtener todos los headers

router
    .route('/header/id/:id') // Ruta para obtener un header específico por ID
    .get(getHeaderId) // Obtener un header por su ID

// Rutas para TEACHERS
router
    .route('/teachers') // Ruta base para '/teachers'
    .get(getTeachers) // Obtener todos los teachers

router
    .route('/teachers/id/:id') // Ruta para obtener un teacher específico por ID
    .get(getTeachersId) // Obtener un teacher por su ID

// Manejo de rutas no encontradas (404)
router.all('*', (req, res, next) => {
    let err = new Error()
    err.status = 400 // Establecer el código de estado HTTP para rutas no válidas
    err.statusMessage = 'No existe el Endpoint' // Mensaje de error para rutas no encontradas
    next(err) // Pasar el error al manejador de errores
})

// Manejador global de errores
router.use((err, req, res, next) => {
    let { status, statusMessage } = err
    status = status || 500 // Establecer el código de estado HTTP por defecto a 500 si no se especifica
    statusMessage = statusMessage || 'Error en el servidor' // Mensaje de error por defecto si no se especifica
    res.status(status).json({ statusMessage: err.message }) // Enviar la respuesta con el mensaje de error
})

module.exports = {
    router, // Exportar el enrutador para ser utilizado en otras partes de la aplicación
}
