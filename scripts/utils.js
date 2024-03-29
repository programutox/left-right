function createText(label, props, x, y, withValue=false, color=null) {
    let textResult = [
        text(label, props),
        pos(x, y),
        // origin function is now called anchor
        anchor("center"),
    ];
    
    if (withValue) {
        textResult.push({ value: 0 });
    }

    if (color !== null) {
        textResult.push(color);
    }
    
    return add(textResult);
}

// Formats number to 3 digits
function formatNumber(number) {
    return number.toString().padStart(3, '0');
}
