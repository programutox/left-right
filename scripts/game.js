function getNewDirection() {
    return Math.random() >= 0.5 ? "left" : "right";
}

function updateGame(key, directions, directions_texts, score_text) {
    if (directions_texts[0].text != key) {
        play("lost");
        go("lost", score_text.value);
        return;
    }
    
    directions.shift();
    directions.push(getNewDirection());
    
    for (let i = 0; i < directions.length; i++) {
        directions_texts[i].text = directions[i];
    }
    
    score_text.value += 1;
    score_text.text = "Score: " + formatNumber(score_text.value);
    
    play("right");
}

function handleKeyPress(key, directions, directions_texts, score_text) {
    onKeyPress(key, () => updateGame(key, directions, directions_texts, score_text));
}

function game_scene() {
    const score = createText("Score: 00", { size: 24 }, 100, 24, true);

    const directions_length = 10;
    let directions = [];
    for (let i = 0; i < directions_length; i++) {
        directions.push(getNewDirection());
    }
    
    let directions_texts = [createText(directions[0], { size: 32 }, width() / 2, height() * 0.75)];
    for (let i = 1; i < directions_length; i++) {
        directions_texts.push(createText(directions[i], { size: 16 }, width() / 2, height() * 0.75 - i * 32));
    }
    
    const bar_size = vec2(100, 15);
    const progression_speed = 10;

    add([
        pos((width() - bar_size.x) / 2, height() - bar_size.y),
        rect(bar_size.x, bar_size.y),
        color(85, 85, 85),
    ]);
    
    handleKeyPress("left", directions, directions_texts, score);
    handleKeyPress("right", directions, directions_texts, score);

    let time_bar_size = 0;

    onUpdate(() => {
        time_bar_size += progression_speed * dt();
        if (time_bar_size > bar_size.x) {
            play("lost");
            go("lost", score.value);
        }
    });

    onDraw(() => {
        drawRect({
            width: time_bar_size,
            height: bar_size.y,
            pos: vec2((width() - bar_size.x) / 2, height() - bar_size.y),
            color: YELLOW,
        })
    });
}