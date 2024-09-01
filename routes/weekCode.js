import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.get('/', async (req, res) => {
    const config = await getConfig();
    const week = config.week;
    res.json({ week: week})
});

export default router;