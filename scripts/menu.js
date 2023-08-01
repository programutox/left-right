async function readLinesFromFile(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Loading Error : ${response.status}`);
    }
    
    const text = await response.text();
    const lines = text.split('\n');
    return lines;
}

function handleGameStart(desktopMessage, mobileMessage, highscore) {
    const instructions = isTouchscreen() ? mobileMessage : desktopMessage;
    createText(instructions, { size: 24 }, width() / 2, height() * 0.75);

    if (isTouchscreen()) {
        onClick(() => go("counter", highscore));
    } else {
        onKeyPress("space", () => go("counter", highscore));
    }
}

function createMenu(fileLines) {
    const randomIndex = Math.floor(Math.random() * fileLines.length);
    const randomLine = fileLines[randomIndex];
        
    createText(randomLine, { size: 30, width: width() - 100 }, width() / 2, height() / 4);
    
    add([
        sprite("arrows"),
        pos(center()),
        scale(0.25),
        anchor("center"),
    ]);

    wait(2, () => handleGameStart("Press space to start", "Touch to start", 0));
}

function createMenuScene() {
    readLinesFromFile("assets/data/proverbs.txt")
        .then(fileLines => createMenu(fileLines))
        .catch(error => console.error(`Error retrieving file: ${error}`));
}
