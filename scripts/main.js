function loadSpriteUsingTag(tag) {
    loadSprite(tag, `./assets/img/${tag}.png`);
}

function loadSoundUsingTag(tag) {
    loadSound(tag, `./assets/sfx/${tag}.wav`);
}

function main() {
    kaboom({
        width: 600,
        height: 600,
        background: [17, 35, 38,],
    });
    
    loadSpriteUsingTag("arrows");
    loadSpriteUsingTag("red_idle");
    loadSpriteUsingTag("red_press");
    loadSpriteUsingTag("blue_idle");
    loadSpriteUsingTag("blue_press");
    
    loadSoundUsingTag("next");
    loadSoundUsingTag("lost");
    loadSoundUsingTag("counter");
    loadSoundUsingTag("go");
    
    createMenuScene();
    scene("counter", counterScene);
    scene("game", gameScene);
    scene("lost", lostScene);
}

main()
