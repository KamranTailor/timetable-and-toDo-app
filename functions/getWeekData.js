import { getConfig } from "./getConfig.js"
export  async function getWeekData() {
    try {
        const fileContent = await fs.readFile('./database/config.json', 'utf-8');
        console.log('File content:', fileContent); // For debugging
        const config = JSON.parse(fileContent);
        const week = config.week;
        if (week == "One") {
            return "./database/weekOne.json";
        } else if (week == "Two") { 
            return "./database/weekOne.json";
    }
    } catch {
        console.error("Error getting week data");
        throw new Error("Error getting week data");  // Rethrow the error for further handling
    }
}