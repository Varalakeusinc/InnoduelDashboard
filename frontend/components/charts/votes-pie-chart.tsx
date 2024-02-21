import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Idea } from '@/src/services/arena';

interface VotesPieChartProps {
  ideas: Idea[];
}

const VotesPieChart: React.FC<VotesPieChartProps> = ({ ideas }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) { // Check if ref.current is not null
      const data = ideas.map(idea => idea.votes);
      const colors = d3.scaleOrdinal(d3.schemeCategory10);
  
      const svg = d3.select(ref.current)
        .attr("width", 200)
        .attr("height", 200)
        .append("g")
        .attr("transform", "translate(100,100)");
  
      svg.selectAll('*').remove(); // Clear previous SVG elements
  
      const pieGenerator = d3.pie();
      const arcGenerator = d3.arc().innerRadius(0).outerRadius(100);
  
      svg.selectAll('path') // Use 'path' as the selector
        .data(pieGenerator(data))
        .enter()
        .append('path')
        .attr('d', d => arcGenerator(d as any))
        .attr('fill', (d, i) => colors(i.toString()))
        .attr('stroke', 'white')
        .style('stroke-width', '2px');
    }
  }, [ideas]);

  return (
    <svg ref={ref}></svg>
  );
};

export default VotesPieChart;