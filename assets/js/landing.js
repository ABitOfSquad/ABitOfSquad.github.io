var canvas
var canvasWidth = window.innerWidth
var cursorLocation = {"x": 0, "y": 0}

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

window.addEventListener("load", function() {
    function recalculateCursor(event) {
        var w = window, b = document.body;
        cursorLocation.x =  event.clientX + (w.scrollX || b.scrollLeft || b.parentNode.scrollLeft || 0);
        cursorLocation.y = event.clientY + (w.scrollY || b.scrollTop || b.parentNode.scrollTop || 0);
    }
    
    canvas = document.getElementById("titleCanvas")
    canvas.width = canvasWidth
    canvas = canvas.getContext("2d")
    
    setInterval(function() {
        drawCanvas()
    }, 1000);
    
    setInterval(function() {
        turnEyes()
    }, 100);
    
    document.addEventListener("mousemove", recalculateCursor)
    window.addEventListener("scroll", recalculateCursor)
    window.addEventListener("resize", recalculateCursor)
})

window.addEventListener("resize", function() {
    document.getElementById("titleCanvas").width = window.innerWidth
    canvasWidth = window.innerWidth
    
    drawCanvas()
})
