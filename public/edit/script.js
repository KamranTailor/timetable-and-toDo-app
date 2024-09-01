async function change() {
    const response = await fetch("/chnageWeek");
    const data = await response.json();
    if (data.status === true) {
        alert("Week changed")
    } else {
        alert("Failed to change week")
    }
}

async function addToDo() {
    const toDo = prompt("New Item");
    const response = await fetch('/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({toDo: toDo})
    });
    const data = await response.json();
    alert(data.message);
}

async function getToDO() {
    const response = await fetch('getToDo');
    const data = await response.json();
    for (i in data) {
        document.getElementById("toDoList").innerHTML += `<li>${data[i].item}</li>`;
    }
}


async function editTimeTable() {
    document.getElementById("timeTable").style.display = "block";
    const response = await fetch("/today");
    const data = await response.json();
    console.log(data);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const responce = await fetch("/lessonsList");
    const subjects = await responce.json();
    console.log(subjects);

    for (i in data.schedule) {
        const capitalizedDay = capitalizeFirstLetter(data.schedule[i].day);
        document.getElementById("tbody").innerHTML +=  `<tr>
                <td class="time-slot" data-label="Day">${capitalizedDay}</td>
                <td data-label="Period One">${ option(subjects, data.schedule[i].data.p1)}</td>
                <td data-label="Period Two"> ${ option(subjects, data.schedule[i].data.p2)}</td>
                <td data-label="Period Three"> ${ option(subjects, data.schedule[i].data.p3)}</td>
                <td data-label="Period Four"> ${ option(subjects, data.schedule[i].data.p4)}</td>
                <td data-label="Period Five"> ${ option(subjects, data.schedule[i].data.p5)}</td>
        </tr>`
    }
}

function option(subjects, selectedSubject) {

    let options = subjects.map(subject => {
        return `<option value="${subject.name}" ${subject.name === selectedSubject ? "selected" : ""}>${subject.emoji} ${subject.name}</option>`;
    }).join("");

    return `<select>${options}</select>`;
}

async function gatherTimeTableDataAndSend() {
    // Gather the timetable data
    const timetable = [];
    const rows = document.querySelectorAll("#tbody tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");

        const day = cells[0].textContent.trim().toLowerCase();  // Get the day
        const p1 = cells[1].querySelector("select").value; // Get the value of Period One
        const p2 = cells[2].querySelector("select").value; // Get the value of Period Two
        const p3 = cells[3].querySelector("select").value; // Get the value of Period Three
        const p4 = cells[4].querySelector("select").value; // Get the value of Period Four
        const p5 = cells[5].querySelector("select").value; // Get the value of Period Five

        const dayData = {
            day: day,
            data: {
                p1: p1,
                p2: p2,
                p3: p3,
                p4: p4,
                p5: p5
            }
        };

        timetable.push(dayData);
    });

    console.log(timetable);

    // Send the gathered data to the server
    try {
        const response = await fetch('/updateTimeTable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(timetable)
        });

        if (response.ok) {
            alert('Timetable data sent successfully');
            document.getElementById("timeTable").style.display = "none";
        } else {
            alert('Failed to send timetable data', response.statusText);
            // Handle errors here
        }
    } catch (error) {
        alert('Error occurred while sending timetable data:', error);
    }
}

// Example usage


