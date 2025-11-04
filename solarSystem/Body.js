"use strict";
var Solar;
(function (Solar) {
    class Body extends Solar.Entity {
        size;
        color;
        rotation;
        orbit;
        distance;
        bodies;
        isSun = false;
        static bodyCount = 0;
        ID = 0;
        constructor(_size, _color, _rotation, _orbit, _distance) {
            super();
            this.ID = Body.bodyCount;
            Body.bodyCount++;
            this.size = _size;
            this.color = _color;
            this.rotation = _rotation;
            this.orbit = _orbit;
            this.distance = _distance;
            this.bodies = [];
        }
        createChild(_size, _color, _rotation, _orbit, _distance) {
            const body = new Body(_size, _color, _rotation, _orbit, _distance);
            this.bodies.push(body);
            return (body.ID);
        }
        getChild(_ID) {
            for (let body of this.bodies) {
                if (_ID = body.ID) {
                    console.log(body);
                    return body;
                }
            }
            return null;
        }
        draw() {
            const Sun = new Path2D();
            Solar.crc2.beginPath();
            Solar.crc2.save();
            Solar.crc2.translate(this.orbit, 0); //for sun this.orbit = 0
            Solar.crc2.arc(0, 0, this.size, 0, 2 * Math.PI);
            Solar.crc2.fillStyle = this.color;
            Solar.crc2.fill();
            Solar.crc2.restore();
            for (let i = 0; i < this.bodies.length; i++) {
                Solar.crc2.save();
                Solar.crc2.translate(this.bodies[i].distance, 0);
                this.bodies[i].draw();
                // crc2.restore()
            }
            console.log(this.size);
        }
    }
    Solar.Body = Body;
})(Solar || (Solar = {}));
