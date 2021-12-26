const express = require("express")
const path = require('path')
const cors = require("cors")
const AppDbMongoContext = require("../Infrastructure/Context/AppDbMongoContext")

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.apiPath = "/api"

        // Connect to the database
        this.connectDB()
        
        // Middlewares
        this.middlewares()
        
        // Routes
        this.routes()

        // Port listing
        this.listen()
    }

    async connectDB() 
    {
        await AppDbMongoContext()
    }

    middlewares() {

        // CORS
        this.app.use( cors() )

        // Body parse
        this.app.use( express.json() )
        
        // public directory
        this.app.use(express.static( path.join(__dirname, 'public') ) )
    }

    routes() {
        this.app.use( this.apiPath + '/auth', require('./routes/auth'))
        this.app.use( this.apiPath + '/users', require('./routes/user'))
        this.app.use( this.apiPath + '/posts', require('./routes/post'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        })
    }
}


module.exports = Server