import * as d3 from 'd3';

const draw = (props) => {

    const data = props.irisData;

    d3.select('.vis-scatterplot > *').remove();
    const width = props.width;
    const height = props.height;
    d3.select('.vis-scatterplot').append('svg').attr('width', width).attr('height', height);

    const margin = { top: 20, right: 20, bottom: 10, left: 40 };

    const innerWidth = width - margin.left - margin.right-100;
    const innerHeight = height - margin.top - margin.bottom-100;

    const xValue = d => d[props.xAxis];
    const yValue = d => d[props.yAxis];

    const radius = 4;
    const xAxisLabel = props.xAxis;
    const yAxisLabel = props.yAxis;

    // Define a color scale for species
    const colorScale = d3.scaleOrdinal()
        .domain([...new Set(data.map(d => d.species))])
        .range(d3.schemeCategory10);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const g = d3.select('.vis-scatterplot > svg').append('g')
        // .attr('transform', `translate(${margin.left},${margin.top})`);
        .attr('transform', `translate(${margin.left+50},${margin.top+50})`);

    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -40)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 40)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    // Add tooltip container
    const tooltip = d3.select('.vis-scatterplot')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', 'white')
        .style('border', '1px solid #ccc')
        .style('padding', '5px')
        .style('border-radius', '5px')
        .style('pointer-events', 'none')
        .style('opacity', 0);

    // Plot circles and color by species
    g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', radius)
        .attr('fill', d => colorScale(d.species))
        .on('mouseover', (event, d) => {
            tooltip.transition().duration(200).style('opacity', 1);
            tooltip.html(`Species: ${d.species}<br>${xAxisLabel}: ${xValue(d)}<br>${yAxisLabel}: ${yValue(d)}`)
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 20}px`);
        })
        .on('mousemove', (event) => {
            tooltip.style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 20}px`);
        })
        .on('mouseout', () => {
            tooltip.transition().duration(200).style('opacity', 0);
        });

    // Add a title to the chart
    g.append('text')
        .attr('class', 'title')
        .attr('y', 590)
        .text(`${xAxisLabel} vs ${yAxisLabel}`);

    // Add legend
    const legend = g.append('g')
        .attr('transform', `translate(${innerWidth - 100}, 20)`);

    [...new Set(data.map(d => d.species))].forEach((species, i) => {
        const legendRow = legend.append('g')
            .attr('transform', `translate(0, ${i * 20})`);

        legendRow.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', colorScale(species));

        legendRow.append('text')
            .attr('x', 15)
            .attr('y', 10)
            .attr('text-anchor', 'start')
            .style('text-transform', 'capitalize')
            .text(species);
    });
};

export default draw;