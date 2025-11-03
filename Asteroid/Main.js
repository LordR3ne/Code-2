"use strict";
var Asteroid;
(function (Asteroid) {
    Asteroid.lineWidth = 2;
    document.addEventListener("DOMContentLoaded", hndlLoad);
    const movables = [];
    function hndlLoad() {
        const canvas = document.querySelector("canvas");
        if (!canvas) {
            return;
        }
        canvas.width = 600;
        canvas.height = 600;
        Asteroid.crc2 = canvas.getContext("2d");
        Asteroid.crc2.fillStyle = "black";
        Asteroid.crc2.strokeStyle = "white";
        Asteroid.crc2.fillRect(0, 0, canvas.width, canvas.height);
        Asteroid.crc2.lineWidth = Asteroid.lineWidth;
        canvas.addEventListener("mousedown", shootProjectile);
        canvas.addEventListener("mouseup", shootLaser);
        // canvas.addEventListener("keypress", handleKeypress);
        // canvas.addEventListener("mousemove", setHeading);
        Asteroid.createPaths();
        createAsteroids(5);
        const asteroid = new Asteroid.Asteroid(1);
        asteroid.draw();
        asteroid.move(0.1);
        window.setInterval(update, 20);
    }
    function shootProjectile(_event) {
        const hotspot = new Asteroid.Vector(_event.clientX - Asteroid.crc2.canvas.offsetLeft, _event.clientY - Asteroid.crc2.canvas.offsetTop);
        const velocity = new Asteroid.Vector(0, 0);
        velocity.random(100, 100);
        const projectile = new Asteroid.Projectile(hotspot, velocity);
        movables.push(projectile);
    }
    function shootLaser(_event) {
        const hotspot = new Asteroid.Vector(_event.clientX - Asteroid.crc2.canvas.offsetLeft, _event.clientY - Asteroid.crc2.canvas.offsetTop);
        const asteroidHit = getAsteroidHit(hotspot);
        if (asteroidHit) {
            breakAsteroid(asteroidHit);
        }
    }
    function breakAsteroid(_asteroid) {
        if (_asteroid.size > 0.3) {
            for (let i = 0; i < 2; i++) {
                const fragment = new Asteroid.Asteroid(_asteroid.size / 2, _asteroid.position.copy());
                fragment.velocity.add(_asteroid.velocity);
                movables.push(fragment);
            }
        }
        _asteroid.expendable = true;
    }
    function getAsteroidHit(_hotspot) {
        for (const movable of movables) {
            if (movable instanceof Asteroid.Asteroid && movable.isHit(_hotspot)) {
                return movable;
            }
        }
        return null;
    }
    function createAsteroids(_nAsteroids) {
        for (let i = 0; i < _nAsteroids; i++) {
            const asteroid = new Asteroid.Asteroid(1);
            movables.push(asteroid);
        }
    }
    function update() {
        Asteroid.crc2.fillRect(0, 0, Asteroid.crc2.canvas.width, Asteroid.crc2.canvas.height);
        for (const movable of movables) {
            movable.move(1 / 50);
            movable.draw();
        }
        deleteExpandable();
    }
    function deleteExpandable() {
        for (let i = movables.length - 1; i >= 0; i--) {
            if (movables[i].expendable == true) {
                movables.splice(i, 1);
            }
        }
    }
})(Asteroid || (Asteroid = {}));
