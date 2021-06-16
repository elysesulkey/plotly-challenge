// Function for change on dropdown menu
function optionChanged(selectedID){

    // Check if value selected in dropdown
    //console.log(selectedID);
 
    // Read the json file for the data
    d3.json("data/samples.json").then((data) => {
 
    //console.log(data);
 
    // Clear dropdown
    d3.select("#selDataset").html("");   
    
    // Select metadata array and append item ID, adds ID to dropdown
    data.metadata.forEach(item =>
         {
        //console.log(item.id);
         d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
         });
    // Selected value passed
    d3.select("#selDataset").node().value = selectedID;
    
    // Filter Metadata for selected ID from dropdown
    const idMetadata = data.metadata.filter(item=> (item.id == selectedID));
       // {
       //    console.log("------------------------")
       //    console.log(item);
       //    console.log(item.id);
          
       // });
    // Check the metadata loaded for selected ID
    //console.log(idMetadata);
    
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
       });
 
    // BAR CHART
 
    // Filter sample array data for the selected ID
    const idSample = data.samples.filter(item => parseInt(item.id) == selectedID);
    
    // // Check values
    // console.log(typeof parseInt(item.id));
    // console.log(idSample[0].sample_values);  
    // console.log(idSample[0].otu_ids);  
    // console.log(idSample[0].otu_labels);  

    var sample_value = idSample[0].sample_values.slice(0,10);
    sample_value= sample_value.reverse();
    var otu_ID = idSample[0].otu_ids.slice(0,10);
    otu_ID = otu_ID.reverse();
    var otu_label = idSample[0].otu_labels
    otu_label = otu_label.reverse();
 
    // // Check values
    //  console.log(sampleValue);
    //  console.log(otuID);
    //  console.log(otuLabels);

    // Y axis of bar chart
    const yAxis = otu_ID.map(item => 'OTU' + " " + item);
    
    // Define the layout and trace object, edit color and orientation
       const trace = {
       y: yAxis,
       x: sample_value,
       type: 'bar',
       orientation: "h",
       text:  otu_label,
       marker: {
          color: "#9370db",
          line: {
             width: 3
         }
        }
       },
       layout = {
       title: 'Top 10 Operational Taxonomic Units (OTU)/Individual',
       xaxis: {title: 'Number of Samples'},
       yaxis: {title: 'OTU ID'}
       };
 
       // Plot using Plotly
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
       
 // BUBBLE CHART
 
 // Remove Sample value and otuID from individual
 var sample_value1 =idSample[0].sample_values;
 var otu_ID1= idSample[0].otu_ids;
 
 // Define the layout and trace object, edit color and orientation
 const trace1 = {
    x: otu_ID1,
    y: sample_value1,
    mode: 'markers',
    marker: {
        size: sample_value1,
        color: otu_ID1,
        colorscale: 'Picnic'
    }
  },
 
  layout1 = {
    title: '<b>Bubble Chart For Each Sample</b>',
    xaxis: {title: 'OTU ID'},
    yaxis: {title: 'Number of Samples'},
    showlegend: false,
    height: 800,
    width: 1800
    };
    
 // Plot using Plotly
 Plotly.newPlot('bubble', [trace1], layout1);
 
 // GAUGE CHART

 // Gauge Chart to plot weekly washing frequency 
 const guageDisplay = d3.select("#gauge");
 guageDisplay.html(""); 
 const washFreq = idMetadata[0].wfreq;
 
 const guageData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washFreq,
      title: { text: "<b>Belly Button Washing Frequency </b><br> (Scrubs/Week)" },
      type: "indicator",
      mode: "gauge+number",     
       gauge: {
       axis: { range: [0,9] },
       bar: { color: "#e6e6fa" },
       steps: [
          { range: [0, 1], color: "#d8bfd8" },
          { range: [1, 2], color: "#dda0dd" },
          { range: [2, 3], color: "#da70d6" },
          { range: [3, 4], color: "#ee82ee" },
          { range: [4, 5], color: "#ff00ff" },
          { range: [5, 6], color: "#ba55d3" },
          { range: [6, 7], color: "#9932cc" },
          { range: [7, 8], color: "#9400d3" },
          { range: [8, 9], color: "#8a2be2" }
                
        ],
       threshold: {
          value: washFreq
        }
      }
    }
  ]; 
  const gaugeLayout = {  width: 600, 
                   height: 400, 
                   margin: { t: 0, b: 0 }, 
                    };
 
 // Plot using Plotly
  Plotly.newPlot('gauge', guageData, gaugeLayout); 
 
 });
 }
 
 // Initial test starts at ID 940
 optionChanged(940);
 
 // Event on change takes the value and calls the function during dropdown selection
 d3.select("#selDataset").on('change',() => {
 optionChanged(d3.event.target.value);
 
 });