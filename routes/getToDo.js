import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.get("/", async (req, res) => {
    const filePath = './database/todos.json';;
    const data = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(data));
});

export default router;