import React, { Component } from 'react';
import Snake from "./Snake";
import Food from "./Food";


const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min ) / 2 ) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min ) / 2 ) * 2;
  return [x, y];
}

const initialState = {
  food: getRandomCoordinates(),
  score: 0,
  speed: 100,
  direction: 'RIGHT',
  snakeDots: [
    [0, 0], // [x, y]
    [2, 0]
  ]
}

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkBorders();
    this.checkAutoCannibalism();
    this.checkFood();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        if (this.state.direction !== "DOWN") {
          this.setState({direction: "UP"});
          break;
        }
      case 40:
        if (this.state.direction !== "UP") {
          this.setState({direction: 'DOWN'});
        } else {
          this.setState({direction: 'UP'});
        }
        break;
      case 37:
        if (this.state.direction !== "RIGHT") {
          this.setState({direction: "LEFT"});
          break;
        }
      case 39:
        if (this.state.direction !== "LEFT") {
          this.setState({direction: "RIGHT"});
          break;
        }
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift(); // removes first item of an array (the tail)
    this.setState({
      snakeDots: dots
    });
  }

  checkBorders () {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkAutoCannibalism () {
    // let snake = [...this.state.snakeDots];
    // let head = snake[this.state.snakeDots.length - 1];
    // snake.pop();
    // if (snake.includes(head)) {
    //   this.onGameOver();
    // }
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    });
  }



  checkFood () {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates(),
        score: this.state.score + 1
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake () {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    });
  }

  increaseSpeed () {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      });
    }
  }

  onGameOver() {
    // alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    alert(`Game Over. Your score is ${this.state.score}.`);
    this.setState(initialState);
  }

  render () {
    return (
      <div className="gameArea">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
        <span className="gameScore">Score: {this.state.score}</span>
      </div>
    );
  }
}

export default App;