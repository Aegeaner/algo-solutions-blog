// A simple seedable linear congruential generator (LCG)
export class Random {
    private seed: number;

    constructor(seedString: string) {
        this.seed = this.cyrb128(seedString);
    }

    // Hash function to turn string into a number seed
    private cyrb128(str: string): number {
        let h1 = 1779033703, h2 = 3144134277,
            h3 = 1013904242, h4 = 2773480762;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        return (h1 ^ h2 ^ h3 ^ h4) >>> 0;
    }

    // Returns a float between 0 and 1
    next(): number {
        this.seed = (1664525 * this.seed + 1013904223) % 4294967296;
        return this.seed / 4294967296;
    }

    // Returns a float between min and max
    range(min: number, max: number): number {
        return min + (this.next() * (max - min));
    }

    // Returns an integer between min and max (inclusive min, exclusive max)
    int(min: number, max: number): number {
        return Math.floor(this.range(min, max));
    }

    // Pick a random element from an array
    pick<T>(arr: T[]): T {
        return arr[this.int(0, arr.length)];
    }
}
