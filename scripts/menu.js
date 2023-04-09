async function readLinesFromFile(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Loading Error : ${response.status}`);
    }
    
    const text = await response.text();
    const lines = text.split('\n');
    return lines;
}

function create_menu(fileLines) {
    const randomIndex = Math.floor(Math.random() * fileLines.length);
    const randomLine = fileLines[randomIndex];
        
    createText(randomLine, { size: 30, width: 500 }, width() / 2, height() / 4);
        
    wait(2, () => {
        createText("Press space to start", { size: 24 }, width() / 2, height() * 0.75);
        onKeyPress("space", () => go("game"));
    });
}

function menu_scene() {
    readLinesFromFile("assets/data/proverbs.txt")
        .then(
            (fileLines) => create_menu(fileLines)
        )
        .catch(
            (error) => { console.error("Error retrieving file: ", error); }
        );
}
