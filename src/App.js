import { useState } from "react";

/**
 * rectangular cells representing cells on a game board (not specific to tic-tac-toe)
 * @param {char} value - values representing an entity on the game board
 * @param {function} onSquareClick - a function taken from the parent class that does an action on clicking the cell 
 * @returns a button representing the board game cell
 */
function Square({value, onSquareClick}){
  return (
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
  );
}

/**
 * Component that encapsulates the operation of the tic-tac-toe board game
 * @returns 
 */
export default function Board() {
  const [xIsNext, setXIsNext]= useState(true);
  const [squares, setSquares]= useState(Array(9).fill(null));

  function handleClick(i){

    //end the function without changing any variables
    if(squares[i]||calculateWinner(squares)){
      return;
    }

    //create a deep copy of squares for the sake of undo feature
    const nextSquares = squares.slice();
    
    //changes value in nextSquares array and xIsNext variable
    if (xIsNext){
      nextSquares[i]= "X";
    }else{
      nextSquares[i]="O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  //contains the tic tac toe game board with value from the array
  return <>
  <div className="board-row">
    <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
  </div>

  <div className="board-row">
    <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
  </div>

  <div className="board-row">
    <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
  </div>
  </>
}

/**
 * This is a function to check whether there is a winner to the tic tac toe game
 * @param {string[]} squares - an array containing the values for the tictactoe board
 * @returns a boolean value
 */
function calculateWinner(squares){
  
  //get an list  of all possible winning patterns
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i =0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    // checking for null, and whether all three entries allign
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c])
      return true;
  }
  return false;
}