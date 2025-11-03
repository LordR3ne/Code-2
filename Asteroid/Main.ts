namespace Asteroid {
    export let crc2: CanvasRenderingContext2D;
    export const lineWidth: number = 2;
    document.addEventListener("DOMContentLoaded", hndlLoad);

    const movables: Movable[] = [];

    function hndlLoad(): void {
        const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) {
            return;
        }
        canvas.width = 600;
        canvas.height = 600;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        crc2.fillStyle = "black";
        crc2.strokeStyle = "white";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        crc2.lineWidth = lineWidth;

        canvas.addEventListener("mousedown", shootProjectile);
        canvas.addEventListener("mouseup", shootLaser);
        // canvas.addEventListener("keypress", handleKeypress);
        // canvas.addEventListener("mousemove", setHeading);

        createPaths();

        createAsteroids(5);

        const asteroid: Asteroid = new Asteroid(1);
        asteroid.draw();
        asteroid.move(0.1);

        window.setInterval(update, 20);
    }

    function shootProjectile(_event: MouseEvent): void {
        const hotspot: Vector = new Vector(_event.clientX - crc2.canvas.offsetLeft, _event.clientY - crc2.canvas.offsetTop);
        const velocity: Vector = new Vector(0, 0);
        velocity.random(100, 100);
        const projectile: Projectile = new Projectile(hotspot, velocity);
        movables.push(projectile);
    }

    function shootLaser(_event: MouseEvent): void {
        const hotspot: Vector = new Vector(_event.clientX - crc2.canvas.offsetLeft, _event.clientY - crc2.canvas.offsetTop);
        const asteroidHit: Asteroid | null = getAsteroidHit(hotspot);
        if (asteroidHit) {
            breakAsteroid(asteroidHit);
        }
    }

    function breakAsteroid(_asteroid: Asteroid): void {
        if (_asteroid.size > 0.3) {
            for (let i: number = 0; i < 2; i++) {
                const fragment: Asteroid = new Asteroid(_asteroid.size / 2, _asteroid.position.copy());
                fragment.velocity.add(_asteroid.velocity);
                movables.push(fragment);
            }
        }

        _asteroid.expendable = true;
    }

    function getAsteroidHit(_hotspot: Vector): Asteroid | null {
        for (const movable of movables) {
            if (movable instanceof Asteroid && movable.isHit(_hotspot)) {
                return movable;
            }
        }
        return null;
    }

    function createAsteroids(_nAsteroids: number): void {
        for (let i: number = 0; i < _nAsteroids; i++) {
            const asteroid: Asteroid = new Asteroid(1);
            movables.push(asteroid);
        }
    }

    function update(): void {
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        for (const movable of movables) {
            movable.move(1 / 50);
            movable.draw();
        }

        deleteExpandable();
    }

    function deleteExpandable(): void {
        for (let i: number = movables.length - 1; i >= 0; i--) {
            if (movables[i].expendable == true) {
                movables.splice(i, 1);
            }
        }
    }
}