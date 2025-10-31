namespace Farmingsimulator2055 {
    document.addEventListener("DOMContentLoaded", hndlLoad)

    function hndlLoad(_event: Event): void {
        farm()
    }

    function farm(): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
        const crc2: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        crc2.fillStyle = "#07fffbff";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    
}