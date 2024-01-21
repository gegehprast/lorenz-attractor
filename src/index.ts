import p5 from 'p5'

let x = 2
let y = 1
let z = 1

const sigma = 10
const rho = 28
const beta = 8.0 / 3.0
const dt = 0.01

const points: p5.Vector[] = []

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(600, 600, p.WEBGL)
        p.colorMode(p.HSB)
    }

    p.draw = () => {
        p.background(0)
        
        let dx = sigma * (y - x)
        let dy = x * (rho - z) - y
        let dz = x * y - beta * z

        x += dx * dt
        y += dy * dt
        z += dz * dt

        points.push(p.createVector(x, y, z))

        p.push()
        p.translate(0, 0, -80)
        p.rotateY(p.frameCount * 0.01)
        p.scale(5)
        p.noFill()

        let hue = 0

        p.beginShape()
        points.forEach((v) => {
            p.stroke(hue, 255, 255)
            p.vertex(v.x, v.y, v.z)

            hue += 0.5
            if (hue > 255) hue = 0
        })
        p.endShape()
        p.pop()
    }
}

new p5(sketch)
