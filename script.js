const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
const canvas2 = document.getElementById("canvas2")
const ctx2 = canvas2.getContext("2d")
const canvas3 = document.getElementById("canvas3")
const ctx3 = canvas3.getContext("2d")
const canvas4 = document.getElementById("canvas4")
const ctx4 = canvas4.getContext("2d")
canvas.width  = canvas2.width = canvas3.width = canvas4.width = window.innerWidth
canvas.height = canvas2.height = canvas3.height = canvas4.height = window.innerHeight 

let particlesArray

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/100) * (canvas.width/100),
}

// window.addEventListener("mousemove", 
//     function(event) {
//         mouse.x = event.x
//         mouse.y = event.y
//     }
// )

// window.addEventListener("mouseout", 
//     function() {
//         mouse.x = undefined
//         mouse.y = undefined
//     }
// )

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        //ctx.fillStyle = "#AA00FF"
        ctx.fillStyle = "rgba(170, 0, 255, .3)"
        ctx.fill()

        ctx2.beginPath()
        ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        //ctx.fillStyle = "#AA00FF"
        ctx2.fillStyle = "rgba(170, 0, 255, .3)"
        ctx2.fill()

        ctx3.beginPath()
        ctx3.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        //ctx.fillStyle = "#AA00FF"
        ctx3.fillStyle = "rgba(170, 0, 255, .3)"
        ctx3.fill()
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY
        }

        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx*dx + dy*dy)

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                 this.x -= 10
            }
            if (mouse.y < this.y && this.y < canvas.height- this.size * 10) {
                this.y += 10
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10
            }
        }
        this.x += this.directionX
        this.y += this.directionY

        this.draw()
    }
}

function init() {
    particlesArray = []
    let numberOfParticles = (canvas.height * canvas.width) / 10000

    for (let i = 0; i < numberOfParticles; i++) {
        let size = 3 
        let x = (Math.random() * ((innerWidth - size * 2) - (size*2)) + size * 2)
        let y = (Math.random() * ((innerHeight - size * 2) - (size*2)) + size * 2)
        let directionX = (Math.random() /35) 
        let directionY = (Math.random() /35) 
        // let directionX =  1
        // let directionY = 1
        let color = "#8C5523"
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx2.clearRect(0, 0, innerWidth, innerHeight)
    ctx3.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
    }
}

init()
animate()