// ---------- Presets ----------
const PRESETS = {
  // G20 flags (EU 제외, 19개국)
  flags: [
    { name: '대한민국', url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg' },
    { name: '아르헨티나', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg' },
    { name: '호주', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Flag_of_Australia.svg' },
    { name: '브라질', url: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg' },
    { name: '캐나다', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg' },
    { name: '중국', url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People's_Republic_of_China.svg" },
    { name: '프랑스', url: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg' },
    { name: '독일', url: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg' },
    { name: '인도', url: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg' },
    { name: '인도네시아', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg' },
    { name: '이탈리아', url: 'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg' },
    { name: '일본', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg' },
    { name: '멕시코', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg' },
    { name: '러시아', url: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg' },
    { name: '사우디아라비아', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg' },
    { name: '남아프리카 공화국', url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg' },
    { name: '튀르키예', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg' },
    { name: '영국', url: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg' },
    { name: '미국', url: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' }
  ],
  // Landmarks (이미지는 저장 시 Wikipedia API로 동적 로드)
  landmarks: [
    { name: '대한민국 · 경복궁', wikiTitle: 'Gyeongbokgung' },
    { name: '아르헨티나 · 오벨리스크', wikiTitle: 'Obelisco de Buenos Aires' },
    { name: '호주 · 시드니 오페라 하우스', wikiTitle: 'Sydney Opera House' },
    { name: '브라질 · 구세주 그리스도상', wikiTitle: 'Christ the Redeemer (statue)' },
    { name: '캐나다 · CN 타워', wikiTitle: 'CN Tower' },
    { name: '중국 · 만리장성', wikiTitle: 'Great Wall of China' },
    { name: '프랑스 · 에펠탑', wikiTitle: 'Eiffel Tower' },
    { name: '독일 · 브란덴부르크 문', wikiTitle: 'Brandenburg Gate' },
    { name: '인도 · 타지마할', wikiTitle: 'Taj Mahal' },
    { name: '인도네시아 · 보로부두르', wikiTitle: 'Borobudur' },
    { name: '이탈리아 · 콜로세움', wikiTitle: 'Colosseum' },
    { name: '일본 · 후지산', wikiTitle: 'Mount Fuji' },
    { name: '멕시코 · 치첸 이트사', wikiTitle: 'Chichen Itza' },
    { name: '러시아 · 성 바실리 대성당', wikiTitle: "Saint Basil's Cathedral" },
    { name: '사우디아라비아 · 킹덤 센터', wikiTitle: 'Kingdom Centre' },
    { name: '남아프리카 · 테이블 마운틴', wikiTitle: 'Table Mountain' },
    { name: '튀르키예 · 아야 소피아', wikiTitle: 'Hagia Sophia' },
    { name: '영국 · 엘리자베스 타워(빅벤)', wikiTitle: 'Elizabeth Tower' },
    { name: '미국 · 자유의 여신상', wikiTitle: 'Statue of Liberty' }
  ]
};

const PIECE_LAYOUTS = { 8:[2,4], 12:[3,4], 16:[4,4] };
const DIFFICULTIES = {
  easy:   { pieces:8,  rotate:false, hint:true },
  normal: { pieces:12, rotate:false, hint:true },
  hard:   { pieces:16, rotate:true,  hint:false }
};

// 학년 프리셋
const GRADE_PRESETS = {
  none: null,
  g12: { pieces:8, rotate:false, hint:true, category:'flags', setCount:6,
         items:['대한민국','일본','중국','미국','영국','프랑스'] },
  g34: { pieces:12, rotate:false, hint:true, category:'landmarks', setCount:5,
         items:['대한민국 · 경복궁','일본 · 후지산','중국 · 만리장성','프랑스 · 에펠탑','미국 · 자유의 여신상'] },
  g56: { pieces:16, rotate:true, hint:false, category:'mixed', setCount:6,
         items:'g20random' }
};

// 간단 퀴즈/설명 데이터(필요 시 확장)
const QUIZ_INFO = {
  '대한민국': { fact:'태극기에는 음양을 뜻하는 태극과 4괘가 그려져 있어요.', q:'대한민국 수도는 어디일까요?', a:'서울' },
  '일본': { fact:'일장기라고 부르며 붉은 원은 태양을 뜻해요.', q:'일본의 수도는?', a:'도쿄' },
  '미국': { fact:'성조기는 50개의 별(주)과 13개의 줄(초기 식민지)을 나타내요.', q:'미국의 수도는?', a:'워싱턴 D.C.' },
  '영국': { fact:'유니언 잭은 잉글랜드·스코틀랜드·아일랜드 깃발의 결합이에요.', q:'영국의 수도는?', a:'런던' },
  '프랑스': { fact:'삼색기는 자유·평등·박애를 상징해요.', q:'프랑스의 수도는?', a:'파리' },
  '중국': { fact:'오성홍기는 큰 별과 4개의 작은 별을 담고 있어요.', q:'중국의 수도는?', a:'베이징' },
  '대한민국 · 경복궁': { fact:'조선 왕조의 법궁으로 북촌에 있어요.', q:'경복궁이 있는 도시는?', a:'서울' },
  '일본 · 후지산': { fact:'일본에서 가장 높은 산(3,776m)이에요.', q:'후지산이 보이는 유명한 도시는?', a:'도쿄(맑은 날 멀리서 보임)' },
  '프랑스 · 에펠탑': { fact:'1889년 만국박람회를 위해 세워졌어요.', q:'에펠탑이 있는 도시는?', a:'파리' },
  '미국 · 자유의 여신상': { fact:'프랑스가 독립 100주년 기념으로 선물했어요.', q:'자유의 여신상이 있는 도시는?', a:'뉴욕' }
};

// ---------- State ----------
let imgURL = PRESETS.flags[0].url;
let imgTitle = PRESETS.flags[0].name;
let rows = 3, cols = 4;
let rotating = false;
let started = false, solved = false;
let timerInterval = null, t0 = 0;
let order = [];
let revealOn = false;

// Set mode
let setActive = false; let setQueue = []; let setTimes = []; let setIdx = 0; let setAccum = 0; let teamName = '';
let currentGrade = 'none';

// Pending image (apply on Save)
let pendingImage = { url: imgURL, title: imgTitle, blobUrl: null, wikiTitle: null };

// DOM refs
const selCategory = document.getElementById('selCategory');
const selImage = document.getElementById('selImage');
const fileInput = document.getElementById('fileInput');
const urlInput = document.getElementById('urlInput');
const btnApplyImage = document.getElementById('btnApplyImage');

const optHint = document.getElementById('optHint');
const optGrid = document.getElementById('optGrid');
const optRotate = document.getElementById('optRotate');
const optSound = document.getElementById('optSound');
const optTablet = document.getElementById('optTablet');
const selDifficulty = document.getElementById('selDifficulty');
const selTheme = document.getElementById('selTheme');
const selGrade = document.getElementById('selGrade');

const board = document.getElementById('board');
const hint = document.getElementById('hint');
const hintFlash = document.getElementById('hintFlash');
const reveal = document.getElementById('reveal');
const timerEl = document.getElementById('timer');
const bestEl = document.getElementById('best');
const imgTitleEl = document.getElementById('imgTitle');
const statusEl = document.getElementById('status');
const successAudio = document.getElementById('successAudio');
const recentWrap = document.getElementById('recentWrap');
const attribution = document.getElementById('attribution');

// Set panel
const teamNameEl = document.getElementById('teamName');
const setCountEl = document.getElementById('setCount');
const btnSetStart = document.getElementById('btnSetStart');
const btnSetStop = document.getElementById('btnSetStop');
const setPanel = document.getElementById('setPanel');
const spTeam = document.getElementById('spTeam');
const spProg = document.getElementById('spProg');
const spAccum = document.getElementById('spAccum');
const setList = document.getElementById('setList');

// Header buttons
const btnNew = document.getElementById('btnNew');
const btnShuffle = document.getElementById('btnShuffle');
const btnReset = document.getElementById('btnReset');
const btnReveal = document.getElementById('btnReveal');
const btnHintFlash = document.getElementById('btnHintFlash');
const btnQuiz = document.getElementById('btnQuiz');

// Recent clear
const btnClearRecent = document.getElementById('btnClearRecent');

// Quiz overlay
const quizOverlay = document.getElementById('quizOverlay');
const quizBody = document.getElementById('quizBody');
const btnQuizClose = document.getElementById('btnQuizClose');

// Keyboard selection
let kbSelected = null; // HTMLElement or null

// ---------- Utils ----------
function toast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg || '적용되었습니다.'; el.style.display='block';
  setTimeout(()=> el.style.display='none', 1400);
}
function fmt(ms){ const t = Math.max(0, ms|0); const m = Math.floor(t/60000); const s = Math.floor((t%60000)/1000); const d = Math.floor((t%1000)/100); return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${d}`; }
function keyForBest(){ return `${imgURL}|${rows}x${cols}|rot:${rotating}`; }
function loadBest(){ const v = localStorage.getItem(keyForBest()); bestEl.textContent = v ? fmt(Number(v)) : '—'; }
function saveBest(elapsed){ const k = keyForBest(); const v = localStorage.getItem(k); if(!v || Number(elapsed) < Number(v)){ localStorage.setItem(k, String(elapsed)); loadBest(); } }
function startTimer(){ if (started) return; started = true; solved = false; t0 = performance.now(); timerInterval = setInterval(()=>{ timerEl.textContent = fmt(performance.now()-t0); }, 100); }
function stopTimer(){ if (timerInterval){ clearInterval(timerInterval); timerInterval = null; } }

function playSuccess(){
  if(!optSound.checked) return;
  if(successAudio && successAudio.readyState >= 2){ successAudio.currentTime = 0; successAudio.play().catch(()=>{}); }
  else {
    // fallback beep
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type='triangle'; o.frequency.setValueAtTime(523.25, ctx.currentTime);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime+0.4);
  }
}
function setStatus(msg, ok=false){ statusEl.textContent = msg; statusEl.className = 'text-sm ' + (ok ? 'text-emerald-600' : 'text-slate-600'); }
function hostnameOf(url){ try{ return new URL(url).hostname.replace('www.',''); }catch(e){ return ''; } }

// Attribution badge
function updateAttribution(url, title){
  const host = hostnameOf(url);
  if(!url || url.startsWith('blob:')){ attribution.classList.add('hidden'); return; }
  let label = '이미지 출처';
  if(host.includes('wikipedia.org')) label = `출처: Wikipedia · ${title||''}`;
  else if(host.includes('wikimedia.org')) label = `출처: Wikimedia Commons · ${title||''}`;
  else label = `출처: ${host}`;
  attribution.textContent = label;
  attribution.href = url;
  attribution.classList.remove('hidden');
}

// ---------- Data/UI helpers ----------
function populateImages(){
  const list = PRESETS[selCategory.value];
  selImage.innerHTML = '';
  list.forEach((it,i)=>{
    const opt = document.createElement('option');
    opt.value = it.url || it.wikiTitle || '';
    opt.textContent = it.name;
    if(i===0) opt.selected = true;
    selImage.appendChild(opt);
  });
}

function applyImage(url, title){
  imgURL = url; imgTitle = title || '';
  imgTitleEl.textContent = imgTitle ? `현재 이미지: ${imgTitle}` : '';
  hint.style.backgroundImage = `url("${imgURL}")`;
  reveal.style.backgroundImage = `url("${imgURL}")`;
  updateAttribution(url, title);
  loadBest();
  saveRecent(url, title);
  renderRecent();
}

function buildBoard(){
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  const total = rows*cols; order = Array.from({length: total}, (_,i)=>i);
  for(let i=total-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [order[i],order[j]]=[order[j],order[i]]; }
  board.innerHTML='';
  const rects = []; for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) rects.push({r,c});
  order.forEach((srcIdx, posIdx)=>{
    const {r, c} = rects[srcIdx];
    const tile = document.createElement('div');
    tile.className = 'tile bg-slate-100'; tile.draggable = !optTablet.checked; tile.tabIndex = 0;
    tile.dataset.correct = String(srcIdx); tile.dataset.pos = String(posIdx); tile.dataset.rot = '0';
    const bgX = (c/(cols-1))*100; const bgY = (r/(rows-1))*100;
    tile.style.backgroundImage = `url("${imgURL}")`;
    tile.style.backgroundPosition = `${bgX}% ${bgY}%`;
    tile.style.aspectRatio = '1 / 1';
    tile.style.border = optGrid.checked ? '1px solid rgba(0,0,0,.08)' : 'none';
    tile.style.backgroundSize = `${cols*100}% ${rows*100}%`;
    addDnD(tile); addRotate(tile); addKeyboard(tile); addTapSwap(tile);
    board.appendChild(tile);
  });
  hint.classList.toggle('hide', !optHint.checked);
  reveal.style.display = revealOn ? 'block' : 'none';
  stopTimer(); started = false; solved = false; timerEl.textContent = '00:00.0'; kbSelected = null;
  setStatus('타일을 드래그 또는 탭-투-스왑으로 바꿔 보세요.');
}

function addDnD(tile){
  tile.addEventListener('dragstart', (e)=>{ tile.classList.add('dragging'); e.dataTransfer.setData('text/plain', tile.dataset.pos); });
  tile.addEventListener('dragend', ()=> tile.classList.remove('dragging'));
  tile.addEventListener('dragover', (e)=>{ if(optTablet.checked) return; e.preventDefault(); tile.classList.add('drop-target'); });
  tile.addEventListener('dragleave', ()=> tile.classList.remove('drop-target'));
  tile.addEventListener('drop', (e)=>{ if(optTablet.checked) return; e.preventDefault(); tile.classList.remove('drop-target');
    const fromPos = Number(e.dataTransfer.getData('text/plain')); const toPos = Number(tile.dataset.pos);
    if (fromPos === toPos) return; swapTiles(fromPos, toPos); });
}

function addTapSwap(tile){
  tile.addEventListener('click', ()=>{
    if(!optTablet.checked) return;
    if(!kbSelected){ kbSelected = tile; tile.classList.add('kb-selected'); return; }
    if(kbSelected === tile){ kbSelected.classList.remove('kb-selected'); kbSelected=null; return; }
    const fromPos = Number(kbSelected.dataset.pos); const toPos = Number(tile.dataset.pos);
    kbSelected.classList.remove('kb-selected'); kbSelected = null; swapTiles(fromPos, toPos);
  });
}

function addRotate(tile){
  const applyRotCls = (el)=>{ el.classList.remove('rotate-90','rotate-180','rotate-270'); const deg = Number(el.dataset.rot); if (deg===90) el.classList.add('rotate-90'); else if (deg===180) el.classList.add('rotate-180'); else if (deg===270) el.classList.add('rotate-270'); };
  tile.addEventListener('dblclick', ()=>{ if(!rotating) return; const n = (Number(tile.dataset.rot)+90)%360; tile.dataset.rot = String(n); applyRotCls(tile); checkSolved(); });
  tile.addEventListener('keydown', (e)=>{ if(!rotating) return;
    if(e.code==='Space' || e.key==='r' || e.key==='R'){ e.preventDefault(); const n=(Number(tile.dataset.rot)+90)%360; tile.dataset.rot=String(n); applyRotCls(tile); checkSolved(); } });
  if (rotating){ const degs=[0,90,180,270]; tile.dataset.rot = String(degs[(Math.random()*4)|0]); const d = Number(tile.dataset.rot); if (d) tile.classList.add(`rotate-${d}`); }
}

function addKeyboard(tile){
  tile.addEventListener('keydown', (e)=>{
    const key = e.key; const pos = Number(tile.dataset.pos); const rc = idxToRC(pos);
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) e.preventDefault();
    if(key==='ArrowLeft') focusByRC(rc.r, rc.c-1);
    if(key==='ArrowRight') focusByRC(rc.r, rc.c+1);
    if(key==='ArrowUp') focusByRC(rc.r-1, rc.c);
    if(key==='ArrowDown') focusByRC(rc.r+1, rc.c);
    if(key==='Enter'){ e.preventDefault();
      if(!kbSelected){ kbSelected = tile; tile.classList.add('kb-selected'); return; }
      if(kbSelected === tile){ tile.classList.remove('kb-selected'); kbSelected=null; return; }
      const fromPos = Number(kbSelected.dataset.pos); const toPos = Number(tile.dataset.pos);
      kbSelected.classList.remove('kb-selected'); kbSelected=null; swapTiles(fromPos, toPos);
    }
  });
}

function focusByRC(r,c){ if(r<0||c<0||r>=rows||c>=cols) return; const idx = r*cols + c; const t = Array.from(board.children).find(x=>Number(x.dataset.pos)===idx); if(t) t.focus(); }
function idxToRC(idx){ return { r: Math.floor(idx/cols), c: idx%cols }; }

function swapTiles(fromPos, toPos){
  const tiles = Array.from(board.children);
  const a = tiles.find(t=>Number(t.dataset.pos)===fromPos);
  const b = tiles.find(t=>Number(t.dataset.pos)===toPos);
  if(!a||!b) return;
  startTimer();
  const aNext = a.nextSibling; const bNext = b.nextSibling; const parent = a.parentNode;
  parent.insertBefore(a, bNext); parent.insertBefore(b, aNext);
  [a.dataset.pos, b.dataset.pos] = [b.dataset.pos, a.dataset.pos];
  checkSolved();
}

function checkSolved(){
  const tiles = Array.from(board.children);
  const ok = tiles.every(t=>{
    const pos = Number(t.dataset.pos); const correct = Number(t.dataset.correct);
    const rot = Number(t.dataset.rot||'0'); const rotOK = rotating ? rot===0 : true;
    return pos===correct && rotOK;
  });
  if (ok && !solved){
    solved = true; stopTimer();
    const elapsed = performance.now()-t0;
    saveBest(elapsed); setStatus(`완료! 기록 ${fmt(elapsed)}`, true);
    playSuccess(); if(setActive) onSetSolved(elapsed);
  }
}

// ---------- Hint flash (3s) ----------
function flashHint(){
  hintFlash.style.backgroundImage = `url("${imgURL}")`;
  hintFlash.classList.remove('hidden');
  setTimeout(()=>{ hintFlash.classList.add('hidden'); }, 3000);
}

// ---------- Reveal Answer ----------
function toggleReveal(){
  revealOn = !revealOn;
  reveal.style.display = revealOn ? 'block' : 'none';
  board.style.pointerEvents = revealOn ? 'none' : 'auto';
  btnReveal.textContent = revealOn ? '정답 숨기기' : '정답 공개';
  setStatus(revealOn ? '정답을 표시 중입니다.' : '퍼즐 진행 중');
}

// ---------- Difficulty / Theme ----------
function applyDifficulty(name){
  if(name==='custom') return;
  const d = DIFFICULTIES[name];
  document.querySelectorAll('input[name="pieces"]').forEach(r=> r.checked = (Number(r.value)===d.pieces));
  [rows, cols] = PIECE_LAYOUTS[d.pieces]; optRotate.checked = d.rotate; rotating = d.rotate; optHint.checked = d.hint;
  buildBoard();
}
function markCustomIfChanged(){
  const current = { pieces: Number(document.querySelector('input[name="pieces"]:checked').value), rotate: optRotate.checked, hint: optHint.checked };
  for(const [k,v] of Object.entries(DIFFICULTIES)){ if(current.pieces===v.pieces && current.rotate===v.rotate && current.hint===v.hint){ selDifficulty.value = k; return; } }
  selDifficulty.value = 'custom';
}
function applyTheme(value){
  document.body.classList.remove('theme-pastel','theme-contrast','theme-chalk');
  if(value==='pastel') document.body.classList.add('theme-pastel');
  else if(value==='contrast') document.body.classList.add('theme-contrast');
  else if(value==='chalk') document.body.classList.add('theme-chalk');
}

// ---------- Grade preset ----------
function applyGradePreset(key){
  currentGrade = key;
  const gp = GRADE_PRESETS[key];
  if(!gp) return;
  const pieceVal = gp.pieces;
  document.querySelectorAll('input[name="pieces"]').forEach(r=> r.checked = (Number(r.value)===pieceVal));
  [rows, cols] = PIECE_LAYOUTS[pieceVal];
  optRotate.checked = gp.rotate; rotating = gp.rotate; optHint.checked = gp.hint;
  if(gp.category==='mixed'){ selCategory.value = 'flags'; } else { selCategory.value = gp.category; }
  populateImages();
  setCountEl.value = gp.setCount;
  selTheme.value = (key==='g56') ? 'contrast' : 'pastel'; applyTheme(selTheme.value);
  if(Array.isArray(gp.items)){
    const name = gp.items[0]; const item = findPresetByName(name);
    if(item){
      if(item.url){ pendingImage = { url:item.url, title:item.name, blobUrl:null, wikiTitle:null }; onApplyImage(); }
      else { pendingImage = { url:'', title:item.name, blobUrl:null, wikiTitle:item.wikiTitle }; resolvePendingIfLandmark().then(onApplyImage); }
    }
  } else {
    pendingImage = { url: PRESETS.flags[0].url, title: PRESETS.flags[0].name, blobUrl:null, wikiTitle:null }; onApplyImage();
  }
}

function resolveGradeQueue(){
  const gp = GRADE_PRESETS[currentGrade];
  if(!gp) return null;
  if(Array.isArray(gp.items)) return gp.items.map(name=> findPresetByName(name)).filter(Boolean);
  // g20random
  const union = [...PRESETS.flags, ...PRESETS.landmarks];
  const count = gp.setCount || 6; const pool = union.slice(); const out = [];
  for(let i=0;i<count;i++){ if(pool.length===0) break; const j=(Math.random()*pool.length)|0; out.push(pool.splice(j,1)[0]); }
  return out;
}
function findPresetByName(name){
  return PRESETS.flags.find(x=>x.name===name) || PRESETS.landmarks.find(x=>x.name===name) || null;
}

// ---------- Set Mode ----------
function startSet(){
  if(setActive) return;
  const n = Math.max(2, Math.min(10, Number(setCountEl.value)||3));
  teamName = (teamNameEl.value||'무명 팀').trim();
  let list = resolveGradeQueue();
  if(!list){
    const pool = PRESETS[selCategory.value].slice();
    list = []; for(let i=0;i<n;i++){ if(pool.length===0) pool.push(...PRESETS[selCategory.value]); const j=(Math.random()*pool.length)|0; list.push(pool.splice(j,1)[0]); }
  } else if(list.length > n) list = list.slice(0,n);

  setQueue = list; setTimes = []; setIdx = 0; setAccum = 0; setActive = true;
  spTeam.textContent = teamName; spProg.textContent = `${setIdx+1}/${setQueue.length}`; spAccum.textContent = '00:00.0';
  setList.innerHTML = ''; setPanel.classList.remove('hidden');

  const it = setQueue[0];
  if(it.wikiTitle){ pendingImage = { url:'', title: it.name, blobUrl:null, wikiTitle: it.wikiTitle }; resolvePendingIfLandmark().then(onApplyImage); }
  else { pendingImage = { url: it.url, title: it.name, blobUrl: null, wikiTitle:null }; onApplyImage(); }
  setStatus('세트 모드: 첫 퍼즐을 시작합니다.');
}
function stopSet(){ if(!setActive) return; setActive = false; setStatus(`세트 종료. 팀 ${teamName} · 누적 ${fmt(setAccum)}`); }
function onSetSolved(elapsed){
  setTimes.push(elapsed); setAccum += elapsed;
  const li = document.createElement('li'); li.textContent = `${imgTitle} — ${fmt(elapsed)}`; setList.appendChild(li);
  spAccum.textContent = fmt(setAccum); setIdx++;
  if(setIdx < setQueue.length){
    spProg.textContent = `${setIdx+1}/${setQueue.length}`;
    setTimeout(()=>{
      const it = setQueue[setIdx];
      if(it.wikiTitle){ pendingImage = { url:'', title: it.name, blobUrl:null, wikiTitle: it.wikiTitle }; resolvePendingIfLandmark().then(onApplyImage); }
      else { pendingImage = { url: it.url, title: it.name, blobUrl:null, wikiTitle:null }; onApplyImage(); }
    }, 700);
  } else {
    setActive = false; spProg.textContent = `${setQueue.length}/${setQueue.length}`;
    const liTotal = document.createElement('li'); liTotal.className = 'mt-1 font-semibold'; liTotal.textContent = `합계 — ${fmt(setAccum)}`; setList.appendChild(liTotal);
    setStatus(`세트 완료! 팀 ${teamName} · 누적 ${fmt(setAccum)}`, true);
  }
}

// ---------- Recent images (delete & clear all) ----------
function saveRecent(url, title){
  try{
    const k='puzzle_recent_imgs'; const obj = JSON.parse(localStorage.getItem(k)||'[]');
    const filtered = obj.filter(it=>it.url!==url); filtered.unshift({url, title});
    const capped = filtered.slice(0,8); localStorage.setItem(k, JSON.stringify(capped));
  }catch(e){}
}
function loadRecent(){ try{ return JSON.parse(localStorage.getItem('puzzle_recent_imgs')||'[]'); }catch(e){ return []; } }
function deleteRecent(url){
  try{ const k='puzzle_recent_imgs'; const obj = JSON.parse(localStorage.getItem(k)||'[]'); const next = obj.filter(it=>it.url!==url); localStorage.setItem(k, JSON.stringify(next)); renderRecent(); }catch(e){}
}
function clearAllRecent(){ try{ localStorage.removeItem('puzzle_recent_imgs'); renderRecent(); toast('최근 이미지가 모두 삭제되었습니다'); }catch(e){} }
function renderRecent(){
  const arr = loadRecent(); recentWrap.innerHTML='';
  arr.forEach(it=>{
    const chip=document.createElement('div');
    chip.className='flex items-center gap-1 text-xs px-2 py-1 rounded border border-slate-300 bg-white';
    const btn=document.createElement('button');
    btn.className='underline'; btn.textContent = it.title || it.url.split('/').pop(); btn.title = it.url;
    btn.addEventListener('click', ()=>{ pendingImage = { url: it.url, title: it.title||'', blobUrl:null, wikiTitle:null }; onApplyImage(); });
    const del=document.createElement('button'); del.textContent='×'; del.className='ml-1 w-4 h-4 leading-3 text-slate-500 hover:text-red-600'; del.title='삭제';
    del.addEventListener('click', ()=> deleteRecent(it.url));
    chip.appendChild(btn); chip.appendChild(del); recentWrap.appendChild(chip);
  });
}

// ---------- Wikipedia resolver ----------
async function resolvePendingIfLandmark(){
  if(pendingImage && !pendingImage.url && pendingImage.wikiTitle){
    try{
      const t = pendingImage.wikiTitle;
      const api = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=pageimages|info&inprop=url&format=json&piprop=original&titles=${encodeURIComponent(t)}`;
      const res = await fetch(api); const j = await res.json();
      const pages = j?.query?.pages || {}; const first = pages[Object.keys(pages)[0]];
      const src = first?.original?.source; const fullurl = first?.fullurl;
      if(src){ pendingImage.url = src; pendingImage.sourcePage = fullurl || src; }
    }catch(e){ console.warn('Wikipedia fetch failed', e); }
  }
}

// ---------- Apply image (Save button) ----------
function onApplyImage(){
  const { url, title, blobUrl, sourcePage } = pendingImage;
  const pick = blobUrl || url; if(!pick) return;
  applyImage(pick, title||'');
  // 위키에서 온 경우 출처를 페이지로 보정
  if(sourcePage) updateAttribution(sourcePage, title);
  buildBoard(); toast('이미지를 적용했습니다');
}

// ---------- Reset all ----------
function resetAll(){
  stopTimer(); started=false; solved=false; revealOn=false; timerEl.textContent='00:00.0';
  selTheme.value='default'; applyTheme('default');
  selDifficulty.value='normal'; const d=DIFFICULTIES.normal;
  document.querySelectorAll('input[name="pieces"]').forEach(r=> r.checked = (Number(r.value)===d.pieces));
  [rows, cols] = PIECE_LAYOUTS[d.pieces]; optRotate.checked=d.rotate; rotating=d.rotate; optHint.checked=d.hint;
  optGrid.checked=true; optSound.checked=true; optTablet.checked=false;
  selCategory.value='flags'; populateImages();
  const first = PRESETS.flags[0]; selImage.selectedIndex=0;
  pendingImage={ url:first.url, title:first.name, blobUrl:null, wikiTitle:null }; onApplyImage();
  fileInput.value=''; urlInput.value=''; teamNameEl.value=''; setCountEl.value=3; selGrade.value='none'; currentGrade='none';
  reveal.style.display='none'; board.style.pointerEvents='auto'; btnReveal.textContent='정답 공개';
  setPanel.classList.add('hidden'); setList.innerHTML=''; spAccum.textContent='00:00.0';
  toast('초기화 완료');
}

// ---------- Quiz ----------
function openQuiz(){
  const info = QUIZ_INFO[imgTitle] || {};
  const fact = info.fact ? `💡 정보: ${info.fact}` : '이미지와 관련된 사실을 찾아보세요!';
  const q = info.q ? `❓ 질문: ${info.q}` : '이 이미지와 관련된 나라는 어디일까요?';
  const a = info.a ? `✅ 정답: ${info.a}` : '(직접 찾아본 후 함께 확인해요!)';
  quizBody.innerHTML = `
    <p>${fact}</p>
    <p>${q}</p>
    <details class="mt-2"><summary class="cursor-pointer select-none">정답 보기</summary><p class="mt-1">${a}</p></details>
  `;
  quizOverlay.classList.remove('hidden');
}
function closeQuiz(){ quizOverlay.classList.add('hidden'); }

// ---------- Events ----------
function initSelectors(){
  populateImages(); renderRecent();

  selImage.addEventListener('change', ()=>{
    const list = PRESETS[selCategory.value];
    const optText = selImage.options[selImage.selectedIndex]?.text || '';
    const item = list.find(i=> (i.url && i.url===selImage.value) || (i.wikiTitle && i.name===optText) ) || null;
    if(item){
      if(item.url){ pendingImage = { url: item.url, title: item.name, blobUrl:null, wikiTitle:null }; }
      else if(item.wikiTitle){ pendingImage = { url:'', title:item.name, blobUrl:null, wikiTitle:item.wikiTitle }; }
    } else {
      pendingImage = { url: selImage.value, title:'', blobUrl:null, wikiTitle:null };
    }
  });

  selCategory.addEventListener('change', ()=>{
    populateImages();
    const list = PRESETS[selCategory.value];
    if(list && list.length){
      if(list[0].url){ selImage.value=list[0].url; pendingImage={ url:list[0].url, title:list[0].name, blobUrl:null, wikiTitle:null }; }
      else { selImage.selectedIndex=0; pendingImage={ url:'', title:list[0].name, blobUrl:null, wikiTitle:list[0].wikiTitle }; }
    }
  });

  fileInput.addEventListener('change', (e)=>{ const f = e.target.files?.[0]; if(!f) return; const url = URL.createObjectURL(f); pendingImage = { url, title: f.name, blobUrl:url, wikiTitle:null }; });
  urlInput.addEventListener('change', ()=>{ if (!urlInput.value) return; pendingImage = { url:urlInput.value, title:'사용자 URL', blobUrl:null, wikiTitle:null }; });
  btnApplyImage.addEventListener('click', async ()=>{ await resolvePendingIfLandmark(); onApplyImage(); });

  document.querySelectorAll('input[name="pieces"]').forEach(r=>{
    r.addEventListener('change', ()=>{ const v = Number(document.querySelector('input[name="pieces"]:checked').value); [rows, cols] = PIECE_LAYOUTS[v]; buildBoard(); markCustomIfChanged(); });
  });
  optHint.addEventListener('change', ()=>{ hint.classList.toggle('hide', !optHint.checked); markCustomIfChanged(); });
  optGrid.addEventListener('change', ()=>{ Array.from(board.children).forEach(t=> t.style.border = optGrid.checked ? '1px solid rgba(0,0,0,.08)' : 'none'); });
  optRotate.addEventListener('change', ()=>{ rotating = optRotate.checked; buildBoard(); markCustomIfChanged(); });
  optTablet.addEventListener('change', ()=>{ document.body.classList.toggle('tablet', optTablet.checked); buildBoard(); });

  selDifficulty.addEventListener('change', ()=> applyDifficulty(selDifficulty.value));
  selTheme.addEventListener('change', ()=> applyTheme(selTheme.value));
  selGrade.addEventListener('change', ()=> applyGradePreset(selGrade.value));

  btnNew.addEventListener('click', ()=> buildBoard());
  btnShuffle.addEventListener('click', ()=> buildBoard());
  btnReset.addEventListener('click', resetAll);
  btnReveal.addEventListener('click', toggleReveal);
  btnHintFlash.addEventListener('click', flashHint);
  btnQuiz.addEventListener('click', openQuiz);
  btnQuizClose.addEventListener('click', closeQuiz);
  quizOverlay.addEventListener('click', (e)=>{ if(e.target===quizOverlay) closeQuiz(); });

  btnSetStart.addEventListener('click', startSet);
  btnSetStop.addEventListener('click', stopSet);

  btnClearRecent.addEventListener('click', clearAllRecent);
}

function init(){
  applyImage(imgURL, imgTitle);
  initSelectors();
  applyDifficulty('normal');
  applyTheme('default');
  buildBoard();
}

window.addEventListener('load', init);
