"use strict";
var Canvas;
(function (Canvas) {
    document.addEventListener("DOMContentLoaded", hndlLoad);
    window.addEventListener("resize", hndlResize);
    let fanRadius = 400;
    let fanCount = 16;
    function hndlLoad(_event) {
        const inputFans = prompt("How many triangles?", fanCount.toString());
        fanCount = parseInt(inputFans || "16");
        const inputRadius = prompt("What should the radius be?", fanRadius.toString());
        fanRadius = parseInt(inputRadius || "400");
        if (isNaN(fanCount) || fanCount < 1)
            fanCount = 16;
        if (isNaN(fanRadius) || fanRadius < 10)
            fanRadius = 400;
        draw();
    }
    function hndlResize(_event) {
        draw();
    }
    function draw() {
        const canvas = document.querySelector("canvas");
        const crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        crc2.fillStyle = "#07fffbff";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        const center = { x: canvas.width / 2, y: canvas.height / 2 };
        drawTriangleFan(crc2, fanRadius, fanCount, center);
    }
    function drawTriangle(_crc2, _p1, _p2, _p3, _color) {
        _crc2.beginPath();
        _crc2.fillStyle = Math.random() < 0.5 ? "red" : "blue";
        _crc2.moveTo(_p1.x, _p1.y);
        _crc2.lineTo(_p2.x, _p2.y);
        _crc2.lineTo(_p3.x, _p3.y);
        _crc2.lineTo(_p1.x, _p1.y);
        _crc2.closePath();
        _crc2.fill();
    }
    function drawTriangleFan(_crc2, _radius, _nrOfFans, _center) {
        const radiusSlice = (2 * Math.PI) / _nrOfFans;
        for (let i = 0; i < _nrOfFans; i++) {
            const startP2 = { x: 0, y: -_radius };
            const rotatedP2 = rotatePoint(startP2, radiusSlice * i);
            const startP3 = { x: 0, y: -_radius };
            const rotatedP3 = rotatePoint(startP3, radiusSlice + radiusSlice * i);
            const p2 = moveVec2(rotatedP2, _center);
            const p3 = moveVec2(rotatedP3, _center);
            drawTriangle(_crc2, _center, p2, p3, "dummy");
        }
    }
    function rotatePoint(_p1, _rotation) {
        const tmpVec2 = { x: 0, y: 0 };
        tmpVec2.x = (Math.cos(_rotation) * _p1.x) - (Math.sin(_rotation) * _p1.y);
        tmpVec2.y = (Math.sin(_rotation) * _p1.x) + (Math.cos(_rotation) * _p1.y);
        return tmpVec2;
    }
    function moveVec2(_v1, _p1) {
        const tmpVec = { x: 0, y: 0 };
        tmpVec.x = _v1.x + _p1.x;
        tmpVec.y = _v1.y + _p1.y;
        return tmpVec;
    }
})(Canvas || (Canvas = {}));
