namespace OldMcDonald {

    export class Animal {
        public name: string;
        public species: string;
        public food: string;
        public appetite: number;
        public sound: string;

        public constructor(_name: string, _type: string, _food: string, _appetite: number, _sound: string) {
            this.name = _name;
            this.species = _type;
            this.food = _food;
            this.appetite = _appetite;
            this.sound = _sound;
        }
        public sing(): void {
            const animalNameDisplay: HTMLDivElement = document.querySelector("#name")!;
            animalNameDisplay.textContent = this.name; 

            const songLyricsContainer: HTMLDivElement = document.querySelector("#lyrics")!;
            const sound: string = this.sound;

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

        public eat(_stockpile: Food[]): void {
            for (let i: number = 0; i < _stockpile.length; i++) {
                if (_stockpile[i].type === this.food && _stockpile[i].amount >= this.appetite) {
                    _stockpile[i].amount -= this.appetite;
                    const foodtext: HTMLDivElement = document.querySelector(`#food`)!;
                    foodtext.innerHTML = `${this.name} the ${this.species} ate ${this.appetite} ${this.food}.`;
                    document.querySelector(`#f${i}`)!.innerHTML = _stockpile[i].consumption();

                } else if (_stockpile[i].type === this.food && _stockpile[i].amount < this.appetite) {
                    const foodtext: HTMLDivElement = document.querySelector(`#food`)!;
                    foodtext.innerHTML = `Not enough ${this.food} left for ${this.name} to eat!`;
                    document.querySelector(`#f${i}`)!.innerHTML = `${_stockpile[i].type}: 0`;
                }
            }
        }
        public doSpecialAction(): void {
        }
    }
}