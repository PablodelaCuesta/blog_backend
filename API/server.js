const express = require("express")
const path = require('path')
const cors = require("cors")
const AppDbMongoContext = require("../Infrastructure/Context/AppDbMongoContext")
const fileUpload = require("express-fileupload")
const httpLogger = require("../Infrastructure/Service/httpLogger")

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
        this.app.use( cors({
            origin: [
                "https://pablodelacuesta.es",
                "https://api.pablodelacuesta.es",
            ]
        }) )

        // Body parse
        this.app.use( express.json() )

        // Logging
        this.app.use( httpLogger )
        
        // public directory
        this.app.use( express.static( path.join(__dirname, 'public') ) )

        if ( process.env.NODE_ENV === 'production') {
            this.app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
            })
        }

        // files
        this.app.use( fileUpload() )
    }

    routes() {
        this.app.use( this.apiPath + '/auth', require('./routes/auth'))
        this.app.use( this.apiPath + '/category', require('./routes/category'))
        this.app.use( this.apiPath + '/posts', require('./routes/post'))
        this.app.use( this.apiPath + '/users', require('./routes/user'))
        this.app.use( this.apiPath + '/email', require('./routes/email') )
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        })
    }
}


module.exports = Server