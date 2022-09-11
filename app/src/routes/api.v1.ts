import { Router } from "express";

const router = Router();

router.get('/products', (req, res) => {
        res.json({page:'products'})
})

export default router;