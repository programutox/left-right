function lost_scene() {
    scene("lost", (score) => {
    createText("You lost!", { size: 48 }, width() / 2, height() / 4);
        createText("You got: " + formatNumber(score), { size: 24 }, width() / 2, height() / 2);
        createText("Press space to restart", { size: 24 }, width() / 2, height() * 0.75);
        
        onKeyPress("space", () => go("counter"));
    });
}

