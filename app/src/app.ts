import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo';
import rootRouter from './routes';
import './config/mongoose.config'
import cors from 'cors'

const app = express();

declare module "express-session" {
    interface SessionData {
        user?: string,
        isAuth?: boolean,
        email?: string
    }
}
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
        
    }
))
app.use(express.static('app/public'));
// app.use(express.static('public'))
app.set('view engine', 'pug');
app.set('views', 'app/views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Creik:Sidonia702@coderhouse.q5mhnd3.mongodb.net/class_24',
        ttl: 60 * 10
    }),
    // rolling: true,
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: false, maxAge: 1000*60*10}
}))

app.use('/', rootRouter)

export default app