function main() {
    kaboom({
        width: 600,
        height: 600,
        background: [17, 35, 38,],
    });
    
    loadSprite("arrows", "../assets/img/arrows.png");
    
    loadSound("right", "../assets/sfx/right.wav");
    loadSound("lost", "../assets/sfx/lost.wav");
    
    createMenuScene();
    scene("counter", counterScene);
    scene("game", gameScene);
    scene("lost", lostScene);
}

main()
