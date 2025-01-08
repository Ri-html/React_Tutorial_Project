import { useState } from "react";

/**
 * rectangular cells representing cells on a game board (not specific to tic-tac-toe)
 * @param {char} value - values representing an entity on the game board
 * @param {function(): void} onSquareClick - a function taken from the parent class that does an action on clicking the cell 
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
 * Component that encapsulates the operation of the tic-tac-toe board game including making moves, validating victory, and showing game state
 * @returns The game board for the tic-tac-toe game
 */
function Board({xIsNext, squares, onPlay}) {

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

    onPlay(nextSquares);
  }

  //prompts the game status
  const winner=calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: " + winner;
  }else{
    status = "Next player: " + (xIsNext?"X":"O");
  }

  //code for rendering the board
  const rows=[];
  for(let i=0; i<3; i++){
    const cols=[];
      for(let j=0; j<3; j++){

        let squaresIndex=i*3+j;
        cols.push(
          <Square value={squares[squaresIndex]} onSquareClick={()=>handleClick(squaresIndex)}/>
        )
      }
      rows.push(
        <div className="board-row">{cols}</div>      
      )
  }

  //contains the tic tac toe game board with value from the array
  return <>
  {rows}
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

/**
 * Component containing redo feature
 * @returns rendering of the tic-tac-toe board game
 */
export default function Game(){
  const [history, setHistory]=useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares= history[currentMove];
  const xIsNext= currentMove%2 === 0;

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
    }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  function rearrangeHistory(){
    const nextHistory = [...history.slice(0, currentMove+1)].reverse();
    setHistory(nextHistory);
    setCurrentMove(0);
  }

  function ToggleButton(){
    return(
      <button onClick={rearrangeHistory}>Rearrange Move Order</button>
    )
  }

  /**
   * Moves contains an array of html buttons showing history of moves
   */
  const moves= history.map((squares, move)=>{
    
    let description;
    if (move > 0){
      description= 'Go to move #' + move;
    }else{
      description= 'Go to game start';
    }

    //returns a string instead of a button if current move equals move
    let isCurrentMove = move === currentMove;
    if(isCurrentMove){
      return (
        <li key={move} >
        <p>{description}</p>
      </li>
      )
    }


    return(
      <li key={move} >
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  //return for game component
  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ToggleButton/>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}