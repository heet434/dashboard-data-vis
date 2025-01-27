import React, { Component } from 'react';
import draw from './vis';

export default class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yAxis: "petalLength", // Default y-axis
        };
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props || prevState.yAxis !== this.state.yAxis) {
            this.renderChart();
        }
    }

    renderChart = () => {
        const { data, width, height } = this.props;
        const { yAxis } = this.state;
        draw({ data, width, height, yAxis });
    };

    handleYAxisChange = (event) => {
        this.setState({ yAxis: event.target.value });
    };

    render() {
        return (
            <div>
                {/* Dropdown for selecting the y-axis */}
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="yAxisSelect" style={{ marginRight: "10px" }}>
                        Select Y-Axis:
                    </label>
                    <select
                        id="yAxisSelect"
                        value={this.state.yAxis}
                        onChange={this.handleYAxisChange}
                    >
                        <option value="petalLength">Petal Length</option>
                        <option value="sepalLength">Sepal Length</option>
                        <option value="petalWidth">Petal Width</option>
                        <option value="sepalWidth">Sepal Width</option>
                    </select>
                </div>

                {/* Line chart container */}
                <div className='vis-linechart'/>
            </div>
        );
    }
}