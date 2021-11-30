const express = require("express")
const cors = require("cors")

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.listen()

        // Middlewares
        this.middlewares()

        // Routes
        this.routes()
    }

    middlewares() {

        // CORS
        this.app.use( cors() )

        // Body parse
        this.app.use( express.json() )
        
        // public directory
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use('/api/users', require('../routes/user'))
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        })
    }
}


module.exports = Server