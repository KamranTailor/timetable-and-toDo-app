import fs from 'fs/promises';

export async function getConfig() {
    try {
        const fileContent = await fs.readFile('./database/config.json', 'utf-8');
        console.log('File content:', fileContent); // For debugging
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading or parsing config file:', error);
        throw error; // Rethrow the error for further handling
    }
}
