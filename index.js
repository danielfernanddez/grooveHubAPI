// Limpiar la consola al iniciar el servidor
console.clear()

// Configuración de la conexión a MongoDB desde la variable de entorno, o por defecto a una base de datos local
const MONGO_BBDD = process.env.MONGO_BBDD || 'mongodb://127.0.0.1:27017/groovehub2db'

const express = require('express'); // Importar Express para manejar el servidor y rutas
const cors    = require('cors');    // Importar CORS para permitir solicitudes desde diferentes orígenes

const mongoose = require('mongoose'); // Importar Mongoose para interactuar con MongoDB
const { router } = require('./router'); // Importar las rutas definidas en otro archivo

// Función para conectar a MongoDB usando Mongoose
const conectar = async () =>
    await mongoose
        .connect(MONGO_BBDD) // Intentar conectar a la base de datos
        .then((res) => console.log('Mongo Conectado')) // Mensaje de éxito
        .catch((error) => console.log(error)) // Capturar y mostrar errores

conectar(); // Llamar a la función para conectar a la base de datos

const app = express(); // Crear una instancia de la aplicación Express

// Configurar middleware
app.use(cors()) // Habilitar CORS para permitir solicitudes desde otros dominios
app.use(express.json()) // Parsear cuerpos de solicitud en formato JSON
app.use(express.urlencoded({ extended : false })) // Parsear cuerpos de solicitud con datos codificados en URL
app.use(router) // Usar las rutas importadas desde el archivo router

// Manejar rutas no encontradas
app.use((req , res) => {
    res.status(404).json('No se ha encontrado un Endpoint') // Enviar un mensaje de error para rutas no definidas
})

// Iniciar el servidor en el puerto 3000
app.listen(3000 , () => console.log('Iniciando API'))
