"use strict";
var Solar;
(function (Solar) {
    window.addEventListener("load", handleLoad);
    let entitys = [];
    let selectedSpaceship = null;
    let selectedBody = null;
    let uiPlanet;
    let uiSpaceship;
    let showBodyUi;
    let showSpaceshipUi;
    function handleLoad(_event) {
        console.log("Asteroids starting");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Solar.crc2 = canvas.getContext("2d");
        Solar.crc2.fillStyle = "black";
        Solar.crc2.strokeStyle = "white";
        draw();
        createPlanets();
        createSpaceShip();
        canvas.addEventListener("mousedown", handleMouse);
        window.setInterval(update, 60);
    }
    function update() {
        Solar.crc2.fillRect(0, 0, Solar.crc2.canvas.width, Solar.crc2.canvas.height);
        for (let entity of entitys) {
            entity.move(1 / 50);
            entity.draw();
        }
        console.log("Moveable length: ", Solar.Entity.length);
    }
})(Solar || (Solar = {}));
function handleMouse(_event) {
    console.log("handleMouse");
    let showSpaceshipUi = false;
    let showBodyUi = false;
    if (selectedSpaceship != null) {
        if (selectedPlanet != null) {
            selectedSpaceship.destination = selectedPlanet.position;
        }
        showSpaceshipUi = true;
        showBodyUi = false;
    }
    else if (selectedPlanet != null) {
        showSpaceshipUi = false;
        showBodyUi = true;
    }
    else {
        showSpaceshipUi = false;
        showBodyUi = false;
    }
}
