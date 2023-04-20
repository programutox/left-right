function lostScene(score, hitsPerSeconds) {
    createText("You lost!", { size: 48 }, width() / 2, height() / 4);
    createText(
        `You got ${formatNumber(score)} pts and ${hitsPerSeconds.toFixed(1)} HPS`, 
        { size: 24 }, 
        width() / 2, 
        height() / 2
    );

    const instructions = isTouchScreen() ? "Touch to restart" : "Press space to restart";
    createText(instructions, { size: 24 }, width() / 2, height() * 0.75);
    
    if (isTouchScreen()) {
        onClick(() => go("counter"));
    } else {
        onKeyPress("space", () => go("counter"));
    }
}
