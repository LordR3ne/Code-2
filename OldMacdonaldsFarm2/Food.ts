namespace OldMcDonald {

    export class Food {
        public type: string;
        public amount: number;

        public constructor(_type: string, _amount: number) {
            this.type = _type;
            this.amount = _amount;
        }

        public consumption(): string {
            return `${this.type}: ${this.amount}`;
        }
    }
}