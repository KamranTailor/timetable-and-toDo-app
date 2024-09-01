import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // Read the configuration file to determine the current week
        const fileContentConfig = await fs.readFile('./database/config.json', 'utf-8');
        const config = JSON.parse(fileContentConfig);
        const week = config.week;

        // Determine the correct file based on the week
        let filePath;
        if (week === "One") {
            filePath = ('./database/weekOne.json');
        } else if (week === "Two") {
            filePath = ('./database/weekTwo.json');
        } else {
            return res.status(400).send('Invalid week configuration');
        }

        // Get the data sent from the client
        const timetableData = req.body;

        // Read the current contents of the week's file
        const fileContent = await fs.readFile(filePath, 'utf-8');
        let data = JSON.parse(fileContent);

        // Update the timetable data for the specified week
        const updatedData = data.map(dayEntry => {
            const updatedDay = timetableData.find(entry => entry.day === dayEntry.day);
            return updatedDay ? { ...dayEntry, data: updatedDay.data } : dayEntry;
        });

        // Write the updated data back to the file
        await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');

        // Send a success response
        res.status(200).send('Timetable updated successfully');
    } catch (err) {
        console.error(`Error processing request: ${err.message}`);
        res.status(500).send('Error updating timetable');
    }
});

export default router;
