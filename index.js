
let fill = function(r, g, b) {
    if (g === undefined) {
        g = r
        b = r
    }
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")"
}
let strokeWeight = function(num) {
    ctx.lineWidth = num
}
let stroke = function(r, g, b) {
    if (g === undefined) {
        g = r
        b = r
    }
    ctx.strokeStyle = "rgb(" + r + ", " + g + ", " + b + ")"
}
let line = function(x1, y1, x2, y2) {
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
}

function text(txt, x, y, h) {
    h = h || 0

    let lines = txt.split("\n")
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + h * i)
    }
}

function processColours(colour) {
    if (colour == undefined) {
        colour = "gray"
    }
    if (colour == "green") {
        clr = [34, 139, 34]
    } else if (colour == "red") {
        clr = [178, 34, 34]
    } else if (colour == "blue") {
        clr = [65, 105, 225]
    } else if (colour == "purple") {
        clr = [139, 0, 139]
    } else if (colour == "gray") {
        clr = [120, 120, 120]
    } else if (colour == "yellow") {
        clr = [204, 204, 0]
    } else {
        clr = [120, 120, 120]
    }
    return clr
}

function rect(x, y, w, h, mode = "") {
    if (mode == "centre") {
        x = (width - w) / 2
    }
    ctx.fillRect(x, y, w, h)
}

function textSize(size) {
    ctx.font = size + 'px Monospace'
}

function sanitize(text) {
    const el = document.createElement('div')
    el.textContent = text
    return el.innerHTML
}

const HAND = "pointer"
const CROSS = "crosshair"
let cursor = function(type) {
    canvas.style.cursor = type
}

const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height)