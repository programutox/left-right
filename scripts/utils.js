function createText(label, props, x, y, with_value=false) {
    let text_result = [
        text(label, props),
        pos(x, y),
        // origin function is now called anchor
        anchor("center"),
    ];
    
    if (with_value) {
        text_result.push({ value: 0 })
    }
    
    return add(text_result);
}

// Formats number to 2 digits
function formatNumber(number) {
    return number.toString().padStart(2, '0');
}
