function loadSpriteUsingTag(tag) {
    loadSprite(tag, `./assets/img/${tag}.png`);
}

function loadSoundUsingTag(tag) {
    loadSound(tag, `./assets/sfx/${tag}.wav`);
}

function main() {
    kaboom({
        width: 600,
        height: 400,
        background: [17, 35, 38,],
    });

    const spritesTags = ["arrows", "left", "right", "red_idle", "red_press", "blue_idle", "blue_press"]
    spritesTags.forEach(loadSpriteUsingTag);

    const soundsTags = ["next", "lost", "counter", "go"];
    soundsTags.forEach(loadSoundUsingTag);
    
    createMenuScene();
    scene("counter", counterScene);
    scene("game", gameScene);
    scene("lost", lostScene);
}

main()
