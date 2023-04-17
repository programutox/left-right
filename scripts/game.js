function getNewDirection() {
    return getRandomBoolean() ? "left" : "right";
}

function isCorrectDirectionPressed(direction, directionsTexts) {
    return isKeyPressed(direction) && directionsTexts[0].text === direction;
}

function updateGame(key, directions, directionsTexts, scoreText, hitPerSeconds) {
    if (directionsTexts[0].text !== key) {
        play("lost");
        go("lost", scoreText.value, average(hitPerSeconds));
        return;
    }
    
    directions.shift();
    directions.push(getNewDirection());
    
    for (let i = 0; i < directions.length; ++i) {
        directionsTexts[i].text = directions[i];
    }

    scoreText.value += 1;
    scoreText.text = `Score: ${formatNumber(scoreText.value)}`
    
    play("next");
}

function handleKeyPress(key, directions, directionsTexts, scoreText, hitPerSeconds) {
    onKeyPress(key, () => updateGame(key, directions, directionsTexts, scoreText, hitPerSeconds));
}

function average(values) {
    if (values.length < 1) {
        return 0.0;
    }
    return values.reduce((total, current) => total + current) / values.length;
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
    
    let hitPerSeconds = [];
    let hits = 0;
    let elapsed = time();

    let timeBarSize = 0;

    handleKeyPress("left", directions, directionsTexts, score, hitPerSeconds);
    handleKeyPress("right", directions, directionsTexts, score, hitPerSeconds);

    onUpdate(() => {
        if (isCorrectDirectionPressed("left", directionsTexts) || isCorrectDirectionPressed("right", directionsTexts)) {
            ++hits;
        }

        if (time() - elapsed > 1.0) {
            hitPerSeconds.push(hits);
            hits = 0;
            elapsed = time();
        }

        timeBarSize += progressionSpeed * dt();
        if (timeBarSize > barSize.x) {
            play("lost");
            go("lost", score.value, average(hitPerSeconds));
        }
    });

    onDraw(() => {
        drawSprite({
            sprite: isKeyDown("left") ? "red_press" : "red_idle",
            pos: vec2(25, height() * 0.75),
        });
        
        drawSprite({
            sprite: isKeyDown("right") ? "blue_press" : "blue_idle",
            pos: vec2(width() - 25 - 128, height() * 0.75, height() * 0.75),
        });

        drawRect({
            width: timeBarSize,
            height: barSize.y,
            pos: vec2((width() - barSize.x) / 2, height() - barSize.y),
            color: YELLOW,
        })
    });
}
