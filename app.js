/* ========= 프리셋 ========= */
const PRESETS = {
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
const GRADE_PRESETS = {
  none: null,
  g12: { pieces:8, rotate:false, hint:true, category:'flags', setCount:6, items:['대한민국','일본','중국','미국','영국','프랑스'] },
  g34: { pieces:12, rotate:false, hint:true, category:'landmarks', setCount:5, items:['대한민국 · 경복궁','일본 · 후지산','중국 · 만리장성','프랑스 · 에펠탑','미국 · 자유의 여신상'] },
  g56: { pieces:16, rotate:true, hint:false, category:'mixed', setCount:6, items:'g20random' }
};
const QUIZ_INFO = { '대한민국': { fact:'태극·4괘 의미.', q:'대한민국 수도는?', a:'서울' } };

/* ========= 상태/DOM ========= */
let imgURL = PRESETS.flags[0].url;
let imgTitle = PRESETS.flags[0].name;
let rows = 3, cols = 4;
let rotating = false;
let started = false, solved = false;
let timerInterval = null, t0 = 0;
let revealOn = false;

let setActive = false, setQueue = [], setIdx = 0, setAccum = 0, teamName = '';
let currentGrade = 'none';
let isStudentMode = false;
let zoom = 1; const Z_MIN=0.5, Z_MAX=2, Z_STEP=0.1;

/* 대기 이미지: url | wikiTitle | blobUrl */
let pendingImage = { url: imgURL, title: imgTitle, blobUrl: null, wikiTitle: null, sourcePage: null };

const $ = (id)=>document.getElementById(id);
const selCategory=$('selCategory'), selImage=$('selImage');
const fileInput=$('fileInput'), urlInput=$('urlInput'), btnApplyImage=$('btnApplyImage');
const optHint=$('optHint'), optGrid=$('optGrid'), optRotate=$('optRotate'), optSound=$('optSound'), optTablet=$('optTablet');
const selDifficulty=$('selDifficulty'), selTheme=$('selTheme'), selGrade=$('selGrade');
const board=$('board'), hint=$('hint'), hintFlash=$('hintFlash'), reveal=$('reveal');
const timerEl=$('timer'), bestEl=$('best'), imgTitleEl=$('imgTitle'), statusEl=$('status');
const successAudio=$('successAudio'), recentWrap=$('recentWrap'), attribution=$('attribution');
const teamNameEl=$('teamName'), setCountEl=$('setCount'), btnSetStart=$('btnSetStart'), btnSetStop=$('btnSetStop');
const setPanel=$('setPanel'), spTeam=$('spTeam'), spProg=$('spProg'), spAccum=$('spAccum'), setList=$('setList');
const btnNew=$('btnNew'), btnShuffle=$('btnShuffle'), btnReset=$('btnReset'), btnReveal=$('btnReveal'), btnHintFlash=$('btnHintFlash'), btnQuiz=$('btnQuiz'), btnClearRecent=$('btnClearRecent');
const btnToggleMode=$('btnToggleMode');
const studentToolbar=$('studentToolbar'), btnZoomOut=$('btnZoomOut'), btnZoomIn=$('btnZoomIn'), btnZoomReset=$('btnZoomReset'), btnZoomFit=$('btnZoomFit'), btnFullscreen=$('btnFullscreen'), zoomLabel=$('zoomLabel');
const stageInner=$('stageInner'), stageOuter=$('stageOuter');
const quizOverlay=$('quizOverlay'), quizBody=$('quizBody'), btnQuizClose=$('btnQuizClose');

/* ========= 유틸 ========= */
function toast(msg){ const el=$('toast'); el.textContent=msg||'적용됨.'; el.style.display='block'; setTimeout(()=>el.style.display='none',1600); }
function fmt(ms){ const t=Math.max(0,ms|0); const m=(t/60000|0); const s=(t%60000/1000|0); const d=(t%1000/100|0); return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${d}`; }
function keyForBest(){ return `${imgURL}|${rows}x${cols}|rot:${rotating}`; }
function loadBest(){ const v=localStorage.getItem(keyForBest()); bestEl.textContent=v?fmt(Number(v)):'—'; }
function saveBest(elapsed){ const k=keyForBest(); const v=localStorage.getItem(k); if(!v||Number(elapsed)<Number(v)){ localStorage.setItem(k,String(elapsed)); loadBest(); } }
function startTimer(){ if(started) return; started=true; solved=false; t0=performance.now(); timerInterval=setInterval(()=> timerEl.textContent=fmt(performance.now()-t0),100); }
function stopTimer(){ if(timerInterval){ clearInterval(timerInterval); timerInterval=null; } }
function setStatus(msg, ok=false){ statusEl.textContent=msg; statusEl.className='text-sm '+(ok?'text-emerald-600':'text-slate-600'); }
function hostnameOf(url){ try{ return new URL(url).hostname.replace('www.',''); }catch{ return ''; } }
function updateAttribution(url, title){
  const host=hostnameOf(url);
  if(!url||url.startsWith('blob:')){ attribution.classList.add('hidden'); return; }
  let label='이미지 출처';
  if(host.includes('wikipedia.org')) label=`출처: Wikipedia · ${title||''}`;
  else if(host.includes('wikimedia.org')) label=`출처: Wikimedia Commons · ${title||''}`;
  else label=`출처: ${host}`;
  attribution.textContent=label; attribution.href=url; attribution.classList.remove('hidden');
}
function playSuccess(){ if(!optSound.checked) return;
  if(successAudio?.readyState>=2){ successAudio.currentTime=0; successAudio.play().catch(()=>{});}
  else{ const ctx=new (window.AudioContext||window.webkitAudioContext)(); const o=ctx.createOscillator(), g=ctx.createGain(); o.type='triangle';
    o.frequency.setValueAtTime(523.25,ctx.currentTime);
    g.gain.setValueAtTime(0.0001,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.2,ctx.currentTime+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.35);
    o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime+0.4); } }

/* ========= 이미지 로드 (사전검증 + 폴백) ========= */
async function resolveWikipediaImage(wikiTitle){
  const api=`https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=pageimages|info&inprop=url&format=json&piprop=original|thumbnail&pithumbsize=1600&titles=${encodeURIComponent(wikiTitle)}`;
  const res=await fetch(api);
  const j=await res.json();
  const pages=j?.query?.pages||{};
  const first=pages[Object.keys(pages)[0]];
  return { src:first?.original?.source || first?.thumbnail?.source, fullurl:first?.fullurl };
}
function preload(url){
  return new Promise((resolve,reject)=>{
    const img=new Image();
    img.crossOrigin = 'anonymous';
    img.onload=()=>resolve(url);
    img.onerror=()=>reject(new Error('이미지 로드 실패'));
    img.src=url;
  });
}
async function safeApply(url, title, sourcePage){
  try{
    const okUrl=await preload(url);
    imgURL=okUrl; imgTitle=title||'';
    hint.style.backgroundImage=`url("${imgURL}")`;
    reveal.style.backgroundImage=`url("${imgURL}")`;
    imgTitleEl.textContent=imgTitle?`현재 이미지: ${imgTitle}`:'';
    updateAttribution(sourcePage || url, title);
    saveRecent(url, title); renderRecent(); loadBest(); buildBoard(); toast('이미지를 적용함.');
  }catch(e){
    console.warn(e); toast('⚠️ 이미지를 불러올 수 없음. 다른 이미지를 선택하세요.');
  }
}

/* ========= UI 빌드 ========= */
function populateImages(){
  const list=PRESETS[selCategory.value]; selImage.innerHTML='';
  list.forEach((it,i)=>{
    const opt=document.createElement('option');
    if(it.url){ opt.value=it.url; opt.dataset.kind='url'; }
    else { opt.value=it.wikiTitle; opt.dataset.kind='wiki'; }
    opt.textContent=it.name; if(i===0) opt.selected=true; selImage.appendChild(opt);
  });
}
function buildBoard(){
  const val=document.querySelector('input[name="pieces"]:checked').value;
  [rows,cols]=PIECE_LAYOUTS[Number(val)];
  board.style.gridTemplateColumns=`repeat(${cols},1fr)`;
  board.style.gridTemplateRows=`repeat(${rows},1fr)`;
  board.style.aspectRatio = `${cols} / ${rows}`;     // ← 가로:세로 비율 동적 적용

  const total=rows*cols;
  const rects=[]; for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) rects.push({r,c});
  const order=[...Array(total).keys()].sort(()=>Math.random()-0.5);

  board.innerHTML='';
  order.forEach((srcIdx,posIdx)=>{
    const {r,c}=rects[srcIdx]; const tile=document.createElement('div');
    tile.className='tile bg-slate-100'; tile.draggable=!optTablet.checked; tile.tabIndex=0;
    tile.dataset.correct=String(srcIdx); tile.dataset.pos=String(posIdx); tile.dataset.rot='0';
    const bgX=(c/(cols-1))*100, bgY=(r/(rows-1))*100;
    tile.style.backgroundImage=`url("${imgURL}")`;
    tile.style.backgroundPosition=`${bgX}% ${bgY}%`;
    tile.style.aspectRatio='1/1';
    tile.style.border=optGrid.checked?'1px solid rgba(0,0,0,.08)':'none';
    tile.style.backgroundSize=`${cols*100}% ${rows*100}%`;
    addDnD(tile); addRotate(tile); addKeyboard(tile); addTapSwap(tile);
    board.appendChild(tile);
  });
  hint.classList.toggle('hide', !optHint.checked);
  reveal.style.display=revealOn?'block':'none';
  stopTimer(); started=false; solved=false; timerEl.textContent='00:00.0';
  setStatus('타일을 드래그 또는 탭-스왑으로 바꿔 보세요.');
  if(isStudentMode) setTimeout(fitToScreen,0);
}

/* 드래그/탭/키보드/회전 */
function addDnD(tile){
  tile.addEventListener('dragstart',e=>{ tile.classList.add('dragging'); e.dataTransfer.setData('text/plain',tile.dataset.pos); });
  tile.addEventListener('dragend',()=> tile.classList.remove('dragging'));
  tile.addEventListener('dragover',e=>{ if(optTablet.checked) return; e.preventDefault(); tile.classList.add('drop-target'); });
  tile.addEventListener('dragleave',()=> tile.classList.remove('drop-target'));
  tile.addEventListener('drop',e=>{ if(optTablet.checked) return; e.preventDefault(); tile.classList.remove('drop-target');
    const from=Number(e.dataTransfer.getData('text/plain')), to=Number(tile.dataset.pos); if(from===to) return; swapTiles(from,to); });
}
function addTapSwap(tile){
  tile.addEventListener('click',()=>{ if(!optTablet.checked) return; if(!window._kbSel){ window._kbSel=tile; tile.classList.add('kb-selected'); return; }
    if(window._kbSel===tile){ tile.classList.remove('kb-selected'); window._kbSel=null; return; }
    const from=Number(window._kbSel.dataset.pos), to=Number(tile.dataset.pos); window._kbSel.classList.remove('kb-selected'); window._kbSel=null; swapTiles(from,to); });
}
function addRotate(tile){
  const applyRotCls=(el)=>{ el.classList.remove('rotate-90','rotate-180','rotate-270'); const d=Number(el.dataset.rot); if(d===90)el.classList.add('rotate-90'); else if(d===180)el.classList.add('rotate-180'); else if(d===270)el.classList.add('rotate-270'); };
  tile.addEventListener('dblclick',()=>{ if(!rotating) return; const n=(Number(tile.dataset.rot)+90)%360; tile.dataset.rot=String(n); applyRotCls(tile); checkSolved(); });
  tile.addEventListener('keydown',e=>{ if(!rotating) return; if(e.code==='Space'||e.key==='r'||e.key==='R'){ e.preventDefault(); const n=(Number(tile.dataset.rot)+90)%360; tile.dataset.rot=String(n); applyRotCls(tile); checkSolved(); } });
  if(rotating){ const deg=[0,90,180,270][(Math.random()*4)|0]; tile.dataset.rot=String(deg); if(deg) tile.classList.add(`rotate-${deg}`); }
}
function addKeyboard(tile){
  tile.addEventListener('keydown',e=>{ const key=e.key; const pos=Number(tile.dataset.pos); const rc={r:(pos/cols|0), c:(pos%cols)};
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) e.preventDefault();
    if(key==='ArrowLeft') focusByRC(rc.r,rc.c-1);
    if(key==='ArrowRight') focusByRC(rc.r,rc.c+1);
    if(key==='ArrowUp') focusByRC(rc.r-1,rc.c);
    if(key==='ArrowDown') focusByRC(rc.r+1,rc.c);
    if(key==='Enter'){ e.preventDefault(); if(!window._kbSel){ window._kbSel=tile; tile.classList.add('kb-selected'); return; }
      if(window._kbSel===tile){ tile.classList.remove('kb-selected'); window._kbSel=null; return; }
      const from=Number(window._kbSel.dataset.pos), to=Number(tile.dataset.pos); window._kbSel.classList.remove('kb-selected'); window._kbSel=null; swapTiles(from,to); }
  });
}
function focusByRC(r,c){ if(r<0||c<0||r>=rows||c>=cols) return; const idx=r*cols+c; const t=[...board.children].find(x=>Number(x.dataset.pos)===idx); if(t) t.focus(); }
function swapTiles(from,to){
  const tiles=[...board.children];
  const a=tiles.find(t=>Number(t.dataset.pos)===from), b=tiles.find(t=>Number(t.dataset.pos)===to); if(!a||!b) return;
  startTimer();
  const aNext=a.nextSibling, bNext=b.nextSibling, parent=a.parentNode;
  parent.insertBefore(a,bNext); parent.insertBefore(b,aNext);
  [a.dataset.pos,b.dataset.pos]=[b.dataset.pos,a.dataset.pos];
  checkSolved();
}
function checkSolved(){
  const tiles=[...board.children];
  const ok=tiles.every(t=>{ const pos=Number(t.dataset.pos), cor=Number(t.dataset.correct), rot=Number(t.dataset.rot||'0'); return pos===cor && (rotating?rot===0:true); });
  if(ok && !solved){ solved=true; stopTimer(); const elapsed=performance.now()-t0; saveBest(elapsed); setStatus(`완료! 기록 ${fmt(elapsed)}`,true); playSuccess(); if(setActive) onSetSolved(elapsed); }
}

/* 힌트/정답 */
function flashHint(){ hintFlash.style.backgroundImage=`url("${imgURL}")`; hintFlash.classList.remove('hidden'); setTimeout(()=>hintFlash.classList.add('hidden'),3000); }
function toggleReveal(){ revealOn=!revealOn; reveal.style.display=revealOn?'block':'none'; board.style.pointerEvents=revealOn?'none':'auto'; btnReveal.textContent=revealOn?'정답 숨기기':'정답 공개'; setStatus(revealOn?'정답을 표시 중임.':'퍼즐 진행 중.'); }

/* 난이도/테마 */
function applyDifficulty(name){ if(name==='custom') return; const d=DIFFICULTIES[name];
  document.querySelectorAll('input[name="pieces"]').forEach(r=> r.checked=(Number(r.value)===d.pieces));
  [rows,cols]=PIECE_LAYOUTS[d.pieces]; optRotate.checked=d.rotate; rotating=d.rotate; optHint.checked=d.hint; buildBoard(); }
function markCustomIfChanged(){ const cur={pieces:Number(document.querySelector('input[name="pieces"]:checked').value), rotate:optRotate.checked, hint:optHint.checked};
  for(const [k,v] of Object.entries(DIFFICULTIES)){ if(cur.pieces===v.pieces && cur.rotate===v.rotate && cur.hint===v.hint){ selDifficulty.value=k; return; } } selDifficulty.value='custom'; }
function applyTheme(v){ document.body.classList.remove('theme-pastel','theme-contrast','theme-chalk'); if(v==='pastel')document.body.classList.add('theme-pastel'); else if(v==='contrast')document.body.classList.add('theme-contrast'); else if(v==='chalk')document.body.classList.add('theme-chalk'); }

/* 학년 프리셋 */
function findPresetByName(name){ return PRESETS.flags.find(x=>x.name===name)||PRESETS.landmarks.find(x=>x.name===name)||null; }
function resolveGradeQueue(){
  const gp=GRADE_PRESETS[currentGrade]; if(!gp) return null;
  if(Array.isArray(gp.items)) return gp.items.map(findPresetByName).filter(Boolean);
  const union=[...PRESETS.flags,...PRESETS.landmarks]; const count=gp.setCount||6; const pool=union.slice(); const out=[];
  for(let i=0;i<count;i++){ if(pool.length===0) break; const j=(Math.random()*pool.length)|0; out.push(pool.splice(j,1)[0]); } return out;
}
function applyGradePreset(key){
  currentGrade=key; const gp=GRADE_PRESETS[key]; if(!gp) return;
  const p=gp.pieces; document.querySelectorAll('input[name="pieces"]').forEach(r=> r.checked=(Number(r.value)===p));
  [rows,cols]=PIECE_LAYOUTS[p]; optRotate.checked=gp.rotate; rotating=gp.rotate; optHint.checked=gp.hint;
  selCategory.value = (gp.category==='mixed') ? 'flags' : gp.category; populateImages(); setCountEl.value=gp.setCount;
  const pick = Array.isArray(gp.items) ? findPresetByName(gp.items[0]) : PRESETS.flags[0];
  if(pick){ pendingImage = pick.url ? {url:pick.url,title:pick.name} : {wikiTitle:pick.wikiTitle,title:pick.name}; onApplyImage(); }
  if(isStudentMode) setTimeout(fitToScreen,0);
}

/* 세트 모드 */
function startSet(){ if(setActive) return;
  const n=Math.max(2,Math.min(10,Number(setCountEl.value)||3)); teamName=(teamNameEl.value||'무명 팀').trim();
  let list=resolveGradeQueue(); if(!list){ const pool=PRESETS[selCategory.value].slice(); list=[]; for(let i=0;i<n;i++){ if(pool.length===0) pool.push(...PRESETS[selCategory.value]); const j=(Math.random()*pool.length)|0; list.push(pool.splice(j,1)[0]); } }
  else if(list.length>n) list=list.slice(0,n);
  setQueue=list; setIdx=0; setAccum=0; setActive=true; spTeam.textContent=teamName; spProg.textContent=`${setIdx+1}/${setQueue.length}`; spAccum.textContent='00:00.0';
  setList.innerHTML=''; setPanel.classList.remove('hidden');
  const it=setQueue[0]; pendingImage = it.wikiTitle ? {wikiTitle:it.wikiTitle,title:it.name} : {url:it.url,title:it.name}; onApplyImage();
  setStatus('세트 모드 시작함.');
}
function stopSet(){ if(!setActive) return; setActive=false; setStatus(`세트 종료함. 팀 ${teamName} · 누적 ${fmt(setAccum)}`); }
function onSetSolved(elapsed){
  setAccum+=elapsed; const li=document.createElement('li'); li.textContent=`${imgTitle} — ${fmt(elapsed)}`; setList.appendChild(li);
  spAccum.textContent=fmt(setAccum); setIdx++;
  if(setIdx<setQueue.length){ spProg.textContent=`${setIdx+1}/${setQueue.length}`; setTimeout(()=>{ const it=setQueue[setIdx]; pendingImage = it.wikiTitle ? {wikiTitle:it.wikiTitle,title:it.name} : {url:it.url,title:it.name}; onApplyImage(); },600);
  } else { setActive=false; spProg.textContent=`${setQueue.length}/${setQueue.length}`; const liTotal=document.createElement('li'); liTotal.className='mt-1 font-semibold'; liTotal.textContent=`합계 — ${fmt(setAccum)}`; setList.appendChild(liTotal); setStatus(`세트 완료함. 팀 ${teamName} · 누적 ${fmt(setAccum)}`,true); }
}

/* 최근 이미지 */
function saveRecent(url,title){ try{ const k='puzzle_recent_imgs'; const arr=JSON.parse(localStorage.getItem(k)||'[]'); const filtered=arr.filter(it=>it.url!==url); filtered.unshift({url,title}); localStorage.setItem(k,JSON.stringify(filtered.slice(0,8))); }catch{} }
function loadRecent(){ try{ return JSON.parse(localStorage.getItem('puzzle_recent_imgs')||'[]'); }catch{ return []; } }
function deleteRecent(url){ try{ const k='puzzle_recent_imgs'; const arr=JSON.parse(localStorage.getItem(k)||'[]'); localStorage.setItem(k,JSON.stringify(arr.filter(it=>it.url!==url))); renderRecent(); }catch{} }
function clearAllRecent(){ try{ localStorage.removeItem('puzzle_recent_imgs'); renderRecent(); toast('최근 이미지를 모두 삭제함.'); }catch{} }
function renderRecent(){
  const arr=loadRecent(); recentWrap.innerHTML='';
  arr.forEach(it=>{
    const chip=document.createElement('div'); chip.className='flex items-center gap-1 text-xs px-2 py-1 rounded border border-slate-300 bg-white';
    const btn=document.createElement('button'); btn.className='underline'; btn.textContent=it.title||it.url.split('/').pop(); btn.title=it.url;
    btn.addEventListener('click',()=>{ pendingImage={url:it.url,title:it.title||''}; onApplyImage(); });
    const del=document.createElement('button'); del.textContent='×'; del.className='ml-1 w-4 h-4 leading-3 text-red-600 hover:text-red-700'; del.title='삭제';
    del.addEventListener('click',()=>deleteRecent(it.url));
    chip.appendChild(btn); chip.appendChild(del); recentWrap.appendChild(chip);
  });
}

/* 이미지 적용 */
async function onApplyImage(){
  try{
    let url=null, sourcePage=null, title=pendingImage.title||'';
    if(pendingImage.blobUrl){ url=pendingImage.blobUrl; }
    else if(pendingImage.url){ url=pendingImage.url; }
    else if(pendingImage.wikiTitle){ const r=await resolveWikipediaImage(pendingImage.wikiTitle); url=r.src; sourcePage=r.fullurl||r.src; }
    if(!url) throw new Error('유효한 이미지가 없음');
    await safeApply(url, title, sourcePage);
  }catch(e){ console.warn('apply image failed', e); toast('⚠️ 이미지 정보를 불러오지 못함.'); }
}

/* 초기화 */
function resetAll(){
  stopTimer(); started=false; solved=false; revealOn=false; timerEl.textContent='00:00.0';
  selDifficulty.value='normal'; const d=DIFFICULTIES.normal;
  document.querySelectorAll('input[name="pieces"]').forEach(r=> r.checked=(Number(r.value)===d.pieces));
  [rows,cols]=PIECE_LAYOUTS[d.pieces]; optRotate.checked=d.rotate; rotating=d.rotate; optHint.checked=d.hint;
  optGrid.checked=true; optSound.checked=true; optTablet.checked=false;
  selCategory.value='flags'; populateImages(); const first=PRESETS.flags[0];
  selImage.selectedIndex=0; pendingImage={url:first.url,title:first.name}; onApplyImage();
  fileInput.value=''; urlInput.value=''; teamNameEl.value=''; setCountEl.value=6; selGrade.value='none'; currentGrade='none';
  reveal.style.display='none'; board.style.pointerEvents='auto'; btnReveal.textContent='정답 공개';
  setPanel.classList.add('hidden'); setList.innerHTML=''; spAccum.textContent='00:00.0';
  if(isStudentMode){ toggleMode(false); }
  toast('초기화 완료함.');
}

/* 학생/관리자 모드 & 화면 제어 */
function applyZoom(){ stageInner.style.setProperty('--stage-scale', zoom); document.documentElement.style.setProperty('--stage-scale', zoom); zoomLabel.textContent=`${Math.round(zoom*100)}%`; }
function setZoom(n){ zoom=Math.min(Z_MAX,Math.max(Z_MIN,Math.round(n*100)/100)); applyZoom(); }
function fitToScreen(){
  const boardRect=stageInner.getBoundingClientRect();
  const outerRect=stageOuter.getBoundingClientRect();
  const s=Math.max(0.5,Math.min(2,Math.min((outerRect.height-8)/(boardRect.height||1),(outerRect.width-8)/(boardRect.width||1))));
  setZoom(s);
}
function toggleFullscreen(){ const el=document.documentElement; if(!document.fullscreenElement) el.requestFullscreen?.(); else document.exitFullscreen?.(); }
function toggleMode(forceStudent){
  if(typeof forceStudent==='boolean') isStudentMode=forceStudent; else isStudentMode=!isStudentMode;
  document.body.classList.toggle('student', isStudentMode);
  studentToolbar.classList.toggle('hidden', !isStudentMode);
  btnToggleMode.textContent=isStudentMode?'관리자 모드':'학생 모드';
  if(isStudentMode){ setTimeout(()=>{ setZoom(1); fitToScreen(); },0); }
}

/* 퀴즈 */
function openQuiz(){
  const info=QUIZ_INFO[imgTitle]||{}; const fact=info.fact?`💡 정보: ${info.fact}`:'이미지와 관련된 사실을 찾아봄.';
  const q=info.q?`❓ 질문: ${info.q}`:'이 이미지는 어느 나라와 관련 있나?'; const a=info.a?`✅ 정답: ${info.a}`:'(함께 확인함.)';
  quizBody.innerHTML=`<p>${fact}</p><p>${q}</p><details class="mt-2"><summary class="cursor-pointer select-none">정답 보기</summary><p class="mt-1">${a}</p></details>`;
  quizOverlay.classList.remove('hidden');
}
function closeQuiz(){ quizOverlay.classList.add('hidden'); }

/* ========= 이벤트 ========= */
function bindAll(){
  populateImages(); renderRecent();

  selImage.addEventListener('change', ()=>{
    const opt=selImage.options[selImage.selectedIndex]; if(!opt) return;
    const kind=opt.dataset.kind;
    pendingImage = (kind==='url') ? {url:opt.value,title:opt.text} : {wikiTitle:opt.value,title:opt.text};
  });
  selCategory.addEventListener('change', ()=>{
    populateImages(); const opt=selImage.options[0]; if(!opt) return;
    pendingImage = (opt.dataset.kind==='url') ? {url:opt.value,title:opt.text} : {wikiTitle:opt.value,title:opt.text};
  });

  fileInput.addEventListener('change',e=>{ const f=e.target.files?.[0]; if(!f) return; const url=URL.createObjectURL(f); pendingImage={blobUrl:url,title:f.name}; });
  urlInput.addEventListener('change',()=>{ if(!urlInput.value) return; pendingImage={url:urlInput.value,title:'사용자 URL'}; });
  btnApplyImage.addEventListener('click', onApplyImage);

  document.querySelectorAll('input[name="pieces"]').forEach(r=> r.addEventListener('change', ()=>{ buildBoard(); markCustomIfChanged(); }));
  optHint.addEventListener('change', ()=>{ hint.classList.toggle('hide', !optHint.checked); markCustomIfChanged(); });
  optGrid.addEventListener('change', ()=>{ [...board.children].forEach(t=> t.style.border=optGrid.checked?'1px solid rgba(0,0,0,.08)':'none'); });
  optRotate.addEventListener('change', ()=>{ rotating=optRotate.checked; buildBoard(); markCustomIfChanged(); });
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
  quizOverlay.addEventListener('click',e=>{ if(e.target===quizOverlay) closeQuiz(); });

  btnSetStart.addEventListener('click', startSet);
  btnSetStop.addEventListener('click', stopSet);
  btnClearRecent.addEventListener('click', clearAllRecent);

  btnToggleMode.addEventListener('click', ()=> toggleMode());
  btnZoomOut?.addEventListener('click', ()=> setZoom(zoom - Z_STEP));
  btnZoomIn?.addEventListener('click', ()=> setZoom(zoom + Z_STEP));
  btnZoomReset?.addEventListener('click', ()=> setZoom(1));
  btnZoomFit?.addEventListener('click', fitToScreen);
  btnFullscreen?.addEventListener('click', toggleFullscreen);

  window.addEventListener('keydown', (e)=>{
    const mod=e.ctrlKey||e.metaKey; if(!isStudentMode) return;
    if(mod && (e.key==='='||e.key==='+')){ e.preventDefault(); setZoom(zoom+Z_STEP); }
    if(mod && e.key==='-'){ e.preventDefault(); setZoom(zoom-Z_STEP); }
    if(mod && e.key==='0'){ e.preventDefault(); setZoom(1); }
    if(!mod && (e.key==='f'||e.key==='F')){ e.preventDefault(); toggleFullscreen(); }
  });
  window.addEventListener('resize', ()=>{ if(isStudentMode) fitToScreen(); });
}

/* ========= 초기화 ========= */
function init(){
  // 기본 이미지 안전 적용
  safeApply(imgURL, imgTitle, imgURL);
  bindAll();
  applyDifficulty('normal');
  applyTheme('default');
  buildBoard();
  applyZoom();
}
window.addEventListener('load', init);
