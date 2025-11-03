"use strict";
var Asteroid;
(function (Asteroid_1) {
    class Asteroid extends Asteroid_1.Movable {
        type;
        size;
        constructor(_size, _position) {
            super(_position);
            if (_position) {
                this.position = _position;
            }
            else {
                this.position = new Asteroid_1.Vector(0, 0);
            }
            console.log("Asteroid Constructor");
            this.velocity = new Asteroid_1.Vector(0, 0);
            this.velocity.random(100, 200);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
        }
        draw() {
            // console.log("Asteroid draw");
            Asteroid_1.crc2.lineWidth = Asteroid_1.lineWidth / (this.size);
            Asteroid_1.crc2.save();
            Asteroid_1.crc2.translate(this.position.x, this.position.y);
            Asteroid_1.crc2.scale(this.size, this.size);
            Asteroid_1.crc2.translate(-50, -50);
            Asteroid_1.crc2.stroke(Asteroid_1.asteroidPaths[this.type]);
            Asteroid_1.crc2.restore();
        }
        isHit(_hotspot) {
            const hitSize = 50 * this.size;
            const difference = new Asteroid_1.Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitSize && Math.abs(difference.y) < hitSize);
        }
    }
    Asteroid_1.Asteroid = Asteroid;
})(Asteroid || (Asteroid = {}));
