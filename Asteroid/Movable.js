"use strict";
var Asteroid;
(function (Asteroid) {
    class Movable {
        position;
        velocity;
        expendable = false;
        constructor(_position) {
            if (_position) {
                this.position = _position;
            }
            else {
                this.position = new Asteroid.Vector(0, 0);
            }
            console.log("Asteroid Constructor");
            this.velocity = new Asteroid.Vector(0, 0);
        }
        move(_timesplice) {
            // console.log("Move Asteroid");
            const offset = this.velocity.copy();
            offset.scale(_timesplice);
            this.position.add(offset);
            if (this.position.x < 0) {
                this.position.x += Asteroid.crc2.canvas.width;
            }
            if (this.position.y < 0) {
                this.position.y += Asteroid.crc2.canvas.height;
            }
            if (this.position.x > Asteroid.crc2.canvas.width) {
                this.position.x -= Asteroid.crc2.canvas.width;
            }
            if (this.position.x > Asteroid.crc2.canvas.height) {
                this.position.y -= Asteroid.crc2.canvas.height;
            }
        }
        draw() {
        }
    }
    Asteroid.Movable = Movable;
})(Asteroid || (Asteroid = {}));
