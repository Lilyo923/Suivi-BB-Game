const DEFAULT_STEPS = [
  {id:1,title:'Concept global',desc:'Pitch, format',status:'todo'},
  {id:2,title:'Univers & ambiance',desc:'Style visuel, inspirations',status:'todo'},
  {id:3,title:'Personnages',desc:'Fiches et relations',status:'todo'},
  {id:4,title:'Plan narratif',desc:'Épisodes / niveaux',status:'todo'},
  {id:5,title:'Style graphique',desc:'Pixel art, rétro',status:'todo'},
  {id:6,title:'Dialogues / scripts',desc:'Texte et scènes',status:'todo'},
  {id:7,title:'Éléments techniques',desc:'Gameplay, assets',status:'todo'},
  {id:8,title:'Finitions',desc:'Tests, corrections',status:'todo'}
];

const STORAGE_KEY = "bradbitt_tracker_v2";
let state = loadState();

function loadState(){
  try{
    let raw = localStorage.getItem(STORAGE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return {steps:DEFAULT_STEPS,nextId:100,notes:""};
}
function saveState(){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  render();
}

const stepsList = document.getElementById("stepsList");
const progressInner = document.getElementById("progressInner");
const progressText = document.getElementById("progressText");
const countsText = document.getElementById("countsText");
const percentBig = document.getElementById("percentBig");
const doneNum = document.getElementById("doneNum");
const notesEl = document.getElementById("notes");

function render(){
  stepsList.innerHTML="";
  state.steps.forEach(s=>{
    let div=document.createElement("div");
    div.className="step";
    div.innerHTML=`<div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
      <div class="status ${clsFor(s.status)}">${labelFor(s.status)}</div>`;
    div.onclick=()=>{cycleStatus(s.id)};
    stepsList.appendChild(div);
  });

  let total=state.steps.length;
  let done=state.steps.filter(s=>s.status==="done").length;
  let perc= total? Math.round(done/total*100):0;
  progressInner.style.width=perc+"%";
  progressText.textContent=perc+"% complété";
  countsText.textContent=done+" / "+total+" étapes";
  percentBig.textContent=perc+"%";
  doneNum.textContent=done;
  notesEl.value=state.notes||"";
}

function clsFor(st){return st==="todo"?"st-todo":st==="doing"?"st-doing":"st-done";}
function labelFor(st){return st==="todo"?"À faire":st==="doing"?"En cours":"Terminé";}
function cycleStatus(id){
  let s=state.steps.find(x=>x.id===id);
  if(!s)return;
  s.status=s.status==="todo"?"doing":s.status==="doing"?"done":"todo";
  saveState();
}

document.getElementById("createStep").onclick=()=>{
  let val=document.getElementById("newTitle").value.trim();
  if(!val)return;
  state.steps.push({id:state.nextId++,title:val,desc:"",status:"todo"});
  document.getElementById("newTitle").value="";
  saveState();
};
document.getElementById("addBtn").onclick=()=>document.getElementById("newTitle").focus();

document.getElementById("saveNotes").onclick=()=>{
  state.notes=notesEl.value;
  saveState();
  alert("Notes sauvegardées !");
};
document.getElementById("clearAll").onclick=()=>{
  if(confirm("Tout réinitialiser ?")){
    localStorage.removeItem(STORAGE_KEY);
    state=loadState(); render();
  }
};

// Export JSON
function exportJson(){
  let data=JSON.stringify(state,null,2);
  let blob=new Blob([data],{type:"application/json"});
  let url=URL.createObjectURL(blob);
  let a=document.createElement("a");
  a.href=url; a.download="bradbitt_tracker.json";
  a.click(); URL.revokeObjectURL(url);
}
document.getElementById("exportBtn").onclick=exportJson;
document.getElementById("exportJson").onclick=exportJson;

// Import JSON
document.getElementById("importFileBtn").onclick=()=>document.getElementById("importFile").click();
document.getElementById("importBtn").onclick=()=>document.getElementById("importFile").click();
document.getElementById("importFile").onchange=(ev)=>{
  let f=ev.target.files[0]; if(!f)return;
  let reader=new FileReader();
  reader.onload=e=>{
    try{ let d=JSON.parse(e.target.result);
      if(d.steps){ state=d; saveState(); }
    }catch{ alert("Fichier invalide"); }
  };
  reader.readAsText(f);
};

render();
