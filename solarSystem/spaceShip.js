"use strict";
var Solar;
(function (Solar) {
    class SpaceShip extends Solar.Entity {
        resource = "";
        destination = new Solar.Vector(0, 0);
        velocity = new Solar.Vector(0, 0);
        setDestination(_destination) {
            this.destination = _destination;
        }
        move(_timesplice) {
            console.log("Move SpaceShip");
            const offset = this.velocity.copy();
            offset.scale(_timesplice);
            this.position.add(offset);
        }
        draw() {
            const canvas = document.querySelector("canvas");
            const crc2 = canvas.getContext("2d");
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.beginPath();
            crc2.moveTo(0, -15);
            crc2.lineTo(-10, 10);
            crc2.lineTo(10, 10);
            crc2.closePath();
            crc2.fillStyle = "#FFFFFF";
            crc2.fill();
            crc2.strokeStyle = "#333333";
            crc2.stroke();
            crc2.beginPath();
            crc2.moveTo(-7, 10);
            crc2.lineTo(7, 10);
            crc2.lineTo(0, 20);
            crc2.closePath();
            crc2.fillStyle = "orange";
            crc2.fill();
            crc2.beginPath();
            crc2.moveTo(-4, 10);
            crc2.lineTo(4, 10);
            crc2.lineTo(0, 15);
            crc2.closePath();
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.restore();
        }
    }
    Solar.SpaceShip = SpaceShip;
    new SpaceShip();
})(Solar || (Solar = {}));
