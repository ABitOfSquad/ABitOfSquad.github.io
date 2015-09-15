var canvas
var canvasWidth = window.innerWidth
var cursorLocation = {"x": 0, "y": 0}

var messages = [
    {msg: "/about", self: true, time: 1},
    {msg: "Hi! I'm squadbot!", self: false, time: 2},
    {msg: "I can do many things", self: false, time: 3},
    {msg: "Can you?", self: true, time: 4},
    {msg: "Well, yes.", self: false, time: 5},
    {msg: "More text", self: false, time: 6},
    {msg: "More text??", self: true, time: 7},
    {msg: "More text.", self: false, time: 8},
    {msg: "That's a lot of text.", self: true, time: 9},
    {msg: "I mean like A LOT", self: true, time: 10},
    {msg: "Ikr", self: false, time: 11},

]

function drawCanvas() {
    function makeRect(x, y, color) {
        canvas.beginPath()
        canvas.rect(x, x, 21, 21)
        canvas.fillStyle = color
        canvas.fill()
    }
    
    canvas.clearRect(0, 0, canvasWidth, 200)
    
    makeRect(100, 100, "#342")
}

function turnEyes() {
    var ids = ["botPupilLeft", "botPupilRight"]
    var correction = [0, 180]
    
    for (var i = 0; i < ids.length; i++) {
        var node = document.getElementById(ids[i])
        var offset = {
            "top": node.offsetTop + parseFloat(window.getComputedStyle(node).width) / 2,
            "left": node.offsetLeft + parseFloat(window.getComputedStyle(node).height) / 2
        }
        
        if (node.offsetParent) {
            temp = node;
            while (temp = temp.offsetParent) {
                offset.top += temp.offsetTop,
                offset.left += temp.offsetLeft
            }
        }

        angle = Math.atan2(cursorLocation.y - offset.top, cursorLocation.x - offset.left) * (180 / Math.PI) + correction[i];
        document.getElementById(ids[i]).style.transform = "rotate(" + angle + "deg)"
    }
}

function handleMessage(obj) {
    setTimeout(function() {
        var node = document.createElement("div")
        var messageBackground = document.getElementById("messageBackground");
        
        if (obj.self) {
            node.className = "self"
            node.innerHTML = "<div><div>You</div><div>" + obj.msg + "</div></div>"
        }
        else {
            node.innerHTML = "<div><div>Squadbot</div><div>" + obj.msg + "</div></div>"
        }
        
        messageBackground.appendChild(node);
        messageBackground.scrollTop = messageBackground.scrollHeight;
        
        if (obj.self) {
            node.style.height = "60px"
        }
        else {
            node.style.height = "100px"
        }
        
        
        setTimeout(function() {
            if (obj.self) {
                node.children[0].style.right = "25px"
            }
            else {
                node.children[0].style.left = "25px"
            }
        }, 200);
    }, obj.time * 1000);
}

window.addEventListener("load", function() {
    function recalculateCursor(event) {
        var w = window, b = document.body;
        cursorLocation.x =  event.clientX + (w.scrollX || b.scrollLeft || b.parentNode.scrollLeft || 0);
        cursorLocation.y = event.clientY + (w.scrollY || b.scrollTop || b.parentNode.scrollTop || 0);
    }
    
    // canvas = document.getElementById("titleCanvas")
    // canvas.width = canvasWidth
    // canvas = canvas.getContext("2d")
    
    // setInterval(function() {
    //     drawCanvas()
    // }, 1000);
    
    setInterval(function() {
        turnEyes()
    }, 50);
    
    document.addEventListener("mousemove", recalculateCursor)
    document.addEventListener("scroll", recalculateCursor)
    window.addEventListener("resize", recalculateCursor)
    
    for (var i = 0; i < messages.length; i++) {
        handleMessage(messages[i])
    }
    
    setInterval(function () {
        var ids = ["botLeftArm", "botRightArm", "botLeftHand", "botRightHand"]
        
        for (var i = 0; i < 2; i++) {
            var deg = Math.floor(Math.random() * (40 - -65 + 1)) + -65
            
            if (i == 1) {
                deg *= -1
            }
            
            document.getElementById(ids[i]).style.transform = "rotate(" + deg + "deg)"
        }
        
        for (var i = 2; i < 5; i++) {
            var deg = Math.floor(Math.random() * (50 - -45 + 1)) + -45
            
            if (i == 1) {
                deg *= -1
            }
            
            document.getElementById(ids[i]).style.transform = "rotate(" + deg + "deg)"
        }
    }, 2100);
})

window.addEventListener("resize", function() {
    // document.getElementById("titleCanvas").width = window.innerWidth
    // canvasWidth = window.innerWidth
    // 
    // drawCanvas()
})
