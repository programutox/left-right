function lostScene(score) {
    createText("You lost!", { size: 48 }, width() / 2, height() / 4);
    createText(
        `You got ${formatNumber(score)} points`, 
        { size: 24 }, 
        width() / 2, 
        height() / 2
    );

    handleGameStart("Press space to restart", "Touch to restart")
}
