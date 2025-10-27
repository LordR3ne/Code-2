"use strict";
var transformation;
(function (transformation) {
    document.addEventListener("DOMContentLoaded", hndlLoad);
    function hndlLoad(_event) {
        draw();
    }
    function transform(_crc2, _color) {
        _crc2.strokeStyle = _color;
        _crc2.beginPath();
        _crc2.lineWidth = 5;
        _crc2.moveTo(0, 0);
        _crc2.lineTo(200, 0);
        _crc2.moveTo(170, 25);
        _crc2.lineTo(200, 0);
        _crc2.stroke();
        _crc2.beginPath();
        _crc2.moveTo(0, 0);
        _crc2.lineTo(0, 200);
        _crc2.moveTo(25, 170);
        _crc2.lineTo(0, 200);
        _crc2.stroke();
        for (let i = 0; i < 16; i++) {
            _crc2.beginPath();
            _crc2.lineWidth = 1;
            _crc2.moveTo(10 + i + i * 10, 0);
            _crc2.lineTo(10 + i + i * 10, 10);
            _crc2.stroke();
        }
        for (let i = 0; i < 16; i++) {
            _crc2.beginPath();
            _crc2.strokeStyle = _color;
            _crc2.lineWidth = 1;
            _crc2.moveTo(0, i + i * 10);
            _crc2.lineTo(10, i + i * 10);
            _crc2.stroke();
        }
    }
    function draw() {
        const canvas = document.querySelector("canvas");
        const crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        crc2.fillStyle = "#07fffbff";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        crc2.save();
        crc2.translate(0, 0);
        transform(crc2, "black");
        console.log("Original Coordinate System in Black", crc2.getTransform)
        crc2.restore();

        crc2.save();
        crc2.translate(200, 200);
        transform(crc2, "green");
        console.log("Transaltet Version in Green", crc2.getTransform)
        crc2.restore();

        crc2.save();
        crc2.rotate(Math.PI);
        crc2.translate(-450, -450);
        transform(crc2, "red");
        console.log("Rotated and translated in red", crc2.getTransform)
        crc2.restore();
    }
})(transformation || (transformation = {}));
