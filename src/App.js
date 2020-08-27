import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,   // Current number in display box - being prepared to be sent to operation array
      operationArr: [],  // Array of stored numbers and operations - not yet evaluated. Displayed below current value
      heldValue: false,  // Boolean for storing whether or not there's a value in currentValue being operated on - important for the decimal button to function properly.
      isDecimal: false,  // Boolean for storing whether or not the current value is a decimal
      wasJustEvaluated: false,  // Boolean for whether or not the value was just evaluated with "=" - important for holding over values to continue operations after using "="
      operatorJustUsed: false   // Boolean for storing if an operator was just used - important to know if an operator input should override the last input or be added to operator array
    }
    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }
  
  handleDigitClick(event) {
    if (this.state.heldValue === false && event.target.value === 0) {
      return
    } else if (this.state.heldValue === false) {
      this.setState({
        currentValue: event.target.value,
        heldValue: true,
        operatorJustUsed: false
      })
    } else {
      this.setState({
        currentValue: this.state.currentValue + event.target.value,
      })
    }
  }
  
  handleDecimal(event) {
    if (this.state.isDecimal === false && this.state.heldValue === false) {
      this.setState({
        currentValue: (0 + event.target.value),
        heldValue: true,
        isDecimal: true
      })
    } else if (this.state.isDecimal === false) {
      this.setState({
        currentValue: this.state.currentValue + event.target.value,
        isDecimal: true
      })
    }
  }
  
  handleClear() {
    this.setState({
      currentValue: 0,
      operationArr: [],
      heldValue: false,
      isDecimal: false,
      wasJustEvaluated: false,
      operatorJustUsed: false
    })
  }
  
  handleOperation(event) {
    if (this.state.operatorJustUsed === true && event.target.value !== "-") {
      if (this.state.operationArr[this.state.operationArr.length - 1] === "-") {
        this.setState({
        operationArr: this.state.operationArr.slice(0, -2).concat(event.target.value),
        isDecimal: false,
        wasJustEvaluated: false
      })
     }
     else {
       this.setState({
        operationArr: this.state.operationArr.slice(0, -1).concat(event.target.value),
        isDecimal: false,
        wasJustEvaluated: false
      })
     }
    }
    else if(this.state.operationArr[this.state.operationArr.length - 1] === "-" && event.target.value === "-") {
      return
    }
    
    else if (this.state.wasJustEvaluated === true) {
      this.setState({
        operationArr: [this.state.currentValue].concat(event.target.value),
        isDecimal: false,
        wasJustEvaluated: false,
        operatorJustUsed: true
      })
    }
    else if (this.state.heldValue === false) {
      this.setState({
        operationArr: this.state.operationArr.concat(event.target.value),
        isDecimal: false,
        operatorJustUsed: true
      })
    } else {
      this.setState({
        operationArr: this.state.operationArr.concat(this.state.currentValue).concat(event.target.value),
        heldValue: false,
        isDecimal: false,
        operatorJustUsed: true
      })
    }
  }
  
  handleEquals() {
    if (this.state.heldValue === false) {
      let result = eval(this.state.operationArr.slice(0, -1).join(" "));
      this.setState({
        operationArr: this.state.operationArr.slice(0, -1),
        currentValue: result,
        heldValue: false,
        wasJustEvaluated: true,
        operatorJustUsed: false
      })
    } else {
      let result = eval(this.state.operationArr.join(" ") + this.state.currentValue);
      this.setState({
       operationArr: this.state.operationArr.concat(this.state.currentValue),
       currentValue: result,
       heldValue: false,
       wasJustEvaluated: true,
       operatorJustUsed: false
     })
    }
  }
  
  render() {
    return (
      <div id="calculator">
        <div id="display">
          <div id="main-display">
            {this.state.currentValue}
          </div>
          <div id="sub-display">
            {this.state.operationArr.join("")}
          </div>
        </div>
        <ClearButton clearClick={this.handleClear} />
        <Operator type="divide" sign="/" value="/" handleOperation={this.handleOperation} />
        <Operator type="multiply" sign="x" value="*" handleOperation={this.handleOperation} />
        <Digit number="seven" digit="7" digitClick={this.handleDigitClick} />
        <Digit number="eight" digit="8" digitClick={this.handleDigitClick} />
        <Digit number="nine" digit="9" digitClick={this.handleDigitClick} />
        <Operator type="add" sign="+" value="+" handleOperation={this.handleOperation} />
        <Digit number="four" digit="4" digitClick={this.handleDigitClick} />
        <Digit number="five" digit="5" digitClick={this.handleDigitClick} />
        <Digit number="six" digit="6" digitClick={this.handleDigitClick} />
        <Operator type="subtract" sign="-" value="-" handleOperation={this.handleOperation} />
        <Digit number="one" digit="1" digitClick={this.handleDigitClick} />
        <Digit number="two" digit="2" digitClick={this.handleDigitClick} />
        <Digit number="three" digit="3" digitClick={this.handleDigitClick} />
        <EqualsButton handleEquals={this.handleEquals}/>
        <Digit number="zero" digit="0" digitClick={this.handleDigitClick} />
        <Decimal value="." handleDecimal={this.handleDecimal} />
      </div>
    )
  }
}

const Digit = (props) => {
  return (
    <button 
      class="btn btn-primary"
      id={props.number}
      onClick={props.digitClick}
      value={props.digit}
      >
      {props.digit}
    </button>
  )
}

const Operator = (props) => {
  return (
    <button 
      class="btn btn-primary"
      id={props.type}
      value={props.value}
      onClick={props.handleOperation}
      >
      {props.sign}
    </button>
  )
}

const ClearButton = (props) => {
  return (
    <button 
      class="btn btn-primary"
      id="clear"
      onClick={props.clearClick}
      >
      AC
    </button>
  )
}

const EqualsButton = (props) => {
  return (
    <button 
      class="btn btn-primary"
      id="equals"
      onClick={props.handleEquals}
      >
      =
    </button>
  )
}

const Decimal = (props) => {
  return (
    <button
      class="btn btn-primary"
      id="decimal"
      onClick={props.handleDecimal}
      value={props.value}
      >
      .
    </button>
  )
}


export default App;
