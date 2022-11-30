const linkDataset = ("Men's_mile.csv");

const WIDTH = 1200;
const HEIGHT = 600;
const MARGIN = {
    top: 70,
    bottom: 70,
    right: 130,
    left: 130,
};

const WIDTH2 = 800;
const HEIGHT2 = 1260;
const MARGIN2 = {
    top: 80,
    bottom: 20,
    right: 20,
    left: 20,
};

const WIDTH3 = 500;
const HEIGHT3 = 600;
const MARGIN3 = {
    top: 80,
    bottom: 20,
    right: 20,
    left: 20,
};

const HEIGHTVIS = HEIGHT - MARGIN.top - MARGIN.bottom;
const WIDTHVIS = WIDTH - MARGIN.right - MARGIN.left;
const HEIGHTVIS2 = HEIGHT2 - MARGIN2.top - MARGIN2.bottom;
const WIDTHVIS2 = WIDTH2 - MARGIN2.right - MARGIN2.left;
const HEIGHTVIS3 = HEIGHT3 - MARGIN3.top - MARGIN3.bottom;
const WIDTHVIS3 = WIDTH3 - MARGIN3.right - MARGIN3.left;

function parseData(d) {
    const data = {
        Rank: +d.Rank,
        Mark: d.Mark,
        Competitor: d.Competitor,
        DOB: d.DOB,
        Nat: d.Nat,
        Pos: d.Pos,
        Venue:  d.Venue,
        Date: d.Date,
        Score: +d.Score,
        Seconds: +d.Seconds,
    }
    return data
}

function secondsToMinutes(t) {
  const t_rounded = Math.floor(t * 100) / 100;
  const minutes = Math.floor(t_rounded / 60);
  const seconds = t_rounded - minutes * 60;
  return (seconds >= 10) ?  minutes + ":" + seconds.toFixed(2) : minutes + ":0" + seconds.toFixed(2);
};

function createVis(data) {
    const N = data.length;
    var currentData = data;
    const fastestTime = d3.min(data, (d) => d.Seconds);
    const slowestTime = d3.max(data, (d) => d.Seconds);

    const SVG = d3.select("#vis-container")
        .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT);

    const contenedor = SVG
        .append("g")
        .attr("transform", `translate(${MARGIN.left} ${MARGIN.top})`);

    const escalaX = d3
        .scaleLinear()
        .domain([Math.floor(fastestTime), Math.ceil(slowestTime)])
        .range([0, WIDTHVIS]);
        
    const escalaY = d3
        .scaleLinear()
        .domain([0, N])
        .range([HEIGHTVIS, 0]);

    const ejeX = d3.axisBottom(escalaX);
    const ejeY = d3.axisLeft(escalaY);

    SVG.append("g")
        .attr("transform", `translate(${MARGIN.left}, ${HEIGHTVIS + MARGIN.top})`)
        .attr("id", "contenedor-eje-x")
        .call(ejeX);

    SVG.append("g")
        .attr("transform", `translate(${MARGIN.left}, ${MARGIN.top})`)
        .attr("id", "contenedor-eje-y")
        .call(ejeY)
        .selectAll("line")
        .attr("x1", WIDTHVIS)
        .attr("stroke-dasharray", "5")
        .attr("opacity", 0.5);

    var lineas = contenedor.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(d => escalaX(d.Seconds))
        .y((_, i) => escalaY(i+1)));

    SVG
      .append("g")
      .append("text")
      .attr("class", "title-label")
      .attr("x", WIDTH / 2)
      .attr("y", MARGIN.top - 20)
      .style("text-anchor", "middle")
      .text("Frecuencia acumalada de mejores registros en la milla")
      .style("font-size", "30px");

    SVG
      .append("g")
      .append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("y", MARGIN.left - 80)
      .attr("z-index", 1000)
      .attr("x", -HEIGHT / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Cantidad de atletas")
      .style("font-size", "25px");

    SVG
      .append("g")
      .append("text")
      .attr("class", "x-label")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT - 15)
      .style("text-anchor", "middle")
      .text("Tiempo (segundos)")
      .style("font-size", "25px");

// ---------------------------------------------------------------------------------------------

    const atletasEnFila = 30;

    const escalaVis2X = d3
      .scaleLinear()
      .domain([0, atletasEnFila])
      .range([0, WIDTHVIS2]);

    const escalaVis2Y = d3
    .scaleLinear()
    .domain([0, Math.ceil(N / atletasEnFila)])
    .range([0, HEIGHTVIS2]);

    const SVG2 = d3.select("#vis-container2")
      .append("svg")
      .attr("width", WIDTH2)
      .attr("height", HEIGHT2);

      const coloresDecadas = ["red", "orange", "blue", "black", "grey", "purple", "pink", "brown", "green", "yellow"];

    const contenedorLeyenda = SVG2.append("g").attr("transform", `translate(${MARGIN2.left} ${MARGIN2.top/2})`);
    contenedorLeyenda.append("text").attr("x", WIDTHVIS2/8 * 0).attr("y", 0).text("1950:").style("font-size", "15px");
    contenedorLeyenda.append("rect").attr("x", WIDTHVIS2/8 * 0 + 40).attr("y", -11).attr("width", 20).attr("height", 15).attr("fill", coloresDecadas[5]);
    contenedorLeyenda.append("text").attr("x", WIDTHVIS2/8 * 1).attr("y", 0).text("1960:").style("font-size", "15px");
    contenedorLeyenda.append("rect").attr("x", WIDTHVIS2/8 * 1 + 40).attr("y", -11).attr("width", 20).attr("height", 15).attr("fill", coloresDecadas[6]);
    contenedorLeyenda.append("text").attr("x", WIDTHVIS2/8 * 2).attr("y", 0).text("1970:").style("font-size", "15px");
    contenedorLeyenda.append("rect").attr("x", WIDTHVIS2/8 * 2 + 40).attr("y", -11).attr("width", 20).attr("height", 15).attr("fill", coloresDecadas[7]);
    contenedorLeyenda.append("text").attr("x", WIDTHVIS2/8 * 3).attr("y", 0).text("1980:").style("font-size", "15px");
    contenedorLeyenda.append("rect").attr("x", WIDTHVIS2/8 * 3 + 40).attr("y", -11).attr("width", 20).attr("height", 15).attr("fill", coloresDecadas[8]);
    contenedorLeyenda.append("text").attr("x", WIDTHVIS2/8 * 4).attr("y", 0).text("1990:").style("font-size", "15px");
    contenedorLeyenda.append("rect").attr("x", WIDTHVIS2/8 * 4 + 40).attr("y", -11).attr("width", 20).attr("height", 15).attr("fill", coloresDecadas[9]);
    contenedorLeyenda.append("text").attr("x", WIDTHVIS2/8 * 5).attr("y", 0).text("2000:").style("font-size", "15px");
    contenedorLeyenda.append("rect").attr("x", WIDTHVIS2/8 * 5 + 40).attr("y", -11).attr("width", 20).attr("height", 15).attr("fill", coloresDecadas[0]);
    contenedorLeyenda.append("text").attr("x", WIDTHVIS2/8 * 6).attr("y", 0).text("2010:").style("font-size", "15px");
    contenedorLeyenda.append("rect").attr("x", WIDTHVIS2/8 * 6 + 40).attr("y", -11).attr("width", 20).attr("height", 15).attr("fill", coloresDecadas[1]);
    contenedorLeyenda.append("text").attr("x", WIDTHVIS2/8 * 7).attr("y", 0).text("2020:").style("font-size", "15px");
    contenedorLeyenda.append("rect").attr("x", WIDTHVIS2/8 * 7 + 40).attr("y", -11).attr("width", 20).attr("height", 15).attr("fill", coloresDecadas[2]);

    const contenedor2 = SVG2.append("g")
      .attr("transform", `translate(${MARGIN2.left} ${MARGIN2.top})`);

    const SVG3 = d3.select("#vis-container2")
      .append("svg")
      .attr("width", WIDTH3)
      .attr("height", HEIGHT3);
    
    const contenedorInfo = SVG3
      .append("g")
      .attr("transform", `translate(${MARGIN3.left} ${MARGIN3.top})`);
    
    contenedorInfo.append("rect")
      .attr("width", WIDTHVIS3)
      .attr("height", HEIGHTVIS3)
      .attr("fill", "white")
      .attr("stroke", "black");

    let Name = contenedorInfo.append("text")
      .attr("x", 10)
      .attr("y", HEIGHTVIS3/7)
      .text("Nombre:")
      .style("font-size", "20px");

    let Country = contenedorInfo.append("text")
      .attr("x", 10)
      .attr("y", HEIGHTVIS3/7 * 2)
      .text("País:")
      .style("font-size", "20px");

    let DOB = contenedorInfo.append("text")
      .attr("x", 10)
      .attr("y", HEIGHTVIS3/7 * 3)
      .text("Fecha de nacimiento:")
      .style("font-size", "20px");

    let Rank = contenedorInfo.append("text")
      .attr("x", 10)
      .attr("y", HEIGHTVIS3/7 * 4)
      .text("Ranking:")
      .style("font-size", "20px");

    let Mark = contenedorInfo.append("text")
      .attr("x", 10)
      .attr("y", HEIGHTVIS3/7 * 5)
      .text("Marca:")
      .style("font-size", "20px");

    let Date = contenedorInfo.append("text")
      .attr("x", 10)
      .attr("y", HEIGHTVIS3/7 * 6)
      .text("Fecha de competencia:")
      .style("font-size", "20px");

    function displayData(d){
      console.log(d.Name);
      Name.text("Nombre: " + d.Competitor);
      Country.text("País: " + d.Nat);
      DOB.text("Fecha de nacimiento: " + d.DOB);
      Rank.text("Ranking: " + d.Rank);
      Mark.text("Marca: " + d.Mark);
      Date.text("Fecha de competencia: " + d.Date);
    }

    function joinDeDatosInicial() {
      currentData = data;
      contenedor2.selectAll("g").remove();
      contenedor2.selectAll("g")
      .data(data)
      .join("g")
      .append("image")
      .attr("xlink:href", d => 'https://media.aws.iaaf.org/Flags/' + d.Nat + '.gif')
      .attr("x", (_, i) => escalaVis2X(i % atletasEnFila))
      .attr("y", (_, i) => escalaVis2Y(Math.floor(i / atletasEnFila)))
      .attr("width", 19)
      .attr("height", 13)
      .attr("class", "atleta")
      .on("click", (e, d) => {displayData(d)});
    }

    function joinDeDatos(e) {
      var x0 = escalaX.invert(d3.pointer(e)[0]);
      currentData = data.filter(d => d.Seconds <= x0);
      contenedor2.selectAll("g").remove();
      contenedor2.selectAll("g")
      .data(currentData)
      .join("g")
      .append("image")
      .attr("xlink:href", d => 'https://media.aws.iaaf.org/Flags/' + d.Nat + '.gif')
      .attr("x", (_, i) => escalaVis2X(i % atletasEnFila))
      .attr("y", (_, i) => escalaVis2Y(Math.floor(i / atletasEnFila)))
      .attr("width", 19)
      .attr("height", 13)
      .attr("class", "atleta")
      .on("click", (e, d) => {displayData(d)});
    }

    function joinByCountry() {
      // let sorted_data = currentData.slice().sort((a, b) => d3.ascending(a.Nat, b.Nat));
      let sorted_data = [].concat.apply([], Array.from(d3.group(currentData, d => d.Nat).values()).sort((a, b) => d3.descending(a.length, b.length)));
      contenedor2.selectAll("g").remove();
      contenedor2.selectAll("g")
      .data(sorted_data)
      .join("g")
      .append("image")
      .attr("xlink:href", d => 'https://media.aws.iaaf.org/Flags/' + d.Nat + '.gif')
      .attr("x", (_, i) => escalaVis2X(i % atletasEnFila))
      .attr("y", (_, i) => escalaVis2Y(Math.floor(i / atletasEnFila)))
      .attr("width", 19)
      .attr("height", 13)
      .attr("class", "atleta")
      .on("click", (e, d) => {displayData(d)});
    }

    function joinByDecade() {
      let sorted_data = currentData.slice().sort((a, b) => d3.ascending(+a.Date.slice(-4), +b.Date.slice(-4)));
      contenedor2.selectAll("g").remove();
      contenedor2.selectAll("g")
      .data(sorted_data)
      .join("g")
      .append("rect")
      .attr("x", (_, i) => escalaVis2X(i % atletasEnFila))
      .attr("y", (_, i) => escalaVis2Y(Math.floor(i / atletasEnFila)))
      .attr("width", 19)
      .attr("height", 13)
      .attr("fill", d => coloresDecadas[+d.Date.slice(-2, -1)])
      .attr("class", "atleta")
      .on("click", (e, d) => {displayData(d)});
    }

    joinDeDatosInicial();

    const resetButton = document.getElementById("reset");
    const countryButton = document.getElementById("country");
    const decadaButton = document.getElementById("decada");
    resetButton.addEventListener("click", joinDeDatosInicial);
    countryButton.addEventListener("click", joinByCountry);
    decadaButton.addEventListener("click", joinByDecade);

// ---------------------------------------------------------------------------------------------

    var mousemove = function (e) {
      var x0 = escalaX.invert(d3.pointer(e)[0]);
      var i = d3.bisector(d => d.Seconds).right(data, x0);
  
      focus.attr(
        "transform",
        "translate(" + escalaX(x0) + "," + escalaY(i) + ")"
      );
      focus.select("g").select(".tag_time").text("Tiempo: " + secondsToMinutes(x0));
      focus.select("g").select(".tag_cantidad").text("Atletas: " + i);
      focusLine
        .attr("x1", escalaX(x0))
        .attr("x2", escalaX(x0));
    };

    const zoomHandler = (evento) => {
      const trans = evento.transform;
  
      const escalaY2 = trans.rescaleY(escalaY);
  
      SVG.select("#contenedor-eje-y")
      .call(ejeY.scale(escalaY2))
      .selectAll("line")
      .attr("x1", WIDTHVIS)
      .attr("stroke-dasharray", "5")
      .attr("opacity", 0.5);
  
      lineas.attr("d", d3.line()
        .x(d => escalaX(d.Seconds))
        .y((_, i) => escalaY2(i+1)));
    };
  
    const zoom = d3
      .zoom()
      .extent([
        [0, 0],
        [WIDTH, HEIGHT],
      ])
      .scaleExtent([1, 20])
      .translateExtent([
        [0, 0],
        [WIDTH, HEIGHT],
      ])
      .on("zoom", zoomHandler);
  
    SVG.call(zoom);

    check_focus = document.getElementById("focus");

    if (!check_focus) {
      var focus = contenedor
        .append("g")
        .attr("class", "focus")
        .attr("id", "focus")
        .style("display", "none");
      focus.append("circle").attr("r", 4.5);
      focus
        .append("g")
        .append("rect")
        .attr("x", 9)
        .attr("y", 0)
        .attr("height", "50px")
        .attr("width", "120px")
        .attr("fill", "transparent")
        .attr("stroke", "#000000")
        .attr("dy", ".35em");
  
      focus
        .select("g")
        .append("text")
        .attr("class", "tag_time")
        .attr("dy", 20)
        .attr("x", 15);
      focus
        .select("g")
        .append("text")
        .attr("class", "tag_cantidad")
        .attr("dy", 40)
        .attr("x", 15);
  
      var focusLine = contenedor
        .append("line")
        .attr("class", "focusLine")
        .attr("stroke", "black")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", HEIGHTVIS)
        .style("display", "none");
  
      contenedor
        .append("rect")
        .attr("class", "overlay")
        .attr("width", WIDTHVIS)
        .attr("height", HEIGHTVIS)
        .on("mouseover", function () {
          focus.style("display", null);
          focusLine.style("display", null);
        })
        .on("mouseout", function () {
          focus.style("display", "none");
          focusLine.style("display", "none");
        })
        .on("mousemove", mousemove)
        .on("click", joinDeDatos);
    } else {
      focus = contenedor.select(".focus");
      focusLine = contenedor.select(".focusLine");
      contenedor.select(".overlay").remove();
  
      contenedor
        .append("rect")
        .attr("class", "overlay")
        .attr("width", WIDTHVIS)
        .attr("height", HEIGHTVIS)
        .on("mouseover", function () {
          focus.style("display", null);
          focusLine.style("display", null);
        })
        .on("mouseout", function () {
          focus.style("display", "none");
          focusLine.style("display", "none");
        })
        .on("mousemove", mousemove)
        .on("click", joinDeDatos);
    }

// ------------------------------------------------------------------------------------------------------------------

}

d3.csv(linkDataset, parseData).then(data => {
    createVis(data);
}).catch(error => {
    console.log(error);
});