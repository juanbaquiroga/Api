# Proyecto Final Backend

Este proyecto es el trabajo final para el curso de backend en Coderhouse. Consiste en una tienda virtual con funcionalidades como registro y logeo de usuarios, ecommerce, carrito de compras y chat en tiempo real utilizando WebSockets.

## Tecnologías utilizadas

- Node.js
- Express
- Handlebars
- MongoDB
- Passport
- Socket.io

## Requisitos previos

Asegúrate de tener instalado Node.js en tu entorno de desarrollo. Además, necesitarás crear un archivo `.env` basado en el archivo `.env.example` proporcionado en el proyecto.

## Configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. Ejecuta el comando `npm install` para instalar las dependencias necesarias.
2. Crea un archivo `.env` basado en el archivo `.env.example` y proporciona la URL de tu base de datos MongoDB.
3. Ejecuta el comando `npm start` para iniciar la aplicación.
4. Accede a la URL `http://localhost:3000/` en tu navegador para interactuar con la tienda virtual.

## Base de datos

La aplicación utiliza MongoDB como base de datos. Asegúrate de proporcionar la URL de tu base de datos en el archivo `.env`.
La aplicación creará automáticamente las colecciones necesarias.
una vez creada la base podremos modificar el parametro admin del usuario, esto nos permitira acceder a las fuciones de administrador, como crear productos o enviar mensajes como administrador

## Demostración

Puedes acceder a una demostración del proyecto en la siguiente URL: [https://finalbackend-production-398c.up.railway.app](https://finalbackend-production-398c.up.railway.app) podemos logearnoos con el usuario: admin, password: admin

## Uso

Una vez que hayas ejecutado la aplicación localmente y accedido a `http://localhost:3000/`, podrás registrarte o iniciar sesión en la página. Una vez registrado, podrás acceder al home en la ruta `http://localhost:3000/productos`, al chat en la ruta `http://localhost:3000/chat` y a tu carrito de compras en la ruta`http://localhost:3000/cart`.

