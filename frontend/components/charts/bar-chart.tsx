import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Idea } from "@/src/services/ideas";

interface VotesBarChartProps {
	ideas: Idea[];
}

const VotesBarChart: React.FC<VotesBarChartProps> = ({ ideas }) => {
  const ref = useRef<SVGSVGElement>(null); 

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);
      svg.selectAll("*").remove();

      const width = 300; 
      const height = 400; 
      svg.attr("width", width).attr("height", height);

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const x = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]);

      
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      x.domain(ideas.map((d) => d.idea_text));
      y.domain([0, d3.max(ideas, (d) => d.vote_count || 0) || 0]); 

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x));

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Votes");

      g.selectAll(".bar")
        .data(ideas)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.idea_text) ?? 0) 
        .attr("y", (d) => y(d.vote_count || 0))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - margin.top - margin.bottom - y(d.vote_count || 0))
        .attr("fill", (d, i) => colorScale(i.toString())); 
    }
  }, [ideas]); 

  return (
    <svg ref={ref}></svg>
  );
};

export default VotesBarChart;



