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
        }
    }

    changeSelectedSpecies = species => {
        this.setState({
            selectedSpecies: species
        })
    }

    render() {
        // const {selectedUser, greaterThenAge, includedGender} = this.state;
        const {selectedSpecies} = this.state;
        // const filteredData = data.filter(user=>includedGender.indexOf(user.gender)!==-1)
        //                          .filter(user=>user.age>greaterThenAge);

        // set species with avg sepal length, avg sepal width, avg petal length, avg petal width and count
        const avgData = irisData.reduce((acc, species) => {
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



        return (
            <div>
                <Layout style={{ height: 920 }}>
                    <Sider width={400} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 200 }}>
                            <View1 species={selectedSpeciesData}/>
                        </Content>
                        <Content style={{ height: 300 }}>
                            <View2 data={irisData}/>
                        </Content>
                        {/* <Content style={{ height: 400 }}>
                            <View3 
                                changeGreaterThenAge={this.changeGreaterThenAge}
                                changeIncludedGender={this.changeIncludedGender}
                            />
                        </Content> */}
                    </Sider>
                    {/* <Layout>
                        <Content style={{ height: 300 }}>
                            <View4 user={selectedUser}/>
                        </Content>
                        <Layout style={{ height: 600 }}>
                            <Content>
                                <View5 data={filteredData}/>
                            </Content>
                            <Sider width={300} style={{backgroundColor:'#eee'}}>
                                <View6 data={filteredData} changeSelectUser={this.changeSelectUser}/>
                            </Sider>
                        </Layout>
                    </Layout> */}
                </Layout>
            </div>
        )
    }
}
