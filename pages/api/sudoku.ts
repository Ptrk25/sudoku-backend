// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { APISudoku, GameField } from '../../types'

type Data = {
  sudoku: GameField[][]
}

function getBlockNumber (row:number, column:number):number {
    // Column (mod, -, /3)
    // 0 1 2 3 4 5 6 7 8
    // 0 1 2 0 1 2 0 1 2
    // 0 0 0 3 3 3 6 6 6
    // 0 0 0 1 1 1 2 2 2

    // Row ()
    // 0 1 2 3 4 5 6 7 8
    // 0 1 2 0 1 2 0 1 2

    let newCol = (column - (column % 3)) / 3;
    let newRow = row - (row % 3);
    let block = newCol + newRow;

    return block;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    const res1 = await fetch("https://sudoku-api.vercel.app/api/dosuku")
    const response: APISudoku = await res1.json();

    let newSudoku: GameField[][] = Array.from(Array(9), _ => Array(9).fill({
        invalid: false,
        predefined: false,
        number: "",
        block: 0,
    }));

    response.newboard.grids[0].value.forEach((row, rowIdx) => {
        row.forEach((cell, cellIdx) => {
            newSudoku[rowIdx][cellIdx] = {
                    invalid: false,
                    predefined: cell > 0 ? true : false,
                    highlight: false,
                    number: cell > 0 ? cell.toString() : "",
                    block: getBlockNumber(rowIdx, cellIdx),
                }
        })
    });

    res.status(200).json({sudoku: newSudoku })
}
