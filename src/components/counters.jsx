import React, { Component } from 'react'
import Counter from "./counter"
import { Container, Row, Col} from 'react-bootstrap';

class Counters extends Component {
    render() {
        const { counters, synchronizing, onReset, onIncrement, onDecrement, onDelete, onSynchronize, onCheckboxChange, onSelectAll} = this.props;
        return (
                <div>
                    <Container>
                        <Row>
                            <Col align='center' className="mt-5">
                                {counters.map(counter => (
                                    <Counter 
                                        key={counter.id} 
                                        onDelete={onDelete} 
                                        onIncrement={onIncrement}
                                        onDecrement={onDecrement}
                                        onCheckboxChange={onCheckboxChange}
                                        counter={counter}  
                                    />
                                    )) }
                            </Col>
                        </Row>
                    </Container>
                    
                    <Container>
                        <Row className="mt-5">
                            <Col align='center'>
                                <button 
                                    onClick={onSelectAll}
                                    className="btn btn-primary badge-pill btn-lg"
                                    style={{width : '300px', backgroundColor: "rgba(255, 148, 120, 1)", borderColor: "rgba(255, 148, 120, 1)"}}>
                                    {this.formatSelectAll()}
                                </button>
                            </Col>
                        </Row>

                        <Row className="mt-2">
                            <Col align='center'>
                                <button 
                                    onClick={onReset}
                                    className={this.formatReset()}
                                    style={{width : '300px', backgroundColor: "rgba(255, 148, 120, 1)", borderColor: "rgba(255, 148, 120, 1)"}}>
                                    Reset
                                </button>
                            </Col>
                        </Row>

                        <Row className="mt-5">
                            <Col align='center'>
                                <button
                                    onClick={onSynchronize}
                                    className="btn btn-primary badge-pill btn-lg"
                                    style={{width : '300px', height: '150px', borderRadius: 40, backgroundColor: "rgba(82, 179, 217, 1)", borderColor: "rgba(82, 179, 217, 1)"}}>
                                    {synchronizing && <i className="fa fa-cog fa-spin" style={{ marginRight: "10px" }}/>}
                                    {synchronizing ? "Synchronizing..." : "Synchronize"}
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </div>
        )
    }

    formatSelectAll() {
        if (this.props.counters.length === this.props.counters.filter(c => c.checked === true).length) {
            return "Deselect All";
        }
        else {
            return "Select All";
        }
    }

    formatReset() {
        let classes = "btn btn-primary badge-pill btn-lg"
        classes += (this.props.counters.filter(c => c.checked === true).length === 0) ? " disabled" : " active";
        return classes
    }
}
export default Counters;