async function readLinesFromFile(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Erreur de chargement : ${response.status}`);
    }
    
    const text = await response.text();
    const lines = text.split('\n');
    return lines;
}

function createText(label, props, x, y, with_value=false) {
    let text_result = [
        k.text(label, props),
        k.pos(x, y),
        // origin function is now called anchor
        k.anchor("center"),
    ];
    
    if (with_value) {
        text_result.push({ value: 0 })
    }
    
    return k.add(text_result);
}

function getNewDirection() {
    return Math.random() >= 0.5 ? "left" : "right";
}

function handleKeyPressed(key, challenge_text, score_text) {
    k.onKeyPress(key, () => {
        if (challenge_text.text != key) {
            k.play("lost");
            k.go("lost", score_text.value);
            return;
        }
        
        score_text.value += 1;
        score_text.text = "Score: " + score_text.value;
        challenge_text.text = getNewDirection();
        k.play("right");
    });
}

const k = kaboom({
    width: 600,
    height: 600,
    background: [17, 35, 38,],
    global: false,
});

k.loadSound("right", "assets/sfx/right.wav");
k.loadSound("lost", "assets/sfx/lost.wav");

readLinesFromFile("assets/data/proverbs.txt")
        .then(
            (fileLines) => {
                const randomIndex = Math.floor(Math.random() * fileLines.length);
                const randomLine = fileLines[randomIndex];
                
                createText(randomLine, { size: 30, width: 500 }, k.width() / 2, k.height() / 4);
                
                k.wait(2, () => {
                    createText("Press space to start", { size: 24 }, k.width() / 2, k.height() * 0.75);
                    k.onKeyPress("space", () => k.go("game"));
                });
            }
        )
        .catch((error) => {
            console.error("Error retrieving file: ", error);
        });

k.scene("game", () => {
    const score = createText("Score: 0", { size: 24 }, 100, 24, true);
    const challenge_text = createText(getNewDirection(), { size: 48 }, k.width() / 2, k.height() / 2);
    
    handleKeyPressed("left", challenge_text, score);
    handleKeyPressed("right", challenge_text, score);
});

k.scene("lost", (score) => {
    createText("You lost!", { size: 48 }, k.width() / 2, k.height() / 4);
    createText("You got: " + score, { size: 24 }, k.width() / 2, k.height() / 2);
    createText("Press space to restart", { size: 24 }, k.width() / 2, k.height() * 0.75);
    k.onKeyPress("space", () => k.go("game"));
});

