require("dotenv").config(); 
const express = require("express");
const dbconnection = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const cookieparser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const app = express();
app.use(express.json());
app.use(cookieparser()); 
dbconnection.on('connected', 
    () => {
        app.use(authRoutes);
        app.use(usersRoutes);
        app.use(errorHandler);
        app.all('*', (req, res) =>  res.status(404).json({ message: 'Route not found' }) );
        
            app.listen(process.env.port, () => {
                console.log('Listening on port', process.env.port);
            });
        });
        
//on is a methode returned by the object returned by mongoose.createconnection methode , it listens for the status of the connection has 3 status(connected , error ,disconnected)  
