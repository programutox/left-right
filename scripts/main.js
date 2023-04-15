function main() {
    kaboom({
        width: 600,
        height: 600,
        background: [17, 35, 38,],
    });
    
    loadSound("right", "../assets/sfx/right.wav");
    loadSound("lost", "../assets/sfx/lost.wav");
    
    create_menu_scene();
    scene("counter", counter_scene);
    scene("game", game_scene);
    scene("lost", (score) => lost_scene(score));
}

main()

