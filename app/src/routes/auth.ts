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
    .get('/*', (req:Request,res:Response)=>{
        res.sendFile('index.html', { root: 'app/public' })
    })
    .post('/login', AuthControllers.login)
    .post('/logout', AuthControllers.logout)


export default router