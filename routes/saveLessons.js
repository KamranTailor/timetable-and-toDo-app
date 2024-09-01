import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const filePath = './database/lessons.json';;
        await fs.writeFile(filePath, JSON.stringify(req.body.lessons, null, 2), 'utf8');
        res.json({status: true});
    } catch (err) {
        console.error(`Error processing file: ${err.message}`);
        return res.status(500).send('Error processing file');
    }
});

export default router;