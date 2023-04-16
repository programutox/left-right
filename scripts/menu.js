async function readLinesFromFile(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Loading Error : ${response.status}`);
    }
    
    const text = await response.text();
    const lines = text.split('\n');
    return lines;
}

function createMenu(fileLines) {
    const randomIndex = Math.floor(Math.random() * fileLines.length);
    const randomLine = fileLines[randomIndex];
        
    createText(randomLine, { size: 30, width: 500 }, width() / 2, height() / 4);
        
    add([
        sprite("arrows"),
        pos(center()),
        scale(0.25),
        anchor("center"),
    ]);
        
    wait(2, () => {
        createText("Press space to start", { size: 24 }, width() / 2, height() * 0.75);
        onKeyPress("space", () => go("counter"));
    });
}

function createMenuScene() {
    readLinesFromFile("assets/data/proverbs.txt")
        .then(fileLines => createMenu(fileLines))
        .catch(error => console.error("Error retrieving file: ", error));
}
