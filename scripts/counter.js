function counterScene() {
    const counterText = createText("3", { size: 32 }, width() / 2, height() / 2);
    const elapsed = time();
    const timeStep = 0.5;
    const between = (left, a, right) => left < a && a < right;

    // This variable is used to track time and make changes when necessary
    let changes = 0;

    const texts = ["2", "1", "Go!"];
    play("counter");
    
    onUpdate(() => {
        const diff = time() - elapsed;
        
        if (diff < timeStep) {
            return;
        }
        
        for (let i = 0; i < texts.length; ++i) {
            if (changes == i && between((i + 1) * timeStep, diff, (i + 2) * timeStep)) {
                play(i < texts.length - 1 ? "counter" : "go");
                counterText.text = texts[i];
                ++changes;
            }
        }
        
        // go instruction will be executed once
        if (diff > (texts.length + 1) * timeStep) {
            go("game");
        }
    });
}
