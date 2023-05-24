window.canvas = document.getElementById("content");
window.ctx = window.canvas.getContext("2d");
window.hoverbox = document.getElementById("onhover");
window.worlds = document.getElementById("worlds");
window.blog = document.getElementById("blog");
window.boxCenterTop = document.getElementById("boxcentertop");
window.canvas.width = window.innerWidth;
window.canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

let hoverBox = false;
let boxHoverText = "";
let selectedWorld = 0;
let currentQuestion = 0;
let mouseX, mouseY, mouseDown
let width = window.innerWidth
let height = window.innerHeight
let currentPage = "home page";
let wrongQuestions = [];
let globalMistakes = [];
let previousPage = currentPage;

if(localStorage.getItem("mistakes")) {
    globalMistakes = localStorage.getItem("mistakes");
}

async function Website() {

    let drawPage = {
        "home page": () => {},
        "blog": () => {},
        "quiz": () => {},
        "results": () => {},
    }

    let html = {
        "home page": {
            enter: [window.worlds, window.boxCenterTop],
            exit: [window.worlds, window.boxCenterTop],
            onenter: () => {
                window.boxCenterTop.placeholder = "Search"
                deselect()
                selectedWorld = 0
            },
            onexit: () => {
                window.boxCenterTop.onmousedown = null
            }
        },
        "blog": {
            enter: [window.blog],
            exit: [window.blog],
            onenter: () => {
                window.blog.innerHTML = "";
                window.blog.innerHTML += "<h1>" + postData[selectedWorld - 1].title + "</h1>"
                window.blog.innerHTML += postData[selectedWorld - 1].content;
            }
        }
    }
    // The different pages

    drawPage["home page"] = () => {
        fill(35, 51, 34)
        rect(0, 0, 1000, height, "centre");
        fill(150)
    }
    drawPage["blog"] = () => {
        fill(200)
        rect(0, 0, 900, height, "centre");
    }
    drawPage["quiz"] = () => {
        fill(200)
        rect(0, 0, 900, height, "centre");
        textSize(100);
        fill(20)
        textSize(16);
        ctx.textAlign = "left"
        text((currentQuestion + 1) + "/" + questionData[selectedWorld - 1].question.length, width / 2 - 360, height / 2 - 30, 12);
        textSize(36);
        text(questionData[selectedWorld - 1].question[currentQuestion], width / 2 - 360, height / 2 + 30, 12);
    }
    drawPage["results"] = () => {
        fill(200)
        rect(0, 0, 900, height, "centre");
        fill(20)
        textSize(43);
        ctx.textAlign = 'center';
        text(createMessage(), width / 2, height / 2 - 30, 12);
    }

    function addWorld(name, id, excerpt, difficulty, tag) {
        let div = document.createElement("div")
        div.className = "world"
        div.onclick = () => {
            deselect()
            div.classList.add("selected")
            selectedWorld = id + 1
            Button.draw();
        }
        div.onmouseover = () => {
            if (excerpt != "") {
                hoverBox = true;
                boxHoverText = excerpt;
            }
        }
        div.onmouseout = () => {
            hoverBox = false
        }
        let br = "<br>"
        div.id = id
        div.innerHTML = "<strong>" + sanitize(name) + "</strong>" + br
        if (difficulty) {
            div.innerHTML += "<span style='float: right'>" + difficulties[difficulty - 1] + "</span>" + br
        }
        div.innerHTML += "<span>" + tag + "</span>" + br
        window.worlds.appendChild(div)
    }

    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }

        return array;
    }

    const deselect = () => {
        let elem = document.getElementsByClassName("selected")
        if (elem && elem[0]) {
            elem[0].classList.remove("selected")
        }
    }
    function createMessage() {
        var current = 1;
        var ratio = 1 / (results.length - 1);
        var data = wrongQuestions.length / questionData[selectedWorld - 1].question.length;
        var txt = "";
        for (var i = 0; i < results.length; i++) {
            if(data >= current && data < current + ratio) {
                let rgb = (255 / (results.length)) * i;
                fill(rgb,120,rgb/2)
                txt = results[i]
            }
            current -= ratio;
        }
        console.log(txt)
        return txt
    }
        
    function initButtons() {
        Button.all = []
        window.worlds.innerHTML = "";
        if (currentPage == "home page") {
            for (var i = 0; i < postData.length; i++) {
                let string = postData[i].title + postData[i].excerpt + postData[i].tag
                if (string.toLowerCase().includes(boxCenterTop.value.toLowerCase())) {
                    addWorld(postData[i].title, postData.indexOf(postData[i]), postData[i].excerpt, postData[i].difficulty, postData[i].tag)
                } else {
                    if (document.getElementById(postData.indexOf(postData[i]))) {
                        window.worlds.removeChild(document.getElementById(postData.indexOf(postData[i])))
                    }
                    hoverBox = false;
                    createHoverBox();
                    selectedWorld = 0;
                }
            }
        }
        let w4 = Math.min(width / 4 - 10, 220)
        let x4 = w4 / 2 + 5
        let w2 = Math.min(width / 2 - 10, 450)
        let x2 = w2 / 2 + 5
        let mid = width / 2
        Button.add(mid + 3 * x4, height - 30, w4, 40, "Practice", "home page", () => {
            selectedWorld;
            changePage("quiz")
        })
        Button.add(mid + x4, height - 30, w4, 40, "Revise", "home page", () => changePage("quiz"), () => {
            var selectable = true
            if (selectedWorld && questionData[selectedWorld - 1].question) {
                selectable = false
            }
            return selectable
        })
        Button.add(mid - x4, height - 30, w4, 40, "Podium", "home page", () => {
            postData.reverse()
            initButtons()
        })
        Button.add(mid - 3 * x4, height - 30, w4, 40, "Achievements", "home page", () => changePage("main menu"))
        Button.add(mid + x2, height - 75, w2, 40, "Read selected article", "home page", () => changePage("blog"), () => !selectedWorld)
        Button.add(mid - x2, height - 75, w2, 40, "Mistakes (1)", "home page", () => changePage("blog"))
        Button.add(mid - x2, height - 30, 340, 40, "Back", "blog", () => changePage("home page"))
        Button.add(mid + x2, height - 30, 340, 40, "Take Quiz", "blog", () => {
            wrongQuestions = []
            changePage("quiz")
        }, () => {
            var selectable = true
            if (selectedWorld && questionData[selectedWorld - 1].question) {
                selectable = false
            }
            return selectable
        })
        Button.add(mid - 120, height / 2 + 130, 200, 40, "Play Again", "results", () => {
            wrongQuestions = [];
            changePage("quiz");
        })
        Button.add(mid + 120, height / 2 + 130, 200, 40, "Next", "results", () => {
            wrongQuestions = [];
            changePage("home page")
        })

        let questionAmount = 3;
        let randomQuestions = [];

        if (selectedWorld && questionData[selectedWorld - 1].question) {
            if (questionData[selectedWorld - 1].answers.length + questionData[selectedWorld - 1].options.length > 3) {
                if ((selectedWorld - 1) == 2) { // TODO : cleanup
                    for (var i = 0; i < 5; i++) {
                        randomQuestions.push(questionData[selectedWorld - 1].answers[i]);
                    }
                } else {
                    for (var i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
                        randomQuestions.push(questionData[selectedWorld - 1].options[i]);
                    }
                }
            } else {
                for (var i = 0; i < questionData[selectedWorld - 1].options.length; i++) {
                    randomQuestions.push(questionData[selectedWorld - 1].options[i]);
                }
            }

            let index = randomQuestions.indexOf(questionData[selectedWorld - 1].answers[currentQuestion]);
            randomQuestions.splice(index, 1);
            randomQuestions.push(questionData[selectedWorld - 1].answers[currentQuestion]);
            randomQuestions = shuffle(randomQuestions);
            questionAmount = randomQuestions.length;
            for (var i = 0; i < questionAmount; i++) {
                let w3 = width / (questionAmount * 2);
                let x3 = 0;
                let h1 = 40;
                let clicked = i;
                if (width < 900) {
                    w3 = width / questionAmount;
                }
                if (questionAmount % 2) {
                    x3 = width / 2 - w3 * (Math.round((questionAmount - 1) / 2) - i)
                    if (i >= Math.round(questionAmount / 2)) {
                        x3 = width / 2 + w3 * i - w3 * Math.round((questionAmount - 1) / 2)
                    }
                    if ((selectedWorld - 1) == 2) { // colour game
                        Button.add(x3, height / 2 + 130, w3 - 20, h1, randomQuestions[i], "quiz", () => varify(randomQuestions[clicked]), false, randomQuestions[i])
                    } else {
                        Button.add(x3, height / 2 + 130, w3 - 20, h1, randomQuestions[i], "quiz", () => varify(randomQuestions[clicked]), false)
                    }
                } else {
                    x3 = width / 2 - w3 * ((questionAmount - 1) / 2 - i)
                    if (i >= questionAmount / 2) {
                        x3 = width / 2 + w3 * i - w3 * (questionAmount - 1) / 2
                    }
                    Button.add(x3, height / 2 + 130, w3 - 20, h1, randomQuestions[i], "quiz", () => varify(randomQuestions[clicked]), false)
                }
            }
        }
    }

    function changePage(page) {
        if (page == "blog") {
            //window.history.pushState({}, null, "./?post=" + selectedWorld.link);
        }
        if (html[currentPage] && html[currentPage].exit) {
            for (let element of html[currentPage].exit) {
                element.classList.add("hidden")
            }
        }

        if (html[page] && html[page].enter) {
            for (let element of html[page].enter) {
                element.classList.remove("hidden")
            }
        }

        if (html[page] && html[page].onenter) {
            html[page].onenter()
        }
        if (html[page] && html[page].onexit) {
            html[page].onexit()
        }

        previousPage = currentPage
        currentPage = page
        mouseDown = false
        initButtons()
        clear()
        drawPage[currentPage]()
        Button.draw()
    }

    function trackMouse(e) {
        createHoverBox()
        cursor("")
        mouseX = e.x
        mouseY = e.y + window.scrollY
        clear()
        drawPage[currentPage]()
        Button.draw()
    }

    function varify(selected) {

        if (selected.toLowerCase() != questionData[selectedWorld - 1].answers[currentQuestion].toLowerCase()) {
            wrongQuestions.push(selected);
            console.log(wrongQuestions)
        }
        if (currentQuestion >= questionData[selectedWorld - 1].question.length - 1) {
            changePage("results")
            currentQuestion = 0;
        } else {
            currentQuestion += 1;
        }
        initButtons()
        drawPage[currentPage]()
    }

    document.onmousemove = trackMouse

    canvas.onmousedown = function(e) {
        mouseX = e.x
        mouseY = e.y + window.scrollY
        mouseDown = true
        Button.click()
    }

    window.boxCenterTop.onkeyup = (e) => {
        initButtons()
    }

    window.onresize = () => {
        width = window.innerWidth
        height = window.innerHeight
        canvas.width = width
        canvas.height = height
        clear()
        initButtons()
        drawPage[currentPage]()
        Button.draw()
    }

    setTimeout(() => {
        initButtons()
        drawPage[currentPage]()
        Button.draw()
        changePage(currentPage);
    }, 10)
}

window.onload = async function() {
    var init = await Website()
}