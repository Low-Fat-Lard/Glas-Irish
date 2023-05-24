
class Button {
    constructor(x, y, w, h, labels, scenes, callback, disabled, colour, hoverText) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.index = 0;
        this.disabled = disabled || (() => false);
        this.hoverText = !hoverText || typeof hoverText === "string" ? () => hoverText : hoverText;
        this.scenes = Array.isArray(scenes) ? scenes : [scenes];
        this.labels = Array.isArray(labels) ? labels : [labels];
        this.callback = callback;
        this.colour = processColours(colour);
    }

    mouseIsOver() {
        return mouseX >= this.x - this.w / 2 && mouseX <= this.x + this.w / 2 && mouseY >= this.y - this.h / 2 && mouseY <= this.y + this.h / 2;
    }

    draw() {
        if (!this.scenes.includes(currentPage)) {
            return;
        }
        const hovering = this.mouseIsOver();
        const disabled = this.disabled();
        const hoverText = this.hoverText();

        // Outline
        ctx.beginPath();
        if (hovering && !disabled) {
            strokeWeight(7);
            stroke(255);
            cursor(HAND);
        } else {
            strokeWeight(3);
            stroke(0);
        }
        if (disabled) {
            fill(60);
        } else {
            fill(this.colour[0], this.colour[1], this.colour[2]);
        }


        ctx.rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.stroke();
        ctx.fill();

        // Label
        fill(255);
        textSize(16);
        ctx.textAlign = 'center';
        text(this.labels[this.index], this.x, this.y + this.h / 8)

        if (hovering && hoverText) {
            boxHoverText = hoverText;
            hoverBox = true
        }
    }

    click() {
        if (this.disabled() || !mouseDown || !this.scenes.includes(currentPage)) {
            return false;
        }

        if (this.mouseIsOver()) {
            this.index = (this.index + 1) % this.labels.length;
            this.callback(this.labels[this.index]);
            return true;
        }
    }

    static draw() {
        for (const button of Button.all) {
            button.draw();
        }
    }

    static click() {
        for (const button of Button.all) {
            if (button.click()) {
                Button.draw();
                break;
            }
        }
    }

    static add(x, y, w, h, labels, scenes, callback, disabled, hoverText) {
        Button.all.push(new Button(x, y, w, h, labels, scenes, callback, disabled, hoverText));
    }
}


function createHoverBox() {
    if (hoverBox) {
        hoverbox.classList.remove("hidden");
        hoverbox.innerText = boxHoverText;
        if (mouseY < height / 2) {
            hoverbox.style.bottom = "";
            hoverbox.style.top = mouseY + 10 + "px";
        } else {
            hoverbox.style.top = "";
            hoverbox.style.bottom = height - mouseY + 10 + "px";
        }
        if (mouseX < width / 2) {
            hoverbox.style.right = "";
            hoverbox.style.left = mouseX + 10 + "px";
        } else {
            hoverbox.style.left = "";
            hoverbox.style.right = width - mouseX + 10 + "px";
        }
    } else {
        hoverbox.classList.add("hidden");
    }
}

Button.all = [];