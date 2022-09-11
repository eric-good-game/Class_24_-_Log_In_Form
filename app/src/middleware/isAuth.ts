import { NextFunction, Request, Response } from "express";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    switch (req.baseUrl) {
        case '/auth':
            if(req.session.isAuth) {
                res.redirect('/')
                return
            }
            break;
        case '/':
                if(!req.session.isAuth) {
                    res.redirect('/auth/login')
                    return
                }
            break;
    
        default:
            break;
    }
    next();
}
export default isAuth