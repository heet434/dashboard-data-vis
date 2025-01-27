import React, { Component } from 'react';
import { Slider, Checkbox, Divider } from 'antd';
import './view3.css';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['setosa', 'versicolor', 'virginica'];
const defaultCheckedList = ['setosa', 'versicolor', 'virginica'];

export default class View3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
        };
    }

    onChangeCheckbox = checkedList => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
        this.props.changeIncludedSpecies(checkedList);
    };

    onCheckAllChange = e => {
        const checkedList = e.target.checked ? plainOptions : [];
        this.setState({
            checkedList: checkedList,
            indeterminate: false,
            checkAll: e.target.checked,
        });
        this.props.changeIncludedSpecies(checkedList);
    };

    onChangeSlider1 = value => {
        this.props.changeGreaterThanSepalLength(value);
    }
    onChangeSlider2 = value => {
        this.props.changeGreaterThanPetalLength(value);
    }
    onChangeSlider3 = value => {
        this.props.changeGreaterThanSepalWidth(value);
    }
    onChangeSlider4 = value => {
        this.props.changeGreaterThanPetalWidth(value);
    }

    render() {
        return (
            <div id='view3' className='pane'>
                <div className='header'>Filter</div>
                <h3>Species</h3>
                <div style={{ width: 275, margin: 5 }}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <div style={{ width: 275, margin: 5 }}>
                    <CheckboxGroup
                        options={plainOptions}
                        value={this.state.checkedList}
                        onChange={this.onChangeCheckbox}
                    />
                </div>
                {/* <Divider />
                <h3>Greater Than Sepal Length</h3>
                <Slider defaultValue={0} onChange={this.onChangeSilder1}/>
                <Divider />
                <h3>Greater Than Petal Length</h3>
                <Slider defaultValue={0} onChange={this.onChangeSilder2}/>
                <Divider />
                <h3>Greater Than Sepal Width</h3>
                <Slider defaultValue={0} onChange={this.onChangeSilder3}/>
                <Divider />
                <h3>Greater Than Petal Width</h3>
                <Slider defaultValue={0} onChange={this.onChangeSilder4}/> */}
            </div>
        )
    }
}