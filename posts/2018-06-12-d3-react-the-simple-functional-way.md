## D3 & React: the simple, functional way


Avoid [functional fixedness](https://en.wikipedia.org/wiki/Functional_fixedness)! If you're going to use D3, use it for what it does well: math and geometry calculations. For the other modules, you can probably find much nicer alternatives in the JS ecosystem, some of which may already be dependencies in your project. Why learn another date API? Just use your project's moment.js or date-fns.

Already using a view library like React? You probably don't need D3's DOM manipulation API.

Here's the scoop.

D3 and React were created around the same time in 2011. Both projects had the early insight to design a declarative API, inspired by functional programming. This was still a new idea at the time for JavaScript. Unlike React, D3 went the route of trying to respect DOM standards and conventions of the time. You'll find a very jQuery-esque API based on W3C selector strings.

Let's see how you'd traditionally build this bar chart with D3:

![bar chart](https://dpren.github.io/posts/bar-chart.png "bar chart")

```javascript
const myData = [
  {name: "A", value: 0.08167},
  {name: "B", value: 0.01492},
  {name: "C", value: 0.02782},
  {name: "D", value: 0.04253},
  {name: "E", value: 0.12702},
  {name: "F", value: 0.02288},
  {name: "G", value: 0.02015},
  {name: "H", value: 0.06094},
  {name: "I", value: 0.06966},
  {name: "J", value: 0.00153},
  {name: "K", value: 0.00772},
  {name: "L", value: 0.04025},
  {name: "M", value: 0.02406},
  {name: "N", value: 0.06749},
  {name: "O", value: 0.07507},
  {name: "P", value: 0.01929},
  {name: "Q", value: 0.00095},
  {name: "R", value: 0.05987},
  {name: "S", value: 0.06327},
  {name: "T", value: 0.09056},
  {name: "U", value: 0.02758},
  {name: "V", value: 0.00978},
  {name: "W", value: 0.0236},
  {name: "X", value: 0.0015},
  {name: "Y", value: 0.01974},
  {name: "Z", value: 0.00074}
];
```

```javascript
var width = 800;
var height = 400;

// not using d3.scaleBand for the sake of simplicity
var barWidth = width / myData.length;
var maxValue = Math.max(...myData.map(d => d.value));
var yScale = d3.scaleLinear()
  .domain([0, maxValue])
  .range([height, 0]);

var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var bars = svg.selectAll(".bar")
  .data(myData)
  .enter()
  .append("g")
    .attr("transform", 
          function(d, i) { return `translate(${i * barWidth}, 0)`; });

bars.append("rect")
  .attr("y", function(d) { return yScale(d.value); })
  .attr("height", function(d) { return height - yScale(d.value); })
  .attr("width", barWidth - 3)

bars.append("text")
  .attr("x", barWidth / 2)
  .attr("y", function(d) { return yScale(d.value) - 10; })
  .attr("text-anchor", "middle")
  .text(function(d) { return d.name });
```

[CodePen [&#x2197;]](https://codepen.io/anon/pen/qKPVrg?editors=0010)

This API is unwieldy because, while it's declarative in spirit, you're still commanding this opaque chain of side-effects, saying "Select this, append that, add this attribute, etc." What does `.data()` or `.enter()` do?  What sort of value do any of these methods return? How do the callbacks in `.attr()` get magically mapped to the data? I still find myself having to sift through loads of documentation and examples whenever I use D3.


Let's try this with React:


```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear } from 'd3-scale';

const maxValue = data => Math.max(...data.map(d => d.value));

const BarChart = ({data, width, height}) => {
  const barWidth = width / data.length;
  const yScale = scaleLinear()
    .domain([0, maxValue(data)])
    .range([height, 0]);

  return (
    <svg width={width} height={height}>
      {
        data.map(({name, value}, i) => (
          <g key={i} transform={`translate(${i * barWidth}, 0)`}>
            <rect 
              y={yScale(value)} 
              height={height - yScale(value)} 
              width={barWidth - 3}
            />
            <text 
              x={barWidth / 2} 
              y={yScale(value) - 10} 
              textAnchor="middle"
            >{name}</text>
          </g>
        ))
      }      
    </svg>
  );
};

ReactDOM.render(
  <BarChart data={myData} width={800} height={400}/>, 
  document.getElementById('root')
);
```

[CodePen [&#x2197;]](https://codepen.io/anon/pen/xzXrXm?editors=1010)

Now you can literally see the DOM structure. There's just one map callback instead of 5. The flow of data is clear because it all just breaks down into a composite of pure functions and values. The only impure function is `render`, and we can just use common React patterns to deal with updates.

Hope this helps.
