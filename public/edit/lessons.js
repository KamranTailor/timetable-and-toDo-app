async function editLessons() {
    const responce = await fetch("/lessonsList");
    const data = await responce.json();
    console.log(data);

    document.getElementById("editLessons").style.display = "block";

    for (let i in data) {
        document.getElementById("lessonList").innerHTML += `
            <tr>
                <td data-label="Emoji"> <input id="emoji" type="text" value="${data[i].emoji}" > </td>
                <td data-label="Name"> <input id="name" type="text" value="${data[i].name}" > </td>
            </tr>
        `;
    }
}

async function saveLessons() {
    const rows = document.querySelectorAll("#lessonList tr");
    const lessons = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td input");
        const emoji = cells[0].value;
        const name = cells[1].value;

        lessons.push({ emoji, name });
    });

    const response = await fetch("/saveLessons", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lessons })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Sata sent successfully');
        document.getElementById("lessonList").innerHTML = "";
        document.getElementById("editLessons").style.display = "none";
    } else {
        alert('Failed to send timetable data', response.statusText);
    }
}