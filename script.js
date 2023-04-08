function getNewDirection() {
    return Math.random() >= 0.5 ? "Left" : "Right"
}

kaboom({
    width: 600,
    height: 600,
    background: [17, 35, 38,],
})

scene("menu", () => {
    add([
        pos(150, height() / 2 - 48),
        text("Left Right", { size: 48 }),
    ])
    
    onClick(() => go("game"))
})

scene("game", () => {
    const score = add([
        pos(24, 24),
        text("Score: 0", { size: 24 }),
        { value: 0 },
    ])
    
    const challenge_text = add([
        pos(150, height() / 2 - 48),
        text(getNewDirection(), { size: 48 }),
    ])
    
    onKeyPress("left", () => {
        console.log("nice")
    })
})

go("menu")

