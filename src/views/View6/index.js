import React, { Component } from 'react';
import { List } from 'antd';
import './view6.css';

export default class View6 extends Component {

    selectSpecies = species => {
        const {changeSelectedSpecies} = this.props;
        changeSelectedSpecies(species);
    }

    render() {
        const {selectedSpeciesData} = this.props;
        return (
            <div id='view6' className='pane'>
                <div className='header'>Species List</div>
                <List
                    size="small"
                    bordered
                    dataSource={selectedSpeciesData}
                    renderItem={item => <List.Item onClick={() => this.selectSpecies(item)} className='list-item'>
                        {item.species}
                    </List.Item>}
                />
            </div>
        )
    }
}