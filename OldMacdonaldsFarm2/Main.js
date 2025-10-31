"use strict";
var OldMcDonald;
(function (OldMcDonald) {
    window.addEventListener("load", handleLoad);
    const animals = [];
    const stockpile = [];
    let i = 0;
    let j = 1;
    function handleLoad(_event) {
        animals.push(new OldMcDonald.Dog("Doggy", "Dog", "Meat", 2, "woof"));
        animals.push(new OldMcDonald.Cat("Pipa", "Cat", "Fish", 1, "meow"));
        animals.push(new OldMcDonald.Cow("Cowy", "Cow", "Grass", 7, "MUUUUUUUUUUHH"));
        animals.push(new OldMcDonald.Horse("Esel", "Horse", "Apples", 5, "Makes horse sounds"));
        animals.push(new OldMcDonald.Pig("Schweini", "Pig", "Trash", 3, "oink"));
        stockpile.push(new OldMcDonald.Food("Meat", 24));
        stockpile.push(new OldMcDonald.Food("Fish", 10));
        stockpile.push(new OldMcDonald.Food("Grass", 38));
        stockpile.push(new OldMcDonald.Food("Apples", 89));
        stockpile.push(new OldMcDonald.Food("Trash", 19));
        document.querySelector('#clock').innerHTML = "Day " + j;
        animals[i].eat(stockpile);
        animals[i].sing();
        for (let i = 0; i < stockpile.length; i++) {
            document.querySelector(`#f${i}`).innerHTML = stockpile[i].consumption();
        }
    }
    const nextButton = document.querySelector("#nextButton");
    nextButton.addEventListener("click", handleNextButton);
    function handleNextButton() {
        i++;
        if (i >= animals.length) {
            i = 0;
            j++;
        }
        animals[i].eat(stockpile);
        animals[i].sing();
        const animal = animals[i];
        animal.doSpecialAction();
        document.querySelector('#clock').innerHTML = "Day " + j;
    }
})(OldMcDonald || (OldMcDonald = {}));
