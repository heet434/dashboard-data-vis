import * as d3 from 'd3';
import _ from 'lodash';

const draw = (props) => {
    let data = props.data;
    const species = ["setosa", "versicolor", "virginica"];
    const xAxisOption = props.xAxis || "count"; // Default x-axis is "count"
    const yAxisOption = props.yAxis || "sepalLength"; // Default y-axis is "sepalLength"

    // Clear any existing chart
    d3.select('.vis-linechart > *').remove();

    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    let svg = d3.select(".vis-linechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the data dynamically based on axis options
    data.forEach(d => {
        d[xAxisOption] = +d[xAxisOption] || d[xAxisOption]; // Convert to number if applicable
        d[yAxisOption] = +d[yAxisOption]; // Ensure y-axis values are numeric
    });

    // Group data by species
    const groupedData = _.groupBy(data, 'species');

    // Create the x-axis scale
    let x;
    if (xAxisOption === "count") {
        x = d3.scaleLinear()
            .domain([0, data.length]) // Use count index for x-domain
            .range([0, width]);
    } else {
        x = d3.scaleLinear()
            .domain(d3.extent(data, d => d[xAxisOption]))
            .range([0, width]);
    }

    // Create the y-axis scale
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[yAxisOption])])
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .append("text")
        .attr("fill", "black")
        .attr("x", width / 2)
        .attr("y", margin.bottom - 10)
        .text(xAxisOption);

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "black")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 15)
        .attr("text-anchor", "middle")
        .text(yAxisOption);

    // Define the line generator
    const line = d3.line()
        .x(d => x(d[xAxisOption]))
        .y(d => y(d[yAxisOption]));

    // Add lines for each species
    species.forEach((specie, i) => {
        if (groupedData[specie]) {
            svg.append("path")
                .datum(groupedData[specie])
                .attr("fill", "none")
                .attr("stroke", d3.schemeCategory10[i]) // Use a color from the scheme
                .attr("stroke-width", 1.5)
                .attr("d", line);
        }
    });

    // Add a legend
    const legend = svg.append("g")
        .attr("transform", `translate(${width - 100}, 10)`);

    species.forEach((specie, i) => {
        const legendRow = legend.append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", d3.schemeCategory10[i]);

        legendRow.append("text")
            .attr("x", 15)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("text-transform", "capitalize")
            .text(specie);
    });
};

export default draw;