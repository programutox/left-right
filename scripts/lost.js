function lostText(score, highscore) {
    if (score > highscore) {
        return `You got ${score} pts! You've beaten the highscore!`;
    }

    if (score == highscore) {
        return `You got ${score} pts! You've almost beaten the highscore!`
    }

    return `You got ${score}/${highscore}. Try again!`;
}

function lostScene(score, highscore) {
    createText("You lost!", { size: 48 }, width() / 2, height() / 4);
    createText(
        lostText(score, highscore), 
        { size: 24, width: width() - 100 }, 
        width() / 2, 
        height() / 2
    );

    handleGameStart("Press space to restart", "Touch to restart", Math.max(score, highscore));
}
