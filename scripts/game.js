function getNewDirection() {
    return getRandomBoolean() ? "left" : "right";
}

function updateGame(key, directions, directionsTexts, scoreText) {
    if (directionsTexts[0].text != key) {
        play("lost");
        go("lost", scoreText.value);
        return;
    }
    
    directions.shift();
    directions.push(getNewDirection());
    
    for (let i = 0; i < directions.length; ++i) {
        directionsTexts[i].text = directions[i];
    }
    
    scoreText.value += 1;
    scoreText.text = `Score: ${formatNumber(scoreText.value)}`
    
    play("right");
}

function handleKeyPress(key, directions, directionsTexts, scoreText) {
    onKeyPress(key, () => updateGame(key, directions, directionsTexts, scoreText));
}

function gameScene() {
    const score = createText("Score: 00", { size: 24 }, 100, 24, true);

    const directionsLength = 10;
    let directions = [];
    for (let i = 0; i < directionsLength; ++i) {
        directions.push(getNewDirection());
    }
    
    const gray = color(128, 128, 128);
    let directionsTexts = [createText(directions[0], { size: 32 }, width() / 2, height() * 0.75)];
    for (let i = 1; i < directionsLength; ++i) {
        directionsTexts.push(createText(directions[i], { size: 16 }, width() / 2, height() * 0.75 - i * 32, false, gray));
    }
    
    const barSize = vec2(100, 15);
    const progressionSpeed = 10;

    add([
        pos((width() - barSize.x) / 2, height() - barSize.y),
        rect(barSize.x, barSize.y),
        color(85, 85, 85),
    ]);
    
    handleKeyPress("left", directions, directionsTexts, score);
    handleKeyPress("right", directions, directionsTexts, score);

    let timeBarSize = 0;

    onUpdate(() => {
        timeBarSize += progressionSpeed * dt();
        if (timeBarSize > barSize.x) {
            play("lost");
            go("lost", score.value);
        }
    });

    onDraw(() => {
        drawRect({
            width: timeBarSize,
            height: barSize.y,
            pos: vec2((width() - barSize.x) / 2, height() - barSize.y),
            color: YELLOW,
        })
    });
}
