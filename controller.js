const mongoose = require('mongoose') // Importar Mongoose para interactuar con MongoDB
const { reset } = require('nodemon') // Nodemon es para reiniciar el servidor en cambios, pero no se usa aquí

// Definición del esquema para la colección 'usuarios'
const usuariosSchema = new mongoose.Schema(
    { email : String , password : String }, // Campos del esquema
    { collection : 'usuarios'} // Nombre de la colección en la base de datos
)
const Usuarios = mongoose.model('Usuarios' , usuariosSchema) // Crear el modelo para 'usuarios'

// Definición del esquema para la colección 'cards'
const cardsSchema = new mongoose.Schema(
    { src : String , alt : String , level : String, style : String, time : String, iconDefault : String, iconAlt : String, teacherName : String, teacherPhoto : String , isFavorite : { type : Boolean , default : false } }, // Campos del esquema
    { collection : 'cards'} // Nombre de la colección en la base de datos
)
const Cards = mongoose.model('Cards' , cardsSchema) // Crear el modelo para 'cards'

// Definición del esquema para la colección 'slider'
const sliderSchema = new mongoose.Schema(
    { src : String , alt : String , text : String , buttonText : String }, // Campos del esquema
    { collection : 'slider'}, // Nombre de la colección en la base de datos
)
const Slider = mongoose.model('Slider' , sliderSchema) // Crear el modelo para 'slider'

// Definición del esquema para la colección 'header'
const headerSchema = new mongoose.Schema(
    { src : String , alt : String , direccion : String , name : String }, // Campos del esquema
    { collection : 'header'}, // Nombre de la colección en la base de datos
)
const Header = mongoose.model('Header' , headerSchema) // Crear el modelo para 'header'

// Definición del esquema para la colección 'teachers'
const teachersSchema = new mongoose.Schema(
    { teacherPhoto : String , alt : String , teacherName : String , teacherStyle : String }, // Campos del esquema
    { collection : 'teachers'}, // Nombre de la colección en la base de datos
)
const Teachers = mongoose.model('Teachers' , teachersSchema) // Crear el modelo para 'teachers'

// Controlador para obtener todos los usuarios
const getUsuarios = async (req, res, next) => {
    try {
        const buscar = await Usuarios.find() // Buscar todos los usuarios
        res.status(200).json(buscar) // Enviar los usuarios como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener un usuario por su ID
const getUsuariosId = async (req, res, next) => {
    try {
        const { id } = req.params // Obtener el ID de los parámetros de la solicitud
        const buscar = await Usuarios.findById(id) // Buscar el usuario por ID
        res.json(buscar) // Enviar el usuario encontrado como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener un usuario por su email
const getUsuariosEmail = async (req, res, next) => {
    try {
        const { email } = req.params // Obtener el email de los parámetros de la solicitud
        const buscar = await Usuarios.find({ email }) // Buscar el usuario por email
        res.status(200).json(buscar) // Enviar el usuario encontrado como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
};

// Controlador para obtener un usuario por su contraseña
const getUsuariosPass = async (req, res, next) => {
    try {
        const { password } = req.params // Obtener la contraseña de los parámetros de la solicitud
        const buscar = await Usuarios.find({ password }) // Buscar el usuario por contraseña
        res.status(200).json(buscar) // Enviar el usuario encontrado como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
};

// Controlador para crear un nuevo usuario
const postUsuarios = async (req, res, next) => {
    try {
        const { email, password } = req.body // Obtener los datos del nuevo usuario del cuerpo de la solicitud
        const nuevo = new Usuarios({ email, password }) // Crear una instancia del modelo con los nuevos datos
        await nuevo.save() // Guardar el nuevo usuario en la base de datos
        const buscar = await Usuarios.find() // Buscar todos los usuarios para obtener la lista actualizada
        res.status(200).json(buscar) // Enviar la lista de usuarios actualizada como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para actualizar un usuario existente
const putUsuarios = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtener el ID del usuario a actualizar de los parámetros de la solicitud
        const datos = req.body; // Obtener los datos actualizados del cuerpo de la solicitud
        await Usuarios.findByIdAndUpdate(id, { ...datos }); // Actualizar el usuario en la base de datos
        const buscar = await Usuarios.find(); // Buscar todos los usuarios para obtener la lista actualizada
        res.status(200).json(buscar); // Enviar la lista de usuarios actualizada como respuesta
    } catch (error) {
        next(error); // Pasar el error al manejador de errores
    }
}

// Controlador para eliminar un usuario por su ID
const deleteUsuariosId = async (req, res, next) => {
    try {
        const { id } = req.params // Obtener el ID del usuario a eliminar de los parámetros de la solicitud
        await Usuarios.findByIdAndDelete(id) // Eliminar el usuario de la base de datos
        const buscar = await Usuarios.find() // Buscar todos los usuarios para obtener la lista actualizada
        res.status(200).json(buscar) // Enviar la lista de usuarios actualizada como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener todos los cards
const getCards = async (req, res, next) => {
    try {
        const buscar = await Cards.find() // Buscar todos los cards
        res.status(200).json(buscar) // Enviar los cards como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener un card por su ID
const getCardsId = async (req, res, next) => {
    try {
        const { id } = req.params // Obtener el ID de los parámetros de la solicitud
        const buscar = await Cards.findById(id) // Buscar el card por ID
        res.json(buscar) // Enviar el card encontrado como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener todos los sliders
const getSlider = async (req, res, next) => {
    try {
        const buscar = await Slider.find() // Buscar todos los sliders
        res.status(200).json(buscar) // Enviar los sliders como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener un slider por su ID
const getSliderId = async (req, res, next) => {
    try {
        const { id } = req.params // Obtener el ID de los parámetros de la solicitud
        const buscar = await Slider.findById(id) // Buscar el slider por ID
        res.json(buscar) // Enviar el slider encontrado como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener todos los headers
const getHeader = async (req, res, next) => {
    try {
        const buscar = await Header.find() // Buscar todos los headers
        res.status(200).json(buscar) // Enviar los headers como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener un header por su ID
const getHeaderId = async (req, res, next) => {
    try {
        const { id } = req.params // Obtener el ID de los parámetros de la solicitud
        const buscar = await Header.findById(id) // Buscar el header por ID
        res.json(buscar) // Enviar el header encontrado como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener todos los teachers
const getTeachers = async (req, res, next) => {
    try {
        const buscar = await Teachers.find() // Buscar todos los teachers
        res.status(200).json(buscar) // Enviar los teachers como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Controlador para obtener un teacher por su ID
const getTeachersId = async (req, res, next) => {
    try {
        const { id } = req.params // Obtener el ID de los parámetros de la solicitud
        const buscar = await Teachers.findById(id) // Buscar el teacher por ID
        res.json(buscar) // Enviar el teacher encontrado como respuesta
    } catch (error) {
        next(error) // Pasar el error al manejador de errores
    }
}

// Exportar los controladores para que puedan ser usados en otras partes de la aplicación
module.exports = {
    getUsuarios,
    getUsuariosId,
    getUsuariosEmail,
    getUsuariosPass,
    postUsuarios,
    putUsuarios,
    deleteUsuariosId,
    getCards,
    getCardsId,
    getSlider,
    getSliderId,
    getHeader,
    getHeaderId,
    getTeachers,
    getTeachersId,
}
