import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
      operationArr: [],
      heldValue: false,
      isDecimal: false,
      wasJustEvaluated: false,
      operatorJustUsed: false
    }
    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
  }
  
  handleDigitClick() {
    if (this.state.heldValue == false && event.target.value == 0) {
      return
    } else if (this.state.heldValue == false) {
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
  
  handleDecimal() {
    if (this.state.isDecimal == false && this.state.heldValue == false) {
      this.setState({
        currentValue: (0 + event.target.value),
        heldValue: true,
        isDecimal: true
      })
    } else if (this.state.isDecimal == false) {
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
  
  handleOperation() {
    if (this.state.operatorJustUsed === true && event.target.value !== "-") {
      if (this.state.operationArr[this.state.operationArr.length - 1] == "-") {
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
    else if(this.state.operationArr[this.state.operationArr.length - 1] == "-" && event.target.value == "-") {
      return
    }
    
    else if (this.state.wasJustEvaluated == true) {
      this.setState({
        operationArr: [this.state.currentValue].concat(event.target.value),
        isDecimal: false,
        wasJustEvaluated: false,
        operatorJustUsed: true
      })
    }
    else if (this.state.heldValue == false) {
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
    if (this.state.heldValue == false) {
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

class Digit extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <button 
        class="btn btn-primary"
        id={this.props.number}
        onClick={this.props.digitClick}
        value={this.props.digit}
        >
        {this.props.digit}
      </button>
      )
  }
}

class Operator extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <button 
        class="btn btn-primary"
        id={this.props.type}
        value={this.props.value}
        onClick={this.props.handleOperation}
        >
        {this.props.sign}
      </button>
    )
  }
}

class ClearButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <button 
      class="btn btn-primary"
      id="clear"
      onClick={this.props.clearClick}
      >
      AC
    </button>
  )
  }
}

class EqualsButton extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
   return (
    <button 
      class="btn btn-primary"
      id="equals"
      onClick={this.props.handleEquals}
      >
      =
    </button>
   )
  }
}

class Decimal extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
    <button
      class="btn btn-primary"
      id="decimal"
      onClick={this.props.handleDecimal}
      value={this.props.value}
      >
      .
    </button>
  )
  }
}


export default App;
