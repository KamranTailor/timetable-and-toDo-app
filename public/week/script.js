async function onStart() {
    const response = await fetch("/today");
    const data = await response.json();
    console.log(data);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    const responce2 = await fetch("/lessonsList");
    const subjects = await responce2.json();

    for (i in data.schedule) {
        const capitalizedDay = capitalizeFirstLetter(data.schedule[i].day);
        document.getElementById("tbody").innerHTML +=  `<tr>
                <td class="time-slot" data-label="Day">${capitalizedDay}</td>
                <td data-label="Period One">${genEmoji(data.schedule[i].data.p1, subjects)} ${ data.schedule[i].data.p1}</td>
                <td data-label="Period Two">${genEmoji(data.schedule[i].data.p2, subjects)} ${ data.schedule[i].data.p2}</td>
                <td data-label="Period Three">${genEmoji(data.schedule[i].data.p3, subjects)} ${ data.schedule[i].data.p3}</td>
                <td data-label="Period Four">${genEmoji(data.schedule[i].data.p4, subjects)} ${ data.schedule[i].data.p4}</td>
                <td data-label="Period Five">${genEmoji(data.schedule[i].data.p5, subjects)} ${ data.schedule[i].data.p5}</td>
        </tr>`
    }
} 

onStart()