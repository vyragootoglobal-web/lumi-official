
// app.js - handles chart, network, explorers, modals, and simulated realtime data

// Chart.js setup
const chartCtx = document.getElementById('priceChart').getContext('2d');
const priceData = { labels: [], datasets: [{ label: 'LUMI Price', data: [], borderColor: '#FFD700', backgroundColor: 'rgba(255,215,0,0.12)', fill: true, tension:0.3, pointRadius:1 }] };
const priceChart = new Chart(chartCtx, {
  type:'line', data: priceData,
  options: { responsive:true, plugins:{legend:{display:false}}, scales:{x:{ticks:{color:'#ddd'}}, y:{ticks:{color:'#ddd'}}}
});

let currentPrice = 2.45;
function pushPrice(p){
  const t = new Date().toLocaleTimeString();
  priceData.labels.push(t);
  priceData.datasets[0].data.push(p);
  if(priceData.labels.length>60){ priceData.labels.shift(); priceData.datasets[0].data.shift() }
  priceChart.update();
}

for(let i=0;i<20;i++){ currentPrice = +(currentPrice*(1+(Math.random()*0.02-0.01))).toFixed(4); pushPrice(currentPrice); }

function tickPrice(){
  currentPrice = +(currentPrice*(1+(Math.random()*0.04-0.02))).toFixed(4);
  document.getElementById('meta-price').innerText = '$' + currentPrice;
  document.getElementById('stat-price').innerText = '$' + currentPrice;
  document.getElementById('stat-holders').innerText = (5300 + Math.floor(Math.random()*80)) + 'K';
  document.getElementById('stat-tvl').innerText = '$' + (18 + Math.random()*1.4).toFixed(2) + 'M';
  document.getElementById('meta-holders').innerText = document.getElementById('stat-holders').innerText;
  document.getElementById('meta-tvl').innerText = document.getElementById('stat-tvl').innerText;
  pushPrice(currentPrice);
}
setInterval(tickPrice, 3000);

// buttons
document.getElementById('simSpike').addEventListener('click', ()=> { currentPrice = +(currentPrice * 1.12).toFixed(4); pushPrice(currentPrice); });
document.getElementById('downloadCSV').addEventListener('click', ()=> {
  let csv = 'time,price\n';
  for(let i=0;i<priceData.labels.length;i++){ csv += priceData.labels[i] + ',' + priceData.datasets[0].data[i] + '\n'; }
  const blob = new Blob([csv], {type:'text/csv'}); const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'lumi_price_snapshot.csv'; a.click(); URL.revokeObjectURL(url);
});

// Explorer
document.getElementById('exploreBtn').addEventListener('click', runExplorer);
function runExplorer(){
  const q = document.getElementById('explorerInput').value.trim();
  const out = document.getElementById('explorerResult');
  if(!q) { out.innerText = 'Masukkan address atau tx hash untuk mencoba (simulasi)'; return; }
  if(q.startsWith('0x')){
    out.innerHTML = '<strong>Address</strong>: ' + q + '<br>Balance: ' + (Math.floor(Math.random()*10000)/100) + ' LUMI <br>Tx Count: ' + Math.floor(Math.random()*250);
  } else {
    out.innerHTML = '<strong>Tx</strong>: ' + q + '<br>Status: Confirmed (simulated)';
  }
}

// Modals
function openModal(id){ document.getElementById(id).style.display = 'flex'; }
function closeModal(id){ document.getElementById(id).style.display = 'none'; }
document.querySelectorAll('[data-close]').forEach(btn=> btn.addEventListener('click', ()=> closeModal(btn.getAttribute('data-close')) ));
document.getElementById('daoBtn').addEventListener('click', ()=> openModal('daoModal'));
document.getElementById('stakeBtn').addEventListener('click', ()=> openModal('stakeModal'));
document.getElementById('doStake').addEventListener('click', ()=> {
  const amt = document.getElementById('stakeAmt').value || '0'; document.getElementById('stakeLog').innerText = 'Staked ' + amt + ' LUMI (simulated). Rewards: ' + (isNaN(+amt)?0:((amt*0.05).toFixed(2))) + ' LUMI (est)';
});

// Network visualizer
const visualizer = document.getElementById('network-visualizer');
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');
let nodes = [];
const NUM_NODES = 25;

function initNetwork(){
  canvas.width = visualizer.clientWidth;
  canvas.height = visualizer.clientHeight;
  Array.from(visualizer.querySelectorAll('.network-node')).forEach(n=>n.remove());
  nodes = [];
  for(let i=0;i<NUM_NODES;i++){
    const el = document.createElement('div');
    el.className = 'network-node';
    el.innerText = (i===0? 'C' : (i%5===0? 'V' : i%3===0? 'D' : ''));
    visualizer.appendChild(el);
    const node = { el, x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.6, id:i, type: i===0? 'CORE' : (i%5===0? 'Validator' : (i%3===0? 'DEX' : 'Wallet')) };
    nodes.push(node);
    el.addEventListener('mouseenter', (ev)=> showNodeTooltip(node, ev));
    el.addEventListener('mousemove', (ev)=> moveNodeTooltip(ev));
    el.addEventListener('mouseleave', hideNodeTooltip);
    el.addEventListener('click', ()=> { if(node.type==='CORE') alert('CORE NODE: Lumi Core connected.'); else alert(node.type + ' node ID: ' + node.id); });
  }
}
const nodeTooltip = document.getElementById('nodeTooltip');
function showNodeTooltip(node, ev){
  nodeTooltip.style.display = 'block';
  nodeTooltip.innerHTML = '<strong>' + node.type + '</strong><br>ID: ' + node.id + '<br>Price: $' + currentPrice.toFixed(4);
  node.el.classList.add('active');
}
function moveNodeTooltip(ev){
  const r = visualizer.getBoundingClientRect();
  nodeTooltip.style.left = (ev.clientX - r.left) + 'px';
  nodeTooltip.style.top = (ev.clientY - r.top) + 'px';
}
function hideNodeTooltip(ev){ nodeTooltip.style.display = 'none'; ev.target.classList.remove('active'); }

function animateNetwork(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(const n of nodes){
    n.x += n.vx; n.y += n.vy;
    if(n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if(n.y < 0 || n.y > canvas.height) n.vy *= -1;
    n.el.style.left = n.x + 'px';
    n.el.style.top = n.y + 'px';
  }
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const a = nodes[i], b = nodes[j];
      const dx = a.x-b.x, dy = a.y-b.y, d = Math.sqrt(dx*dx + dy*dy);
      if(d < 150){
        const alpha = 1 - d/150;
        ctx.strokeStyle = 'rgba(255,215,0,' + (0.12 * alpha) + ')';
        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateNetwork);
}
window.addEventListener('resize', ()=> { if(visualizer){ canvas.width = visualizer.clientWidth; canvas.height = visualizer.clientHeight; } });
initNetwork(); animateNetwork();

// open whitepaper raw link
document.getElementById('whitepaperLink').addEventListener('click', function(e){ e.preventDefault(); window.open('https://raw.githubusercontent.com/vyragootoglobal-web/lumi-official/main/whitepaper.md','_blank'); });

// Buy button placeholders (open Uniswap with placeholder)
document.getElementById('buyBtn').href = 'https://app.uniswap.org/swap?outputCurrency=0xLUMI';
document.getElementById('buyBtn2').href = 'https://app.uniswap.org/swap?outputCurrency=0xLUMI';
