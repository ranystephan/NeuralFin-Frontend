import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface DiversificationChartProps {
  diversification: { [symbol: string]: number[] };
}

const DiversificationChart: React.FC<DiversificationChartProps> = ({ diversification }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [legendValue, setLegendValue] = useState<number | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const symbols = Object.keys(diversification);
      const data = symbols.map((symbol) => diversification[symbol]);

      const margin = { top: 20, right: 80, bottom: 80, left: 60 };
      const width = 550 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(chartRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const colorScale = d3.scaleSequential(d3.interpolateViridis).domain([0, 1]);

      const xScale = d3.scaleBand().domain(symbols).range([0, width]);
      const yScale = d3.scaleBand().domain(symbols).range([0, height]);

      const cells = svg
        .selectAll('rect')
        .data(data.flat())
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(symbols[Math.floor(i / symbols.length)]))
        .attr('y', (d, i) => yScale(symbols[i % symbols.length]))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .style('fill', (d) => colorScale(d))
        .on('mouseover', (event, d) => {
          const [x, y] = d3.pointer(event);
          const symbolX = symbols[Math.floor(x / xScale.bandwidth())];
          const symbolY = symbols[Math.floor(y / yScale.bandwidth())];

          setLegendValue(d);

          d3.select(tooltipRef.current)
            .style('left', `${event.pageX}px`)
            .style('top', `${event.pageY}px`)
            .style('opacity', 1)
            .html(`<strong>${symbolX} - ${symbolY}</strong><br>${d.toFixed(2)}`);
        })
        .on('mouseout', () => {
          setLegendValue(null);

          d3.select(tooltipRef.current).style('opacity', 0);
        });

      // Add color legend
      const legendWidth = 20;
      const legendHeight = height;

      const legendScale = d3.scaleLinear().domain([0, 1]).range([0, legendHeight]);

      const legend = svg
        .append('g')
        .attr('transform', `translate(${width + 40}, ${0})`);

      legend
        .append('rect')
        .attr('width', legendWidth)
        .attr('height', legendHeight)
        .style('fill', 'url(#colorGradient)');

      legend
        .append('defs')
        .append('linearGradient')
        .attr('id', 'colorGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%')
        .selectAll('stop')
        .data(d3.ticks(0, 1, 10))
        .enter()
        .append('stop')
        .attr('offset', (d) => `${legendScale(d) / legendHeight * 100}%`)
        .attr('stop-color', (d) => colorScale(d));

      const legendAxis = d3.axisRight(legendScale).ticks(5).tickSize(legendWidth).tickFormat(d3.format('.1f'));

      legend.append('g').call(legendAxis);

      // Tooltip for legend
      legend
        .append('rect')
        .attr('x', -10)
        .attr('y', 0)
        .attr('width', legendWidth + 20)
        .attr('height', legendHeight)
        .attr('fill', 'transparent')
        .on('mouseover', () => {
          if (legendValue !== null) {
            d3.select(tooltipRef.current)
              .style('left', `${d3.event.pageX}px`)
              .style('top', `${d3.event.pageY}px`)
              .style('opacity', 1)
              .html(`<strong>Legend</strong><br>${legendValue.toFixed(2)}`);
          }
        })
        .on('mouseout', () => {
          d3.select(tooltipRef.current).style('opacity', 0);
        });
    }
  }, [diversification, legendValue]);

  return (
    <>
      <svg ref={chartRef}></svg>
      <div ref={tooltipRef} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}></div>
    </>
  );
};

export default DiversificationChart;
