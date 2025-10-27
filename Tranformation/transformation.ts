namespace transformation {

    document.addEventListener("DOMContentLoaded", hndlLoad)

    function hndlLoad(_event: Event): void {
        draw()
    }

    function transform(_crc2: CanvasRenderingContext2D, _color: string): void {

        _crc2.strokeStyle = _color;

        _crc2.beginPath();
        _crc2.lineWidth = 5;
        _crc2.moveTo(0, 0)
        _crc2.lineTo(200, 0);
        _crc2.moveTo(170, 25)
        _crc2.lineTo(200, 0)
        _crc2.stroke();

        _crc2.beginPath();
        _crc2.moveTo(0, 0)
        _crc2.lineTo(0, 200);
        _crc2.moveTo(25, 170)
        _crc2.lineTo(0, 200)
        _crc2.stroke();

        for (let i: number = 0; i < 16; i++) {
            _crc2.beginPath()
            _crc2.lineWidth = 1
            _crc2.moveTo(10 + i + i * 10, 0)
            _crc2.lineTo(10 + i + i * 10, 10)
            _crc2.stroke()
        }
        for (let i: number = 0; i < 16; i++) {
            _crc2.beginPath()
            _crc2.strokeStyle = _color;
            _crc2.lineWidth = 1
            _crc2.moveTo(0, i + i * 10)
            _crc2.lineTo(10, i + i * 10)
            _crc2.stroke()
        }

    }
    function draw(): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
        const crc2: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        crc2.fillStyle = "#07fffbff";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.save();
        crc2.translate(0, 0);
        transform(crc2, "black")
        crc2.restore();

        crc2.save();
        crc2.translate(200, 200);
        transform(crc2, "green")
        crc2.restore();

        crc2.save();
        crc2.rotate(Math.PI)
        crc2.translate(-450, -450);
        transform(crc2, "red")
        crc2.restore();



    }
}