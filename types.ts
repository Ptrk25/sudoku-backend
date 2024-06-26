export interface GameField {
    invalid: boolean;
    predefined: boolean;
    highlight: boolean;
    number: string;
    block: number;
}

export interface APISudoku {
    newboard: Newboard;
}

export interface Newboard {
    grids:   Grid[];
    results: number;
    message: string;
}

export interface Grid {
    value:      Array<number[]>;
    solution:   Array<number[]>;
    difficulty: string;
}
