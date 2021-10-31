import React, { Component } from 'react'
import '/Users/antoinecoppens/Documents/6_Vrije Tijd/digi-jump/node_modules/bootstrap/dist/css/bootstrap.css'
import "./counter.css"
import { Checkbox } from '@material-ui/core';

class Counter extends Component {
  render () {
    return (
      <div>
        <Checkbox onChange={() => this.props.onCheckboxChange(this.props.counter)} checked={this.props.counter.checked} />
        <span
          className={"btn btn-secondary btn-sm"}
          style={{
            borderWidth:1,
            borderColor:this.props.counter.color,
            alignItems:'center',
            justifyContent:'center',
            width:35,
            height:35,
            backgroundColor:this.props.counter.color,
            borderRadius:50,
          }}/>
        <span 
          style={{ fontSize: '15px', fontWeight: 'bold' }} 
          className="m-2">
            Jump {this.props.counter.id}
        </span>
        <button
          onClick={ () => this.props.onDecrement(this.props.counter) } 
          className={this.getMinButtonClasses()}
          style={{
            borderWidth:1,
            borderColor:'rgba(18, 66, 123, 1)',
            alignItems:'center',
            justifyContent:'center',
            width:35,
            height:35,
            backgroundColor:'rgba(18, 66, 123, 1)',
            borderRadius:50,
          }}>
            -
        </button>
        <span 
          style={{ fontSize: '15px', fontWeight: 'bold', width: '50px'}}
          className={this.getBadgeClasses()}>
          {this.props.counter.value}
        </span>
        <button 
          onClick={ () => this.props.onIncrement(this.props.counter) } 
          className={this.getPlusButtonClasses()}
          style={{
            borderWidth:2,
            borderColor:'rgba(18, 66, 123, 1)',
            alignItems:'center',
            justifyContent:'center',
            width:35,
            height:35,
            backgroundColor:'rgba(18, 66, 123, 1)',
            borderRadius:50,
          }}>
            +
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge badge-light m-1";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  }

  getMinButtonClasses() {
    let classes = "btn btn-secondary btn-sm";
    classes += this.props.counter.value === 0 ? " disabled" : " active";
    return classes;
  }

  getPlusButtonClasses() {
    let classes = "btn btn-secondary btn-sm";
    classes += this.props.counter.value === 160 ? " disabled" : " active";
    return classes;
  }
}

export default Counter;