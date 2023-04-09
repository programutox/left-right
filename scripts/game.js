function getNewDirection() {
    return Math.random() >= 0.5 ? "left" : "right";
}

function handleKeyPressed(key, challenge_text, score_text) {
    onKeyPress(key, () => {
        if (challenge_text.text != key) {
            play("lost");
            go("lost", score_text.value);
            return;
        }
        
        score_text.value += 1;
        score_text.text = "Score: " + formatNumber(score_text.value);
        challenge_text.text = getNewDirection();
        play("right");
    });
}

function game_scene() {
    scene("game", () => {
        const score = createText("Score: 00", { size: 24 }, 100, 24, true);
        const challenge_text = createText(getNewDirection(), { size: 48 }, width() / 2, height() / 2);

        const bar_size = vec2(100, 15);
        const progression_speed = 10;

        add([
            pos((width() - bar_size.x) / 2, height() - bar_size.y),
            rect(bar_size.x, bar_size.y),
            color(85, 85, 85),
        ]);
        
        handleKeyPressed("left", challenge_text, score);
        handleKeyPressed("right", challenge_text, score);

        const time_elapsed = time();
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
    });
}