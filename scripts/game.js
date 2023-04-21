function addButton(tag, x, y) {
    return add([
        sprite(tag),
        pos(x, y),
        scale(0.5),
        area(),
        tag,
    ]);
}

function getNewDirection() {
    return chance(0.5) ? "left" : "right";
}

function updateGame(key, directions, directionsTexts, scoreText) {
    if (directionsTexts[0].text !== key) {
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
    
    play("next");
}

function handleKeyPress(key, directions, directionsTexts, scoreText) {
    onKeyPress(key, () => updateGame(key, directions, directionsTexts, scoreText));
    onClick(key, () => updateGame(key, directions, directionsTexts, scoreText));
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

    const button_offset = 64;
    const leftButton = addButton("left", button_offset, height() - button_offset * 2);
    const rightButton = addButton("right", width() - button_offset * 2, height() - button_offset * 2);

    let barTimer = time();
    const timeLimit = 30.0;

    handleKeyPress("left", directions, directionsTexts, score);
    handleKeyPress("right", directions, directionsTexts, score);

    onUpdate(() => {
        timeBar.width = (time() - barTimer) / timeLimit * timeBarBg.width;

        if (timeBar.width > timeBarBg.width) {
            play("lost");
            go("lost", score.value);
        }
    });

    const sprite_offset = 25;
    const sprite_size = 128;

    onDraw(() => {
        drawSprite({
            sprite: isKeyDown("left") || leftButton.isClicked() ? "red_press" : "red_idle",
            pos: vec2(sprite_offset, (height() - sprite_size) / 2),
        });
        
        drawSprite({
            sprite: isKeyDown("right") || rightButton.isClicked() ? "blue_press" : "blue_idle",
            pos: vec2(width() - sprite_offset - sprite_size, (height() - sprite_size) / 2),
        });
    });
}
