import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.takeColor = this.takeColor.bind(this);
    this.getRandomCombination = this.getRandomCombination.bind(this);
    // this.colorCombination = this.colorCombination.bind(this);
    this.start = this.start.bind(this);
    this.check = this.check.bind(this);
    this.state = {
      color: [],
      combinationToGuess: [],
      resultComb: []
    };
  }

  takeColor(e) {
    const color = e.target.id;
    this.setState(prevState => {
      return {
        color: prevState.color.concat(color)
      };
    });
  }

  getRandomCombination() {
    return Math.floor(Math.random() * 4);
  }

  start() {
    const combination = ["red", "green", "blue", "yellow"];
    let combinationToAdd = [];
    for (let i = 0; i < 4; i++) {
      combinationToAdd.push(combination[this.getRandomCombination()]);
    }

    this.setState({
      combinationToGuess: combinationToAdd,
      color: [],
      resultComb: []
    });

    alert(combinationToAdd);
  }

  check() {
    let result;
    let combinationToGuessCopy = [...this.state.combinationToGuess];
    let colorCopy = [...this.state.color];
    let resultCombCopy = [];

    colorCopy.forEach((el1, i1) => {
      combinationToGuessCopy.forEach((el2, i2) => {
        if (el1 == el2 && i1 == i2) {
          resultCombCopy.push("white");
          delete colorCopy[i1];
          delete combinationToGuessCopy[i2];
          return (result = true);
        } else {
          return (result = false);
        }
      });
    });

    for (let i = 0; i < combinationToGuessCopy.length; i++) {
      let index = colorCopy.indexOf(combinationToGuessCopy[i]);
      if (index > -1) {
        resultCombCopy.push("black");
        delete colorCopy[index];
        delete combinationToGuessCopy[i];
      }
    }

    this.setState({
      resultComb: resultCombCopy
    });
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Rules />
        <Start start={this.start} />
        <Circle takeColor={this.takeColor} />
        <Row
          colorone={this.state.color[0]}
          colortwo={this.state.color[1]}
          colorthree={this.state.color[2]}
          colorfour={this.state.color[3]}
          check={this.check}
          resultCombOne={this.state.resultComb[0]}
          resultCombTwo={this.state.resultComb[1]}
          resultCombThree={this.state.resultComb[2]}
          resultCombFour={this.state.resultComb[3]}
        />
        
        <div>{}</div>
      </div>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

Header.defaultProps = {
  title: "Mastermind"
};

const Rules = props => {
  return (
    <div>
      <p>
        Try to guess the pattern, in both order and color, within ten turns.
        After submitting a row, a small black peg is placed for each code peg
        from the guess which is correct in both color and position. A white peg
        indicates the existence of a correct color code peg placed in the wrong
        position. More info on{" "}
        <a
          href="https://en.wikipedia.org/wiki/Mastermind_(board_game)"
          target="_blank"
        >
          Wikipedia
        </a>
        .
      </p>
    </div>
  );
};

const Start = props => {
  return (
    <div id="start">
      <button onClick={props.start}>Start game</button>
    </div>
  );
};

const Circle = props => {
  return (
    <div>
      <button className="btn" id="red" onClick={props.takeColor} />
      <button className="btn" id="green" onClick={props.takeColor} />
      <button className="btn" id="blue" onClick={props.takeColor} />
      <button className="btn" id="yellow" onClick={props.takeColor} />
    </div>
  );
};

const Row = props => {
  return (
    <div>
      <div className="inline" id="row">
        <button className="btn" style={{ backgroundColor: props.colorone }} />
        <button className="btn" style={{ backgroundColor: props.colortwo }} />
        <button className="btn" style={{ backgroundColor: props.colorthree }} />
        <button className="btn" style={{ backgroundColor: props.colorfour }} />
        <button id="check" onClick={props.check}>
          Check
        </button>
      </div>

      <div className="inline">
        <div>
          <button
            className="btn-comb"
            style={{ backgroundColor: props.resultCombOne }}
          />
          <button
            className="btn-comb"
            style={{ backgroundColor: props.resultCombTwo }}
          />
        </div>
        <div>
          <button
            className="btn-comb"
            style={{ backgroundColor: props.resultCombThree }}
          />
          <button
            className="btn-comb"
            style={{ backgroundColor: props.resultCombFour }}
          />
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
