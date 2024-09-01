// getDayOfWeek.js
const daysOfWeek = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
];

export function getDayOfWeekInLowercase() {
    const today = new Date();
    const dayIndex = today.getDay();
    return daysOfWeek[dayIndex];
}
