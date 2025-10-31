namespace OldMcDonald {
    window.addEventListener("load", handleLoad);

    const animals: Animal[] = [];
    const stockpile: Food[] = [];

    let i: number = 0;
    let j: number = 1;

    function handleLoad(_event: Event): void {
        animals.push(new Dog("Doggy", "Dog", "Meat", 2, "woof"));
        animals.push(new Cat("Pipa", "Cat", "Fish", 1, "meow"));
        animals.push(new Cow("Cowy", "Cow", "Grass", 7, "MUUUUUUUUUUHH"));
        animals.push(new Horse("Esel", "Horse", "Apples", 5, "Makes horse sounds"));
        animals.push(new Pig("Schweini", "Pig", "Trash", 3, "oink"));

        stockpile.push(new Food("Meat", 24));
        stockpile.push(new Food("Fish", 10));
        stockpile.push(new Food("Grass", 38));
        stockpile.push(new Food("Apples", 89));
        stockpile.push(new Food("Trash", 19));


        document.querySelector('#clock')!.innerHTML = "Day " + j;
        animals[i].eat(stockpile);
        animals[i].sing();

        for (let i: number = 0; i < stockpile.length; i++) {
            document.querySelector(`#f${i}`)!.innerHTML = stockpile[i].consumption();
        }
    }

    const nextButton: HTMLButtonElement = document.querySelector("#nextButton")!;
    nextButton.addEventListener("click", handleNextButton);

    function handleNextButton(): void {
        i++;
        if (i >= animals.length) {
            i = 0;
            j++;
        }
        animals[i].eat(stockpile);
        animals[i].sing();

        const animal: Animal = animals[i];

        animal.doSpecialAction();
        document.querySelector('#clock')!.innerHTML = "Day " + j;
    }
}