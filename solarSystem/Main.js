"use strict";
var Solar;
(function (Solar) {
    window.addEventListener("load", handleLoad);
    let selectedSpaceship = null;
    let selectedBody = null;
    let uiPlanet;
    let uiSpaceship;
    let showBodyUi;
    let showSpaceshipUi;
    let sun = new Solar.Body(40, "yellow", 0, 0, 0);
    let earth = sun.createChild(10, "blue", 0, 0, 100);
    function handleLoad(_event) {
        console.log("Asteroids starting");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Solar.crc2 = canvas.getContext("2d");
        Solar.crc2.canvas.width = window.innerWidth;
        Solar.crc2.canvas.height = window.innerHeight;
        Solar.crc2.fillStyle = "black";
        Solar.crc2.strokeStyle = "white";
        Solar.crc2.fillRect(0, 0, Solar.crc2.canvas.width, Solar.crc2.canvas.height);
        // draw();
        // createPlanets();
        // createSpaceShip();
        canvas.addEventListener("mousedown", handleMouse);
        window.setInterval(update, 60);
    }
    function update() {
        // crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        Solar.crc2.save();
        Solar.crc2.translate(Solar.crc2.canvas.width / 2, Solar.crc2.canvas.height / 2);
        sun.draw();
        const earthReference = sun.getChild(earth);
        if (earthReference != null) {
            earthReference.draw();
        }
        Solar.crc2.restore();
        Solar.crc2.restore();
        console.log("Moveable length: ", Solar.Entity.length);
    }
})(Solar || (Solar = {}));
function handleMouse(_event) {
    console.log("handleMouse");
    let showSpaceshipUi = false;
    let showBodyUi = false;
    // if (selectedSpaceship != null) {
    //     if (selectedPlanet != null) {
    //         selectedSpaceship.destination = selectedPlanet.position;
    //     }
    //     showSpaceshipUi = true;
    //     showBodyUi = false;
    // } else if (selectedPlanet != null) {
    //     showSpaceshipUi = false;
    //     showBodyUi = true;
    // } else {
    //     showSpaceshipUi = false;
    //     showBodyUi = false;
    // }
}
