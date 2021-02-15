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
// class Square extends React.Component {
//   /*
//       Square component does not maintain state, the component receives values from the Board component
//       and informs the Board component when they're clicked
//       They are now Controlled Components -- the Board has full control over them
//
//       It was converted into a function component which is a simpler way to write components that only contain a
//       render method and dont have their own state.
//         - instead of defining a class that extends React.Component we can write a function that take props as
//           input and returns what should be rendered
//    */
//   // constructor
//   constructor(props) {
//     /*
//         In JavaScript classes, you need to always call super when defining the constructor of a subclass.
//         All React component classes that have a constructor should start with a super(props) call.
//      */
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }
//
//   render() {
//     return (
//         /*
//           onClick={ () => alert('click') }
//           passing a function [ () => this.props.onClick() ] as the onClick prop
//         */
//
//         /*
//           when a Square is clicked the onClickfunction provided by the Board is called
//             - onClick prop on the built-in DOM <button> component tells React to set up a click event listener
//             - button clicked
//               - React calls the onClick even handler that is defined in Square's render() method
//                 - This event handler calls this.props.onClick(). The Square's onClick prop was specified by the Board
//             - Since the board passed onClick={ () => this.handleClick(i) } to Square, the Square calls
//               this.handleClick(i) when clicked
//             - handleClick() is currenlty undefined so clicking the square will result in
//               "this.handleClick is not a function"
//         */
//         <button
//             className="square"
//             onClick={() => this.props.onClick()}
//         >
//           {this.props.value}
//         </button>
//     );
//   }
// }

class Board extends React.Component {
  constructor(props) {
    super(props);
    // set boards initial state to contain an array of 9 nulls corresponding to the 9 squares
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  /*
    handleClick(i) function:
    - allows clicking on the squares to fill them.
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
    squares[i] = 'X';
    this.setState({squares: squares});
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
