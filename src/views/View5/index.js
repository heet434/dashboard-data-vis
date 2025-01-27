import React, { Component } from 'react';
import ScatterPlot from '../../charts/ScatterPlot';
import './view5.css';

export default class View5 extends Component {
    render() {
        const {irisData, width, height, xAxis, yAxis, handleXAxisChange, handleYAxisChange} = this.props;
        // set default x and y axis
        if (!xAxis) {
            handleXAxisChange({target: {value: 'sepalLength'}}); // set default x axis
        }
        if (!yAxis) {
            handleYAxisChange({target: {value: 'sepalWidth'}}); // set default y axis
        }
        return (
            <div id='view5' className='pane'>
                <div className='header'>Scatter Plot</div>
                {/* add selection for x and y axis */}
                <div className='axis-selection'>
                    <label>X Axis:</label>
                    <select value={xAxis} onChange={handleXAxisChange}>
                        <option value='sepalLength'>Sepal Length</option>
                        <option value='sepalWidth'>Sepal Width</option>
                        <option value='petalLength'>Petal Length</option>
                        <option value='petalWidth'>Petal Width</option>
                    </select>
                    {/* leave some space */}
                    <div style={{width: '50px', display: 'inline-block'}}></div>
                    <label>Y Axis:</label>
                    <select value={yAxis} onChange={handleYAxisChange}>
                        <option value='sepalLength'>Sepal Length</option>
                        <option value='sepalWidth'>Sepal Width</option>
                        <option value='petalLength'>Petal Length</option>
                        <option value='petalWidth'>Petal Width</option>
                    </select>
                </div>
                <ScatterPlot irisData={irisData} width={width} height={height} xAxis={xAxis} yAxis={yAxis} />
            </div>
        )
    }
}