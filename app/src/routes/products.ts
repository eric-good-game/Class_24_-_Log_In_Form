import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
        res.json({page:'products'})
    })

export default router;