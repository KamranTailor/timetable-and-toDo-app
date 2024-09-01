import express from 'express';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.post('/', async (req, res) => {
    const { toDo } = req.body;
    const filePath = './database/todos.json';
    try {
      // Read existing data from the JSON file
      let data;
      try {
        data = await fs.readFile(filePath, 'utf8');
      } catch (err) {
        if (err.code === 'ENOENT') {
          // If file does not exist, create an empty array
          data = '[]';
        } else {
          throw err;
        }
      }
  
      // Parse the existing data
      const todos = JSON.parse(data);
  
      // Add the new to-do item
      todos.push({ item: toDo });
  
      // Write the updated data back to the JSON file
      await fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf8');
  
      // Send a success response
      res.json({ message: 'Item added successfully' });
    } catch (err) {
      // Handle errors
      res.status(500).json({ error: 'Failed to process the request' });
    }
});

export default router;