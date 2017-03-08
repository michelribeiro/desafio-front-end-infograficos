google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ["Element", "Density", { role: "style" } ],
            ["Governo", 75, "#b22d30"],
            ["Carnaval", 50, "color:#000000;"],
            ["Esporte", 45, "color:#000000"],
            ["Férias", 30, "color:#000000"],
            ["Outros", 25, "color:#000000"]
        ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
    { calc: "stringify",
    sourceColumn: 1,
    type: "string",
    role: "annotation" },
    2]);

    var options = {
        //title: "Density of Precious Metals, in g/cm^3",
        width: 550,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("chart_div"));
    chart.draw(view, options);
}