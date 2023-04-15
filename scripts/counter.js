function counterScene() {
    const counterText = createText("3", { size: 32 }, width() / 2, height() / 2);
    const elapsed = time();
    const timeStep = 0.5;
    
    onUpdate(() => {
        const diff = time() - elapsed;
        
        if (diff < timeStep) {
            return;
        }
        
        if (diff < timeStep * 2) {
            counterText.text = "2";
        } else if (diff < timeStep * 3) {
            counterText.text = "1";   
        } else {
            go("game");  
        }
    });
}
