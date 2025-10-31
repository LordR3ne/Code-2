"use strict";
var Asteroids;
(function (Asteroids) {
    class Asteroid {
        position;
        velocity;
        type;
        size;
        constructor(_size, _position) {
            console.log("Asteroid Constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new Asteroids.Vector(0, 0);
            this.velocity = new Asteroids.Vector(0, 0);
            this.velocity.random(100, 200);
            this.type = Math.floor(Math.random() * 4);
            this.size = 1;
        }
        move(_timeslice) {
            // console.log("Move Asteroid");
            const offset = new Asteroids.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += Asteroids.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.x += Asteroids.crc2.canvas.height;
            if (this.position.x > Asteroids.crc2.canvas.width)
                this.position.x -= Asteroids.crc2.canvas.width;
            if (this.position.y > Asteroids.crc2.canvas.height)
                this.position.y -= Asteroids.crc2.canvas.height;
        }
        draw() {
            // console.log("Asteroid draw")
            Asteroids.crc2.save();
            Asteroids.crc2.translate(this.position.x, this.position.y);
            Asteroids.crc2.scale(this.size, this.size);
            Asteroids.crc2.translate(-50, -50);
            Asteroids.crc2.stroke(Asteroids.asteroidPaths[this.type]);
            Asteroids.crc2.restore();
        }
        isHit(_hotspot) {
            const hitsize = 50 * this.size;
            const difference = new Asteroids.Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    Asteroids.Asteroid = Asteroid;
})(Asteroids || (Asteroids = {}));
