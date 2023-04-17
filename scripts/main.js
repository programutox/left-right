function loadSpriteUsingTag(tag) {
    loadSprite(tag, `../assets/img/${tag}.png`);
}

function loadSoundUsingTag(tag) {
    loadSound(tag, `../assets/sfx/${tag}.wav`);
}

function main() {
    kaboom({
        width: 600,
        height: 600,
        background: [17, 35, 38,],
    });
    
    loadSpriteUsingTag("arrows");
    loadSpriteUsingTag("red_guy1");
    loadSpriteUsingTag("red_guy2");
    loadSpriteUsingTag("blue_guy1");
    loadSpriteUsingTag("blue_guy2");
    
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
