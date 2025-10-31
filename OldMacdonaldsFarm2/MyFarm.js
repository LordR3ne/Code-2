"use strict";
var OldMcDonald;
(function (OldMcDonald) {
    class Animal {
        name;
        species;
        food;
        appetite;
        sound;
        constructor(_name, _type, _food, _appetite, _sound) {
            this.name = _name;
            this.species = _type;
            this.food = _food;
            this.appetite = _appetite;
            this.sound = _sound;
        }
        sing() {
            const animalNameDisplay = document.querySelector("#name");
            animalNameDisplay.textContent = this.name;
            const songLyricsContainer = document.querySelector("#lyrics");
            const sound = this.sound;
            songLyricsContainer.innerHTML = `
                Old MacDonald had a farm. E-I-E-I-O. <br>
                And on that farm he had a **${this.species}**. E-I-E-I-O. <br>
                With a **${sound} ${sound}** here. <br>
                And a **${sound} ${sound}** there. <br>
                Here a **${sound}**. <br>
                There a **${sound}**. <br>
                Everywhere a **${sound} ${sound}**. <br>
                Old MacDonald had a farm. E-I-E-I-O.
            `;
        }
        eat(_stockpile) {
            for (let i = 0; i < _stockpile.length; i++) {
                if (_stockpile[i].type === this.food && _stockpile[i].amount >= this.appetite) {
                    _stockpile[i].amount -= this.appetite;
                    const foodtext = document.querySelector(`#food`);
                    foodtext.innerHTML = `${this.name} the ${this.species} ate ${this.appetite} ${this.food}.`;
                    document.querySelector(`#f${i}`).innerHTML = _stockpile[i].consumption();
                }
                else if (_stockpile[i].type === this.food && _stockpile[i].amount < this.appetite) {
                    const foodtext = document.querySelector(`#food`);
                    foodtext.innerHTML = `Not enough ${this.food} left for ${this.name} to eat!`;
                    document.querySelector(`#f${i}`).innerHTML = `${_stockpile[i].type}: 0`;
                }
            }
        }
        doSpecialAction() {
        }
    }
    OldMcDonald.Animal = Animal;
})(OldMcDonald || (OldMcDonald = {}));
