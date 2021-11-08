import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
function Square(props){
  return (
    <button
      className="square"
      onClick={props.onClick}
    >{props.value}
    </button>
  )
}

// class Square extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       value: null,
//     }
//   }
//
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() =>this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //循环所有可以胜利的下标组合
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];//结构赋值,获取可胜利数组的相应三个下标
    //进行判断看当前传入的squares中相应下标的内容是否完全相同,
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; //完全相同返回当前的内容O|X
      //并且由于return的特性 后面的代码不会被执行了
    }
  }
  //如果以上都没有触发,那么返回nul
  return null;
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
      value={this.props.squares[i]}
      onClick={()=> this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history : [{
        squares: Array(9).fill(null)
      }],
      xIsNext:true,
      stepNumber: 0,
    }
  }

  handleClick(i){
    //返回一个空数组
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    //当你进行点击,会把相应i传进来也就是下标,然后将squares中相应下标的内容从null 改为 X
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    //然后将更改过的squares数组 赋值给 父组件Board的squares数组进行保存
    this.setState({
      history: history.concat([{
        squares:squares
      }]),
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move)=>{
      const desc = move ?
        'Go to move #' +move:
        'Go ti game start';
      return (
        <li key={move}>
          <button onClick={()=>this.jumpTo(moves)}>{desc}</button>
        </li>
      );
    });

    let status
    if(winner){
      status = 'winner: '+ winner
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
