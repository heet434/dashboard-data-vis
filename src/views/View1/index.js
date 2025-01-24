import React, { Component } from 'react';
import { Avatar } from 'antd';
import './view1.css';
import Setosa from '../../assets/setosa.jpg';
import Versicolor from '../../assets/versicolor.jpeg';
import Virginica from '../../assets/virginica.jpeg';

export default class View1 extends Component {
    render() {
        const {species} = this.props;
        if (!species) return null;

        return (
            <div id='view1' className='pane'>
                <div className='header'>Details</div>
                <div>
                    <div className={'avatar-view'}>
                        <Avatar shape="square" size={120} img src={species.species === 'setosa' ? Setosa : species.species === 'versicolor' ? Versicolor : Virginica} />
                    </div>
                    <div className={'info-view'}>
                        <div><span className='label'>Species:</span> {species.species}</div>
                        <div><span className='label'>Avg. Sepal Length:</span> {species.sepalLength} cm</div>
                        <div><span className='label'>Avg. Sepal Width:</span> {species.sepalWidth} cm</div>
                        <div><span className='label'>Avg. Petal Length:</span> {species.petalLength} cm</div>
                        <div><span className='label'>Avg. Petal Width:</span> {species.petalWidth} cm</div>
                        <div><span className='label'>Count:</span>{species.count}</div>
                    </div>
                </div>
            </div>
        )
    }
}
