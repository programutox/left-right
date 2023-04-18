function getNewDirection() {
    return getRandomBoolean() ? "left" : "right";
}

function isCorrectDirectionPressed(direction, directionsTexts) {
    return isKeyPressed(direction) && directionsTexts[0].text === direction;
}

function updateGame(key, directions, directionsTexts, scoreText, hitsEverySecond) {
    if (directionsTexts[0].text !== key) {
        play("lost");
        go("lost", scoreText.value, average(hitsEverySecond));
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

function handleKeyPress(key, directions, directionsTexts, scoreText, hitsEverySecond) {
    onKeyPress(key, () => updateGame(key, directions, directionsTexts, scoreText, hitsEverySecond));
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
    
    const barSize = vec2(200, 15);

    const timeBarBg = add([
        pos((width() - barSize.x) / 2, height() - barSize.y),
        rect(barSize.x, barSize.y),
        color(85, 85, 85),
    ]);

    const timeBar = add([
        pos(timeBarBg.pos),
        rect(0, timeBarBg.height),
        color(YELLOW),
    ]);
    
    let hitsEverySecond = [];
    let hits = 0;
    let elapsed = time();

    let barTimer = time();
    const timeLimit = 30.0;

    handleKeyPress("left", directions, directionsTexts, score, hitsEverySecond);
    handleKeyPress("right", directions, directionsTexts, score, hitsEverySecond);

    onUpdate(() => {
        if (isCorrectDirectionPressed("left", directionsTexts) || isCorrectDirectionPressed("right", directionsTexts)) {
            ++hits;
        }

        if (time() - elapsed > 1.0) {
            hitsEverySecond.push(hits);
            hits = 0;
            elapsed = time();
        }

        timeBar.width = (time() - barTimer) / timeLimit * timeBarBg.width;

        if (timeBar.width > timeBarBg.width) {
            play("lost");
            go("lost", score.value, average(hitsEverySecond));
        }
    });

    const sprite_offset = 25;

    onDraw(() => {
        drawSprite({
            sprite: isKeyDown("left") ? "red_press" : "red_idle",
            pos: vec2(sprite_offset, height() * 0.75),
        });
        
        drawSprite({
            sprite: isKeyDown("right") ? "blue_press" : "blue_idle",
            pos: vec2(width() - sprite_offset - 128, height() * 0.75),
        });
    });
}
