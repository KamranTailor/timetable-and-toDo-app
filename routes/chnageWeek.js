import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const fileContentConfig = await fs.readFile('./database/config.json', 'utf-8');
        let config = JSON.parse(fileContentConfig);
        const week = config.week;
        let newWeek = "";
        
        let file = "";
        if (week == "One") {
            newWeek = "Two";
        } else if (week == "Two") { 
            newWeek = "One";
        }

        config.week = newWeek;
        await fs.writeFile('./database/config.json', JSON.stringify(config, null, 2), 'utf-8');
        res.json({status: true});
    } catch (err) { 
        console.error(`Error reading file: ${err.message}`);
        res.status(500).send('Error reading file');
    }
});

export default router;