async function onStart() {
    const response = await fetch("/today");
    const data = await response.json();
    console.log(data);

    document.getElementById("week").innerHTML = `${data.week}`;

    const responce2 = await fetch("/lessonsList");
    const subjects = await responce2.json();

    for (i in data.schedule) {
        let day = data.schedule[i]
        if (day.day == data.dayOfWeek) {
            console.log(day.data);
            if (day.data != null) {
                for (j in day.data) {
                    let emoji = genEmoji(day.data[j], subjects);
                    document.getElementById("lessonList").innerHTML += `<li class="${day.data[j]}">${emoji} ${day.data[j]}</li>`;
                }
            } else {
                document.getElementById("lessonList").innerHTML= "<span id='noLessons'> <center> <h3> No Lessons Today <br> 🥳  Hooray 🎉 </center> </h3></span";
            }
        }
    }
}

async function getToDO() {
    const response = await fetch('getToDo');
    const data = await response.json();
    let j = 0;
    for (i in data) {
        document.getElementById("toDoList").innerHTML += `
        <li>
            <label>
                <input type="checkbox" onclick="toggleItem(this)">
                <span>${data[i].item}</span>
            </label>
        </li>
        `;
        j ++;
    }
    document.getElementById("toDoAmmount").innerHTML = j;
}

async function toggleItem(checkbox) {
    const itemText = checkbox.nextElementSibling.textContent;
    console.log(itemText);

    const response = await fetch(`/deleteItem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: itemText }),
    });
    const data = await response.json();
    console.log(data);
   
    setTimeout(() => {
        document.getElementById('toDoList').innerHTML = "";
        getToDO()
    }, 1000);
}

getToDO()
onStart()