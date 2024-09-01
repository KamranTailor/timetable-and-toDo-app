import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.post("/", async (req, res) => {
    const { item } = req.body;

    try {
        const filePath = './database/todos.json';
        // Read and parse the JSON file
        const data = await fs.readFile(filePath, 'utf8');
        let todos = JSON.parse(data);

        // Find the index of the item to delete
        const index = todos.findIndex(todo => todo.item === item);

        if (index !== -1) {
            // Remove the item from the array
            todos.splice(index, 1);

            // Write the updated data back to the file
            await fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf8');

            return res.json({ status: true });
        } else {
            return res.status(404).json({ status: false, message: 'Item not found' });
        }
    } catch (e) {
        console.error(`Error processing file: ${e.message}`);
        return res.status(500).send('Error processing file');
    }
});

export default router;