import { Request, Response } from "express"
import User from '../models/user'
import bcrypt from 'bcrypt'

class AuthControllers {

    static async login(req: Request, res: Response) {
        try {
            const {email, password} = req.body

            const userFound = await User.findOne({email})
            if(!userFound) {
                res.status(400).json({message: 'User not found'})
                return
            }
            const isMatch = await bcrypt.compare(password, userFound.password)
            if(!isMatch) {
                res.status(400).json({message: 'Incorrect password'})
                return
            }
            req.session.user = userFound.name
            req.session.email = userFound.email
            req.session.isAuth = true
            res.status(200).json({session:req.session,message: 'User logged in'})
        } catch (err) {
            if(err instanceof Error) {
                res.status(500).json({message: err.message})    
            }
            console.log(err);
        }

    }
    static async signup(req: Request, res: Response) {
        try {
            const {email, name, password} = req.body
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const user = await User.create({
                email,
                name,
                password: hash
            })
            req.session.user = user.name
            req.session.email = user.email
            req.session.isAuth = true
            res.status(201).json({message: "User created"})
        } catch (err) {
            if(err instanceof Error) {
                console.log(err);
                res.status(500).json({message: err.message})
            }
        }
    }
    static async logout(req: Request, res: Response) {
        const response:any = {}
        response.user = req.session.user
        req.session.destroy((err)=>{
            if(err) {
                res.status(500).json({message: err.message})
                return
            }
            console.log('Session Destroyed')
            res.status(200).json(response)
        })
        // req.session.destroy((err)=>{
        //     if(err) {
        //         res.status(500).json({message: err.message})
        //         return
        //     }
        //     res.clearCookie('sid')
        //     res.redirect('/auth/login')
        // })
    }
}

export default AuthControllers