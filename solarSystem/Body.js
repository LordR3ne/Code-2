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
        constructor() {
        }
    }
    Solar.Body = Body;
})(Solar || (Solar = {}));
