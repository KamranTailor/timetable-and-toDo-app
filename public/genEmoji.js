function genEmoji(lesson, list) {
    for (let i in list) { 
        if (list[i].name === lesson) {
            return list[i].emoji;
        }
    }
}