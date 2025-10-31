"use strict";
var Farmingsimulator2055;
(function (Farmingsimulator2055) {
    document.addEventListener("DOMContentLoaded", hndlLoad);
    function hndlLoad(_event) {
        farm();
    }
    function farm() {
        const canvas = document.querySelector("canvas");
        const crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        crc2.fillStyle = "#07fffbff";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
})(Farmingsimulator2055 || (Farmingsimulator2055 = {}));
