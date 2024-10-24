const isMoveValid = (piece, startRow, startCol, endRow, endCol, board) => {
    console.log(piece+" "+startRow+" "+startCol+" "+endRow+" "+endCol)
    switch (piece) {
        case 'p_w':  // White Pawn
            return isValidPawnMove(startRow, startCol, endRow, endCol, board, 'white');
        case 'p_b':  // Black Pawn
            return isValidPawnMove(startRow, startCol, endRow, endCol, board, 'black');
        case 'r_w':
        case 'r_b':
            return isValidRookMove(startRow, startCol, endRow, endCol, board);
        case 'kn_w':
        case 'kn_b':
            return isValidKnightMove(startRow, startCol, endRow, endCol);
        case 'b_w':
        case 'b_b':
            return isValidBishopMove(startRow, startCol, endRow, endCol, board);
        case 'q_w':
        case 'q_b':
            return isValidQueenMove(startRow, startCol, endRow, endCol, board);
        case 'ki_w':
        case 'ki_b':
            return isValidKingMove(startRow, startCol, endRow, endCol, board);
        default:
            return false;
    }
};

const isValidPawnMove = (startRow, startCol, endRow, endCol, board, color) => {
    const direction = (color === 'white') ? 1 : -1;
    const startRowForPawn = (color === 'white') ? 1 : 6;

    // Moving one square forward
    if (startCol === endCol && board[endRow][endCol] === null) {
        if (endRow === startRow + direction) return true;

        // First move, pawn can move two squares
        if (startRow === startRowForPawn && endRow === startRow + 2 * direction && board[endRow][endCol] === null) {
            return true;
        }
    }

    // Capture move (diagonally)
    if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction && board[endRow][endCol] !== null) {
        return true;
    }

    return false;
};

const isValidRookMove = (startRow, startCol, endRow, endCol, board) => {
    // Rook moves in a straight line either horizontally or vertically
    if (startRow !== endRow && startCol !== endCol) return false;

    // Check if path is clear (no pieces between start and end position)
    return isPathClear(startRow, startCol, endRow, endCol, board);
};

const isValidKnightMove = (startRow, startCol, endRow, endCol) => {
    // Knight moves in "L" shape
    const rowDiff = Math.abs(startRow - endRow);
    const colDiff = Math.abs(startCol - endCol);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
};

const isValidBishopMove = (startRow, startCol, endRow, endCol, board) => {
    // Bishop moves diagonally
    if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) return false;

    // Check if path is clear
    return isPathClear(startRow, startCol, endRow, endCol, board);
};

const isValidQueenMove = (startRow, startCol, endRow, endCol, board) => {
    // Queen moves like both a rook and a bishop
    return isValidRookMove(startRow, startCol, endRow, endCol, board) || isValidBishopMove(startRow, startCol, endRow, endCol, board);
};

const isValidKingMove = (startRow, startCol, endRow, endCol, board) => {
    // King moves one square in any direction
    return Math.abs(startRow - endRow) <= 1 && Math.abs(startCol - endCol) <= 1;
};

// Utility function to check if the path is clear (used for rook, bishop, queen)
const isPathClear = (startRow, startCol, endRow, endCol, board) => {
    const rowDirection = endRow > startRow ? 1 : (endRow < startRow ? -1 : 0);
    const colDirection = endCol > startCol ? 1 : (endCol < startCol ? -1 : 0);

    let currentRow = startRow + rowDirection;
    let currentCol = startCol + colDirection;

    while (currentRow !== endRow || currentCol !== endCol) {
        if (board[currentRow][currentCol] !== null) {
            return false;
        }
        currentRow += rowDirection;
        currentCol += colDirection;
    }
    return true;
};

export {isMoveValid};


//alternative

// const isMoveValid = (piece, startRow, startCol, endRow, endCol, board) => {
//     console.log(piece + " " + startRow + " " + startCol + " " + endRow + " " + endCol);
//     switch (piece) {
//         case 'p_w':
//             return isValidPawnMove(startRow, startCol, endRow, endCol, board, 'white');
//         case 'p_b':
//             return isValidPawnMove(startRow, startCol, endRow, endCol, board, 'black');
//         case 'r_w':
//         case 'r_b':
//             return isValidRookMove(startRow, startCol, endRow, endCol, board);
//         case 'kn_w':
//         case 'kn_b':
//             return isValidKnightMove(startRow, startCol, endRow, endCol);
//         case 'b_w':
//         case 'b_b':
//             return isValidBishopMove(startRow, startCol, endRow, endCol, board);
//         case 'q_w':
//         case 'q_b':
//             return isValidQueenMove(startRow, startCol, endRow, endCol, board);
//         case 'ki_w':
//         case 'ki_b':
//             return isValidKingMove(startRow, startCol, endRow, endCol, board);
//         default:
//             return false;
//     }
// };

// const isInCheck = (board, color) => {
//     // Find the king's position
//     let kingRow, kingCol;
//     const king = color === 'white' ? 'ki_w' : 'ki_b';

//     for (let row = 0; row < board.length; row++) {
//         for (let col = 0; col < board[row].length; col++) {
//             if (board[row][col] === king) {
//                 kingRow = row;
//                 kingCol = col;
//                 break;
//             }
//         }
//     }

//     // Check if any opposing piece can attack the king
//     for (let row = 0; row < board.length; row++) {
//         for (let col = 0; col < board[row].length; col++) {
//             const piece = board[row][col];
//             if (piece && ((color === 'white' && piece.endsWith('_b')) || (color === 'black' && piece.endsWith('_w')))) {
//                 if (isMoveValid(piece, row, col, kingRow, kingCol, board)) {
//                     return true;
//                 }
//             }
//         }
//     }
//     return false;
// };

// const isCheckmate = (board, color) => {
//     // Check if the king is in check
//     if (!isInCheck(board, color)) return false;

//     // If king is in check, check if it has any valid moves
//     for (let startRow = 0; startRow < board.length; startRow++) {
//         for (let startCol = 0; startCol < board[startRow].length; startCol++) {
//             const piece = board[startRow][startCol];
//             if (piece && ((color === 'white' && piece.endsWith('_w')) || (color === 'black' && piece.endsWith('_b')))) {
//                 for (let endRow = 0; endRow < board.length; endRow++) {
//                     for (let endCol = 0; endCol < board[endRow].length; endCol++) {
//                         if (isMoveValid(piece, startRow, startCol, endRow, endCol, board)) {
//                             const tempBoard = [...board.map(row => [...row])];
//                             tempBoard[endRow][endCol] = tempBoard[startRow][startCol];
//                             tempBoard[startRow][startCol] = null;
//                             if (!isInCheck(tempBoard, color)) {
//                                 return false;  // The king can move to avoid checkmate
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     return true;  // No valid moves to avoid checkmate
// };

// // Helper functions for specific piece movement validation
// const isValidPawnMove = (startRow, startCol, endRow, endCol, board, color) => {
//     const direction = color === 'white' ? -1 : 1;
//     const startRank = color === 'white' ? 6 : 1;

//     // Normal move
//     if (startCol === endCol && board[endRow][endCol] === null) {
//         if (endRow === startRow + direction || (startRow === startRank && endRow === startRow + 2 * direction)) {
//             return true;
//         }
//     }

//     // Capture
//     if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction && board[endRow][endCol] !== null) {
//         return true;
//     }

//     return false;
// };

// const isValidRookMove = (startRow, startCol, endRow, endCol, board) => {
//     if (startRow !== endRow && startCol !== endCol) return false;
//     const [dx, dy] = [Math.sign(endRow - startRow), Math.sign(endCol - startCol)];
//     let r = startRow + dx, c = startCol + dy;

//     while (r !== endRow || c !== endCol) {
//         if (board[r][c]) return false;
//         r += dx;
//         c += dy;
//     }
//     return true;
// };

// const isValidKnightMove = (startRow, startCol, endRow, endCol) => {
//     const rowDiff = Math.abs(endRow - startRow);
//     const colDiff = Math.abs(endCol - startCol);
//     return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
// };

// const isValidBishopMove = (startRow, startCol, endRow, endCol, board) => {
//     if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) return false;
//     const [dx, dy] = [Math.sign(endRow - startRow), Math.sign(endCol - startCol)];
//     let r = startRow + dx, c = startCol + dy;

//     while (r !== endRow || c !== endCol) {
//         if (board[r][c]) return false;
//         r += dx;
//         c += dy;
//     }
//     return true;
// };

// const isValidQueenMove = (startRow, startCol, endRow, endCol, board) => {
//     return isValidRookMove(startRow, startCol, endRow, endCol, board) || isValidBishopMove(startRow, startCol, endRow, endCol, board);
// };

// const isValidKingMove = (startRow, startCol, endRow, endCol, board) => {
//     return Math.abs(endRow - startRow) <= 1 && Math.abs(endCol - startCol) <= 1;
// };

// export { isMoveValid, isInCheck, isCheckmate };
