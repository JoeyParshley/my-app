import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Create three react components 'Square', 'Board' and 'Game'
function Square(props) {
  return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    /*
        set boards initial state to contain an array of 9 nulls corresponding to the 9 squares
        and X to be the first move by default. each time a player moves xIsNext will be flipped
        to determine whose turn it is and games state will be saved

        The Board's handleClick function is responsible for flipping xIsNext
    */
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  /*
    handleClick(i) function:
    - allows clicking on the squares to fill them.
    - flips the xIsNext flag
    - now state is stored in the Board component instead of the individual Square components
    - when the Board's state changes, the Square components re-render automatically
    - keeping the state of all the squares in the Board component will allow it to determine the winner
   */
  handleClick(i) {
    /*
      use slice() to create a copy of the squares array to modify instead of modifying the existing array
        slice() - returns a shallow copy of a portion of an array into a new array object
                - can use start (inclusive) and end (exclusive) arguments to represent the bounding indices to be copied
    */
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,  // flips whose turn it is
    });
  }

  renderSquare(i) {
    /*
      pass down two props from Board to Square:
        - value
        - onClick

      note Square component was wrapped in parens so Javascript wont insert a semicolon after return
    */
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
    );
  }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
