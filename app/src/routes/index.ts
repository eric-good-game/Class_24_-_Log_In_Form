import { Request, Response, Router } from "express";
import authRouter from "./auth";
import apiRouter from "./api.v1";
import isAuth from "../middleware/isAuth";

const router = Router();

// router
    // .get("/", isAuth, (req: Request, res: Response) => {
    //     if(!req.session.isAuth) {
    //         res.redirect('/auth/login')
    //         return
    //     }
    //     res.render("index.pug", { title: "Dashboard", user: req.session.user, page_title: "Class_24" });
    // })


router.use('/auth', authRouter)
router.use('/api/v1', apiRouter)
router.get('/*', (req: Request, res: Response) => {
    res.sendFile('index.html', { root: 'app/public' })
})

export default router;