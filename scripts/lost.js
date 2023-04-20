function lostScene(score, hitsPerSeconds) {
    createText("You lost!", { size: 48 }, width() / 2, height() / 4);
    createText(
        `You got ${formatNumber(score)} pts and ${hitsPerSeconds.toFixed(1)} HPS`, 
        { size: 24 }, 
        width() / 2, 
        height() / 2
    );

    handleGameStart("Press space to restart", "Touch to restart")
}
