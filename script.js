// Liste des étapes (à modifier uniquement ici)
const DEFAULT_STEPS = [
  {id:1,title:'Concept global',desc:'Pitch, format (mini-série / jeu)',status:'todo'},
  {id:2,title:'Univers & ambiance',desc:'Style visuel, inspirations',status:'todo'},
  {id:3,title:'Personnages principaux',desc:'Fiches personnages et relations',status:'todo'},
  {id:4,title:'Plan narratif',desc:'Épisodes / niveaux',status:'todo'},
  {id:5,title:'Style graphique',desc:'Pixel art / rétro / palette',status:'todo'},
  {id:6,title:'Dialogues / scripts',desc:'Scènes et dialogues',status:'todo'},
  {id:7,title:'Éléments techniques',desc:'Mécaniques de jeu, assets',status:'todo'},
  {id:8,title:'Finitions',desc:'Tests, corrections, musique',status:'todo'}
];

function render() {
  const stepsList = document.getElementById('stepsList');
  const progressInner = document.getElementById('progressInner');
  const progressText = document.getElementById('progressText');
  const countsText = document.getElementById('countsText');
  const percentBig = document.getElementById('percentBig');
  const doneNum = document.getElementById('doneNum');

  stepsList.innerHTML = '';
  DEFAULT_STEPS.forEach(s => {
    const div = document.createElement('div');
    div.className = 'step';
    div.innerHTML = `
      <div class="meta">
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
      <div class="status ${clsFor(s.status)}">${labelFor(s.status)}</div>
    `;
    stepsList.appendChild(div);
  });

  const total = DEFAULT_STEPS.length;
  const done = DEFAULT_STEPS.filter(s => s.status === 'done').length;
  const perc = total ? Math.round((done / total) * 100) : 0;
  progressInner.style.width = perc + '%';
  progressText.textContent = perc + '% complété';
  countsText.textContent = done + ' / ' + total + ' étapes';
  percentBig.textContent = perc + '%';
  doneNum.textContent = done;
}

function clsFor(status){ return status==='todo'?'st-todo':status==='doing'?'st-doing':'st-done'; }
function labelFor(status){ return status==='todo'?'À faire':status==='doing'?'En cours':'Terminé'; }

// Notes et export/import restent identiques
render();
