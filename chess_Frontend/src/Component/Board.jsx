// import React, { useEffect, useState } from 'react';
// import { isMoveValid } from './PieceRules/Rules';
// import './board.css';
// // Importing all piece images
// import r_w from './../assets/r_w.png';
// import kn_w from './../assets/kn_w.png';
// import b_w from './../assets/b_w.png';
// import q_w from './../assets/q_w.png';
// import ki_w from './../assets/ki_w.png';
// import p_w from './../assets/p_w.png';
// import r_b from './../assets/r_b.png';
// import kn_b from './../assets/kn_b.png';
// import b_b from './../assets/b_b.png';
// import q_b from './../assets/q_b.png';
// import ki_b from './../assets/ki_b.png';
// import p_b from './../assets/p_b.png';

// const initialBoard = [
//   ["r_w", "kn_w", "b_w", "q_w", "ki_w", "b_w", "kn_w", "r_w"],
//   ["p_w", "p_w", "p_w", "p_w", "p_w", "p_w", "p_w", "p_w"],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   ["p_b", "p_b", "p_b", "p_b", "p_b", "p_b", "p_b", "p_b"],
//   ["r_b", "kn_b", "b_b", "q_b", "ki_b", "b_b", "kn_b", "r_b"]
// ];

// // Map to associate piece names with images
// const pieceImages = {
//   r_w, kn_w, b_w, q_w, ki_w, p_w,
//   r_b, kn_b, b_b, q_b, ki_b, p_b
// };

// function Board() {
//   const [board, setBoard] = useState(initialBoard);
//   const [source, setSource] = useState({ piece: null, row: null, col: null });
//   const [isWhiteTurn, setIsWhiteTurn] = useState(true); // Track whose turn it is
//   useEffect(()=>{
//     console.log(board)
// })
//   const handleMove = (row, col, piece, e) => {
//     // Determine if the piece belongs to the current player
//     const isPlayerPiece = isWhiteTurn ? piece && piece.endsWith('_w') : piece && piece.endsWith('_b');
    
//     let valid = false;
//     if (piece && isPlayerPiece) {
//       setSource({ piece: piece, row: row, col: col });
//       return;
//     } else{
//       valid = isMoveValid(source.piece, source.row, source.col, row, col, board);
//     }

//     if (valid) {
//       setBoard((prevBoard) => {
//         const newBoard = [...prevBoard.map(row => [...row])]; // Create a copy of the board
//         newBoard[row][col] = newBoard[source.row][source.col]; // Move the piece
//         newBoard[source.row][source.col] = null; // Clear the original position
//         return newBoard; // Update state
//       });
//       // Switch turn after a valid move
//       setIsWhiteTurn(!isWhiteTurn);
//     } else {
//       setSource({ piece: "", row: "", col: "" });
//     }
//     console.log(`Clicked on row ${row}, column ${col} by ${piece} valid ${valid}`);
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: '20px', fontSize: '24px' }}>
//         {isWhiteTurn ? "White's Turn" : "Black's Turn"}
//       </div>
//       <div id="chessboard">
//         {board.map((row, rowIndex) => (
//           <div key={rowIndex} className="row">
//             {row.map((piece, colIndex) => {
//               const squareColor = (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black';
//               return (
//                 <div key={colIndex} className={`square ${squareColor}`}>
//                   <button 
//                     onClick={(e) => handleMove(rowIndex, colIndex, piece, e)}
//                     style={{ backgroundColor: squareColor === 'white' ? '#f0d9b5' : '#b58863' }}
//                   >
//                     <img
//                       style={{opacity: piece ? 1 : 0}}
//                       src={pieceImages[piece]} // Access image based on piece name
//                       alt={piece}
//                       width="70px"
//                       height="70px"
//                     />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Board;


//alt-1--drag drop


import React, { useEffect, useState } from 'react';
import { isMoveValid } from './PieceRules/Rules';
import './board.css';
import r_w from './../assets/r_w.png';
import kn_w from './../assets/kn_w.png';
import b_w from './../assets/b_w.png';
import q_w from './../assets/q_w.png';
import ki_w from './../assets/ki_w.png';
import p_w from './../assets/p_w.png';
import r_b from './../assets/r_b.png';
import kn_b from './../assets/kn_b.png';
import b_b from './../assets/b_b.png';
import q_b from './../assets/q_b.png';
import ki_b from './../assets/ki_b.png';
import p_b from './../assets/p_b.png';

const initialBoard = [
  ["r_w", "kn_w", "b_w", "q_w", "ki_w", "b_w", "kn_w", "r_w"],
  ["p_w", "p_w", "p_w", "p_w", "p_w", "p_w", "p_w", "p_w"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["p_b", "p_b", "p_b", "p_b", "p_b", "p_b", "p_b", "p_b"],
  ["r_b", "kn_b", "b_b", "q_b", "ki_b", "b_b", "kn_b", "r_b"]
];

const pieceImages = {
  r_w, kn_w, b_w, q_w, ki_w, p_w,
  r_b, kn_b, b_b, q_b, ki_b, p_b
};

function Board() {
  const [board, setBoard] = useState(initialBoard);
  const [source, setSource] = useState({ piece: null, row: null, col: null });
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  const handleDragStart = (e, row, col, piece) => {
    const isPlayerPiece = isWhiteTurn ? piece && piece.endsWith('_w') : piece && piece.endsWith('_b');
    if (isPlayerPiece) {
      setSource({ piece, row, col });
      e.dataTransfer.setData('piece', piece);
    }
  };

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    const targetPiece = e.dataTransfer.getData('piece');
    if (isMoveValid(source.piece, source.row, source.col, row, col, board)) {
      setBoard(prevBoard => {
        const newBoard = prevBoard.map(innerRow => [...innerRow]);
        newBoard[row][col] = targetPiece;
        newBoard[source.row][source.col] = null;
        return newBoard;
      });
      setIsWhiteTurn(!isWhiteTurn);
    }
    setSource({ piece: null, row: null, col: null });
  };

  const handleMove = (row, col, piece) => {
    const isPlayerPiece = isWhiteTurn ? piece && piece.endsWith('_w') : piece && piece.endsWith('_b');
    if (isPlayerPiece) {
      setSource({ piece, row, col });
    } else if (isMoveValid(source.piece, source.row, source.col, row, col, board)) {
      setBoard(prevBoard => {
        const newBoard = prevBoard.map(innerRow => [...innerRow]);
        newBoard[row][col] = board[source.row][source.col];
        newBoard[source.row][source.col] = null;
        return newBoard;
      });
      setIsWhiteTurn(!isWhiteTurn);
      setSource({ piece: null, row: null, col: null });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', fontSize: '24px' }}>
        {isWhiteTurn ? "White's Turn" : "Black's Turn"}
      </div>
      <div id="chessboard">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((piece, colIndex) => {
              const squareColor = (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black';
              return (
                <div 
                  key={colIndex} 
                  className={`square ${squareColor}`} 
                  onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <button 
                    onClick={() => handleMove(rowIndex, colIndex, piece)}
                    draggable={!!piece}
                    onDragStart={(e) => handleDragStart(e, rowIndex, colIndex, piece)}
                    style={{ backgroundColor: squareColor === 'white' ? '#f0d9b5' : '#b58863' }}
                  >
                    <img
                      style={{ opacity: piece ? 1 : 0 }}
                      src={pieceImages[piece]}
                      alt={piece}
                      width="70px"
                      height="70px"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;


//alternative -- for kingincheck and all rubbish

// import React, { useState } from 'react';
// import { isMoveValid, isInCheck, isCheckmate } from './PieceRules/Rules';
// import './board.css';
// import r_w from './../assets/r_w.png';
// import kn_w from './../assets/kn_w.png';
// import b_w from './../assets/b_w.png';
// import q_w from './../assets/q_w.png';
// import ki_w from './../assets/ki_w.png';
// import p_w from './../assets/p_w.png';
// import r_b from './../assets/r_b.png';
// import kn_b from './../assets/kn_b.png';
// import b_b from './../assets/b_b.png';
// import q_b from './../assets/q_b.png';
// import ki_b from './../assets/ki_b.png';
// import p_b from './../assets/p_b.png';

// const initialBoard = [
//   ["r_w", "kn_w", "b_w", "q_w", "ki_w", "b_w", "kn_w", "r_w"],
//   ["p_w", "p_w", "p_w", "p_w", "p_w", "p_w", "p_w", "p_w"],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   ["p_b", "p_b", "p_b", "p_b", "p_b", "p_b", "p_b", "p_b"],
//   ["r_b", "kn_b", "b_b", "q_b", "ki_b", "b_b", "kn_b", "r_b"]
// ];

// const pieceImages = {
//   r_w, kn_w, b_w, q_w, ki_w, p_w,
//   r_b, kn_b, b_b, q_b, ki_b, p_b
// };

// function Board() {
//   const [board, setBoard] = useState(initialBoard);
//   const [source, setSource] = useState({ piece: null, row: null, col: null });
//   const [isWhiteTurn, setIsWhiteTurn] = useState(true);
//   const [gameStatus, setGameStatus] = useState(""); // To display check, checkmate messages

//   const handleMove = (row, col, piece, e) => {
//     const isPlayerPiece = isWhiteTurn ? piece && piece.endsWith('_w') : piece && piece.endsWith('_b');
//     let valid = false;
    
//     if (piece && isPlayerPiece) {
//       setSource({ piece: piece, row: row, col: col });
//       return;
//     } else {
//       valid = isMoveValid(source.piece, source.row, source.col, row, col, board);
//     }

//     if (valid) {
//       setBoard((prevBoard) => {
//         const newBoard = [...prevBoard.map(row => [...row])];
//         newBoard[row][col] = newBoard[source.row][source.col];
//         newBoard[source.row][source.col] = null;
//         return newBoard;
//       });
      
//       const nextTurn = !isWhiteTurn;
//       setIsWhiteTurn(nextTurn);

//       // Check for check, checkmate
//       const kingInCheck = isInCheck(board, nextTurn ? 'w' : 'b');
//       const checkmate = isCheckmate(board, nextTurn ? 'w' : 'b');
      
//       if (checkmate) {
//         setGameStatus(nextTurn ? "Black Wins by Checkmate!" : "White Wins by Checkmate!");
//       } else if (kingInCheck) {
//         setGameStatus(nextTurn ? "White King is in Check!" : "Black King is in Check!");
//       } else {
//         setGameStatus("");
//       }
//     } else {
//       setSource({ piece: "", row: "", col: "" });
//     }
//   };

//   return (
//     <div>
//       <div style={{ marginBottom: '20px', fontSize: '24px' }}>
//         {gameStatus || (isWhiteTurn ? "White's Turn" : "Black's Turn")}
//       </div>
//       <div id="chessboard">
//         {board.map((row, rowIndex) => (
//           <div key={rowIndex} className="row">
//             {row.map((piece, colIndex) => {
//               const squareColor = (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black';
//               return (
//                 <div key={colIndex} className={`square ${squareColor}`}>
//                   <button 
//                     onClick={(e) => handleMove(rowIndex, colIndex, piece, e)}
//                     style={{ backgroundColor: squareColor === 'white' ? '#f0d9b5' : '#b58863' }}
//                   >
//                     <img
//                       style={{opacity: piece ? 1 : 0}}
//                       src={pieceImages[piece]}
//                       alt={piece}
//                       width="70px"
//                       height="70px"
//                     />
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Board;

