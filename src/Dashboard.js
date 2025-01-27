import React, { Component } from 'react';
import {data,irisData} from './data';
import { Layout } from 'antd';
import View1 from './views/View1';
import View2 from './views/View2';
import View3 from './views/View3';
import View4 from './views/View4';
import View5 from './views/View5';
import View6 from './views/View6';
import './dashboard.css';

const { Sider, Content} = Layout;

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSpecies: irisData[0],
            xAxis: 'sepalLength',
            yAxis: 'sepalWidth',
            greaterThanSepalLength: 0,
            greaterThanPetalLength: 0,
            greaterThanSepalWidth: 0,
            greaterThanPetalWidth: 0,
            // all species included by default
            includedSpecies: ['setosa', 'versicolor', 'virginica']
        }
    }

    changeSelectedSpecies = species => {
        this.setState({
            selectedSpecies: species
        })
    }
    handleXAxisChange = e => {
        this.setState({
            xAxis: e.target.value
        })
    }
    handleYAxisChange = e => {
        this.setState({
            yAxis: e.target.value
        })
    }
    // changeGreaterThanSepalLength = e => {
    //     this.setState({
    //         greaterThanSepalLength: e.target.value
    //     })
    // }
    // changeGreaterThanPetalLength = e => {
    //     this.setState({
    //         greaterThanPetalLength: e.target.value
    //     })
    // }
    // changeGreaterThanSepalWidth = e => {
    //     this.setState({
    //         greaterThanSepalWidth: e.target.value
    //     })
    // }
    // changeGreaterThanPetalWidth = e => {
    //     this.setState({
    //         greaterThanPetalWidth: e.target.value
    //     })
    // }
    changeIncludedSpecies = e => {
        this.setState({
            includedSpecies: e
        })
    }



    render() {
        const {selectedSpecies} = this.state;

        // filter the data based on the selected species, greater than values and included species
        const filteredData = irisData.filter(species => {
            return species.sepalLength > this.state.greaterThanSepalLength &&
                species.petalLength > this.state.greaterThanPetalLength &&
                species.sepalWidth > this.state.greaterThanSepalWidth &&
                species.petalWidth > this.state.greaterThanPetalWidth &&
                this.state.includedSpecies.includes(species.species);
        });



        const avgData = filteredData.reduce((acc, species) => {
            if (!acc[species.species]) {
                acc[species.species] = { sepalLength: 0, sepalWidth: 0, petalLength: 0, petalWidth: 0, count: 0 };
            }
            acc[species.species].sepalLength += species.sepalLength;
            acc[species.species].sepalWidth += species.sepalWidth;
            acc[species.species].petalLength += species.petalLength;
            acc[species.species].petalWidth += species.petalWidth;
            acc[species.species].species = species.species;
            acc[species.species].count += 1;
            return acc;
        }, {});

        // truncate the avg data to 2 decimal places
        Object.keys(avgData).forEach(species => {
            avgData[species].sepalLength = (avgData[species].sepalLength / avgData[species].count).toFixed(2);
            avgData[species].sepalWidth = (avgData[species].sepalWidth / avgData[species].count).toFixed(2);
            avgData[species].petalLength = (avgData[species].petalLength / avgData[species].count).toFixed(2);
            avgData[species].petalWidth = (avgData[species].petalWidth / avgData[species].count).toFixed(2);
        });

        const selectedSpeciesData = avgData[selectedSpecies.species];
        const selectedSpeciesDataArray = Object.keys(avgData).map(species => avgData[species]);



        return (
            <div>
                <Layout style={{ height: 820 }}>
                    <Sider width={400} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 200 }}>
                            <View1 species={selectedSpeciesData}/>
                        </Content>
                        <Content style={{ height: 300 }}>
                            <View2 data={filteredData}/>
                        </Content>
                        <Content style={{ height: 50 }}>
                            <View3 
                                changeGreaterThanSepalLength={this.changeGreaterThanSepalLength}
                                changeGreaterThanPetalLength={this.changeGreaterThanPetalLength}
                                changeGreaterThanSepalWidth={this.changeGreaterThanSepalWidth}
                                changeGreaterThanPetalWidth={this.changeGreaterThanPetalWidth}
                                changeIncludedSpecies={this.changeIncludedSpecies}
                            />
                        </Content>
                    </Sider>
                    <Layout>
                        {/* <Content style={{ height: 300 }}>
                            <View4 data={irisData}/>
                        </Content> */}
                        <Layout style={{ height: 820 }}>
                            <Content>
                                <View5 irisData={filteredData} height={670} width={780} xAxis={this.state.xAxis} yAxis={this.state.yAxis} handleXAxisChange={this.handleXAxisChange} handleYAxisChange={this.handleYAxisChange}/>
                            </Content>
                            <Sider width={300} style={{backgroundColor:'#eee'}}>
                                <View6 selectedSpeciesData={selectedSpeciesDataArray} changeSelectedSpecies={this.changeSelectedSpecies}/>
                            </Sider>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
