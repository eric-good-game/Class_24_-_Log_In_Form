import { Request, Response, Router } from "express";
import AuthControllers from "../controllers/auth";
import isAuth from "../middleware/isAuth";

const router = Router()

router
    .post('/', (req:Request, res:Response) => {
        try {
            if(req.session.isAuth)  {
                const user = {
                    email: req.session.email,
                    name: req.session.user,
                    isAuth: req.session.isAuth
                }
                return res.status(200).json({user})
            }
            return res.status(200).json({user:{isAuth:false},message: 'You are not logged in'})
        } catch (err) {
            console.log(err);
            res.status(500).json({message: 'Internal server error'})
        }
    })
    .post('/signup', AuthControllers.signup)
    .get('/signup', isAuth, (req:Request,res:Response)=>{
        res.render('register.pug', {title: "Register", page_title: "Class_24"})
    })
    .post('/login', AuthControllers.login)
    .get('/login', isAuth, (req:Request,res:Response)=>{
        res.render('login.pug', {title: "Login", page_title: "Class_24"})
    })
    .post('/logout', AuthControllers.logout)
    .get('/logout', (req:Request,res:Response)=>{
        if (!req.session.isAuth) {
            res.redirect('/auth/login')
            return
        }
        const user = req.session.user
        req.session.destroy((err)=>{
            if(err) {
                res.status(500).json({message: err.message})
                return
            }
            console.log('Session Destroyed')
            res.render('logout.pug', {title: "Logout", user, page_title: "Class_24"})
            
        })
        
    })

export default router