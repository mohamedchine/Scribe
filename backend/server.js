require("dotenv").config(); 
const dbconnection = require("./config/db");
const express = require("express");
const cookieparser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const hpp=require('hpp');
const xss = require('xss-clean');
const {globalLimiter} = require('./middleware/Limiter');


const reftokenRoute = require('./routes/refTokenRoute') ; 
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentRoutes = require('./routes/commentRoutes') ; 
const categRoutes = require("./routes/categRoutes");

const app = express();
app.use(express.json());
app.use(cookieparser()); 
app.use(globalLimiter);
app.use(hpp());
app.use(xss());
dbconnection.on('connected', 
    () => {
        app.use(reftokenRoute);
        app.use("/api/auth",authRoutes);
        app.use(usersRoutes);
        app.use('/posts',postsRoutes);
        app.use('/comments' , commentRoutes);
        app.use('/categories',categRoutes);

        app.use(errorHandler);
        app.all('*', (req, res) =>  res.status(404).json({ message: 'Route not found' }) );
        
            app.listen(process.env.port, () => {
                console.log('Listening on port', process.env.port);
            });
        });
        
//on is a methode returned by the object returned by mongoose.createconnection methode , it listens for the status of the connection has 3 status(connected , error ,disconnected)  
