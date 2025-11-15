/* script.js */
// Particle JS
particlesJS("particles-js", {
  "particles": {
    "number": {"value":80,"density":{"enable":true,"value_area":800}},
    "color":{"value":"#ffffff"},
    "shape":{"type":"circle"},
    "opacity":{"value":0.5,"random":true},
    "size":{"value":3,"random":true},
    "line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.2,"width":1},
    "move":{"enable":true,"speed":2,"direction":"none","random":true,"straight":false,"out_mode":"out"}
  },
  "interactivity":{
    "detect_on":"canvas",
    "events":{
      "onhover":{"enable":true,"mode":"repulse"},
      "onclick":{"enable":true,"mode":"push"}
    },
    "modes":{
      "repulse":{"distance":100},
      "push":{"particles_nb":4}
    }
  },
  "retina_detect":true
});

// Dark/Light Mode Toggle
const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', function(e){
  e.preventDefault();
  document.body.classList.toggle('dark-mode');
});

// Smooth Scroll
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Tokenomics Graph (Chart.js)
const ctx = document.getElementById('tokenGraph').getContext('2d');
const tokenChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Liquidity','Community','Ecosystem','Team'],
        datasets: [{
            data: [30, 40, 20, 10],
            backgroundColor: ['#8b5cf6','#6366f1','#a78bfa','#c4b5fd'],
        }]
    },
    options: {
        responsive:true,
        plugins:{
            legend:{position:'bottom', labels:{color:'#fff'}},
        }
    }
});
