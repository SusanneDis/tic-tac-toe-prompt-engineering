
let fields = [
  null, 
  null, 
  null,
  null, 
  null, 
  null,
  null, 
  null, 
  null
]

let currentShape = 'O';

function render() {
  let html = '<table>';
  for (let row = 0; row < 3; row++) {
    html += '<tr>';
    for (let col = 0; col < 3; col++) {
      let idx = row * 3 + col;

      let symbol = '';
      if (fields[idx] === 'O') {
        symbol = generateAnimatedCircleSVG();
      } else if (fields[idx] === 'X') {
        symbol = generateAnimatedXSVG();
      }
      
      let clickHandler = '';
      if (fields[idx] === null) {
        clickHandler = `onclick="handleClick(${idx}, this)"`;
      }
      html += `<td ${clickHandler}>${symbol}</td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  document.getElementById('container').innerHTML = html;
}

function handleClick(idx, tdElem) {
  if (fields[idx] !== null) return;
  if (currentShape === 'O') {
    fields[idx] = 'O';
    tdElem.innerHTML = generateAnimatedCircleSVG();
    currentShape = 'X';
  } else {
    fields[idx] = 'X';
    tdElem.innerHTML = generateAnimatedXSVG();
    currentShape = 'O';
  }
  tdElem.onclick = null;
  const win = checkGameOver();
  if (win) {
    // Gewinnlinie zeitversetzt anzeigen (z.B. 700ms)
    setTimeout(() => drawWinLine(win), 700);
    // Optional: Felder deaktivieren
    disableAllClicks();
  }
}

function checkGameOver() {
  // Alle Gewinnkombinationen (jeweils 3 Indizes)
  const wins = [
    [0,1,2], [3,4,5], [6,7,8], // Reihen
    [0,3,6], [1,4,7], [2,5,8], // Spalten
    [0,4,8], [2,4,6]           // Diagonalen
  ];
  for (const combo of wins) {
    const [a, b, c] = combo;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return combo; // Rückgabe der Gewinn-Kombination
    }
  }
  return null;
}

function drawWinLine(combo) {
  // Ermittle Start- und Endpunkt der Linie anhand der Zellenpositionen
  const container = document.getElementById('container');
  const table = container.querySelector('table');
  const tds = table.querySelectorAll('td');
  const getCenter = idx => {
    const rect = tds[idx].getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return {
      x: rect.left - containerRect.left + rect.width/2,
      y: rect.top - containerRect.top + rect.height/2
    };
  };
  const start = getCenter(combo[0]);
  const end = getCenter(combo[2]);
  // SVG-Overlay erstellen
  let svg = document.getElementById('win-line');
  if (svg) svg.remove();
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'win-line');
  svg.style.position = 'absolute';
  svg.style.left = 0;
  svg.style.top = 0;
  svg.style.pointerEvents = 'none';
  svg.setAttribute('width', container.offsetWidth);
  svg.setAttribute('height', container.offsetHeight);
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', start.x);
  line.setAttribute('y1', start.y);
  line.setAttribute('x2', end.x);
  line.setAttribute('y2', end.y);
  line.setAttribute('stroke', '#fff');
  line.setAttribute('stroke-width', '10');
  line.setAttribute('stroke-linecap', 'round');
  svg.appendChild(line);
  // SVG ins DOM einfügen
  container.style.position = 'relative';
  container.appendChild(svg);
}

function disableAllClicks() {
  const tds = document.querySelectorAll('td');
  tds.forEach(td => td.onclick = null);
}
function generateAnimatedXSVG() {
  return `
<svg width="70" height="70" viewBox="0 0 70 70">
  <line x1="15" y1="15" x2="55" y2="55" stroke="#fec000" stroke-width="8" stroke-linecap="round"
    stroke-dasharray="56.57" stroke-dashoffset="56.57">
    <animate attributeName="stroke-dashoffset" from="56.57" to="0" dur="0.5s" fill="freeze" />
  </line>
  <line x1="55" y1="15" x2="15" y2="55" stroke="#fec000" stroke-width="8" stroke-linecap="round"
    stroke-dasharray="56.57" stroke-dashoffset="56.57">
    <animate attributeName="stroke-dashoffset" from="56.57" to="0" dur="0.5s" begin="0.5s" fill="freeze" />
  </line>
</svg>
  `;
}

function generateAnimatedCircleSVG() {
  return `
<svg width="70" height="70" viewBox="0 0 70 70">
  <circle
    cx="35"
    cy="35"
    r="30"
    fill="none"
    stroke="rgb(36, 180, 237)"
    stroke-width="8"
    stroke-dasharray="${2 * Math.PI * 30}"
    stroke-dashoffset="${2 * Math.PI * 30}"
  >
    <animate
      attributeName="stroke-dashoffset"
      from="${2 * Math.PI * 30}"
      to="0"
      dur="1s"
      fill="freeze"
    />
  </circle>
</svg>
  `;
}

function resetGame() {
  for (let i = 0; i < fields.length; i++) {
    fields[i] = null;
  }
  currentShape = 'O';
  // Entferne Gewinnlinie, falls vorhanden
  const winLine = document.getElementById('win-line');
  if (winLine) winLine.remove();
  render();
}