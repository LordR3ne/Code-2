"use strict";
var Solar;
(function (Solar) {
    class Entity {
        position;
        constructor() {
            this.position = new Solar.Vector(0, 0);
        }
        move(_timeSlice) {
        }
        draw() {
        }
        isClicked(_mouseClicked) {
            return true;
        }
    }
    Solar.Entity = Entity;
})(Solar || (Solar = {}));
