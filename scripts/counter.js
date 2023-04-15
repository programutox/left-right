function counter_scene() {
    scene("counter", () => {
        const counter_text = createText("3", { size: 32 }, width() / 2, height() / 2);
        const elapsed = time();
        const time_step = 0.5;
        
        onUpdate(() => {
            const diff = time() - elapsed;
            
            if (diff < time_step) {
                return;
            }
            
            if (diff < time_step * 2) {
                counter_text.text = "2";
                console.log("2"); 
            } else if (diff < time_step * 3) {
                counter_text.text = "1";   
            } else {
                go("game");  
            }
        });
    });  
}
