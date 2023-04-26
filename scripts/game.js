function addButton(tag, x, y) {
    return add([
        sprite(tag),
        pos(x, y),
        scale(0.5),
        area(),
        tag,
    ]);
}

function directionColor(direction) {
    return direction === "left" ? RED : BLUE;
}

function addRectangle(x, y, direction, scaleX=1.0) {
    return add([
        pos(x, y),
        sprite("platform"),
        anchor("center"),
        color(directionColor(direction)),
        scale(scaleX, 1.0),
    ]);
}

function getNewDirection() {
    return chance(0.5) ? "left" : "right";
}

function areColorsEqual(left, right) {
    return left.r === right.r && left.g === right.g && left.b === right.b;
}

function updateGame(key, directions, directionsRects, score, goToLostScene) {
    if (!areColorsEqual(directionsRects[0].color, directionColor(key))) {
        goToLostScene();
        return;
    }
    
    directions.shift();
    directions.push(getNewDirection());
    
    for (let i = 0; i < directions.length; ++i) {
        directionsRects[i].color = directionColor(directions[i]);
    }

    score.value += 1;
    score.text = `Score: ${formatNumber(score.value)}`;
    
    play("next");
}

function handleKeyPress(key, directions, directionsRects, score, goToLostScene) {
    onKeyPress(key, () => updateGame(key, directions, directionsRects, score, goToLostScene));
    onClick(key, () => updateGame(key, directions, directionsRects, score, goToLostScene));
}

function gameScene(current_highscore) {
    const score = createText("Score: 000", { size: 24 }, 100, 24, true);
    const highscore = createText(`Highscore: ${formatNumber(current_highscore)}`, { size: 24 }, 128, 48, true);
    highscore.value = current_highscore;

    const goToLostScene = () => {
        play("lost");
        go("lost", score.value, highscore.value);
    };

    add([
        rect(50, height()),
        pos((width() - 50) / 2, 0),
        color(90, 140, 180),
        outline(2, BLACK),
    ]);

    const directionsLength = 10;
    let directions = [];
    for (let i = 0; i < directionsLength; ++i) {
        directions.push(getNewDirection());
    }
    
    let directionsRects = [addRectangle(width() / 2, height() * 0.75, directions[0])];
    for (let i = 1; i < directionsLength; ++i) {
        directionsRects.push(addRectangle(width() / 2, height() * 0.75 - i * 32, directions[i], 0.5));
    }
    
    const barSize = vec2(200, 15);

    const timeBarBg = add([
        pos((width() - barSize.x) / 2, height() - barSize.y - 2),
        rect(barSize.x, barSize.y),
        color(85, 85, 85),
        outline(2, BLACK),
    ]);

    const timeBar = add([
        pos(timeBarBg.pos.x + 1, timeBarBg.pos.y + 1),
        rect(0, timeBarBg.height - 2),
        color(YELLOW),
    ]);

    const button_offset = 64;
    const leftButton = addButton("left", button_offset, height() - button_offset * 2);
    const rightButton = addButton("right", width() - button_offset * 2, height() - button_offset * 2);

    let barTimer = time();
    const timeLimit = 30.0;

    handleKeyPress("left", directions, directionsRects, score, goToLostScene);
    handleKeyPress("right", directions, directionsRects, score, goToLostScene);

    onUpdate(() => {
        timeBar.width = (time() - barTimer) / timeLimit * (timeBarBg.width - 2);

        if (timeBar.width > timeBarBg.width - 2) {
            goToLostScene();
        }
    });

    const sprite_offset = 25;
    const sprite_size = 128;

    onDraw(() => {
        drawSprite({
            sprite: isKeyDown("left") || (leftButton.isHovering() && isMouseDown("left")) ? "red_press" : "red_idle",
            pos: vec2(sprite_offset, (height() - sprite_size) / 2),
        });
        
        drawSprite({
            sprite: isKeyDown("right") || (rightButton.isHovering() && isMouseDown("left")) ? "blue_press" : "blue_idle",
            pos: vec2(width() - sprite_offset - sprite_size, (height() - sprite_size) / 2),
        });
    });
}
