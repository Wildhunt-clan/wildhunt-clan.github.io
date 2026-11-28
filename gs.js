/* gs.js v3 — загрузчик тир-листа из Google Таблицы (Wild Hunt) */
(function(){
  if(window.__GS_LOADED__) return;
  window.__GS_LOADED__=true;
  var SHEET_ID='1m9uA9o1f6P9KBholq3eiAxIcy8foFrulZkrV6LiNmHw';
  var SHEET=encodeURIComponent('Лист1');
  var URLS=[
    'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?tqx=out:csv&sheet='+SHEET,
    'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?tqx=out:csv',
    'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/export?format=csv'
  ];
  var CK='gs_tier_cache_v3', CMS=10*60*1000;

  /* словарь: как в таблице → как на сайте */
  var ALIAS={
    'thorkell':['torkell','torkel','torhwell'],
    'camazotz':['kamazotz','kamazots','kamazotc'],
    'fisher king':['rybiy korol','ribiy korol','rybiy koroly','rybak korol'],
    'sphinx':['sfinks'],
    'tlaloc':['tlalok','tlatok'],
    'xiwangmu':['siwanmu','si van mu','siwamgu','sivanmu']
  };

  function toast(msg,ms){
    var t=document.createElement('div');
    t.textContent=msg;
    t.style.cssText='position:fixed;bottom:70px;left:50%;transform:translateX(-50%);background:#2b2113;border:1px solid #c8963e;color:#f4d488;padding:10px 18px;border-radius:10px;z-index:9999;font-size:14px;max-width:92vw;box-shadow:0 8px 30px #000c;white-space:pre-wrap';
    document.body.appendChild(t);
    setTimeout(function(){t.remove();},ms||6000);
  }
  function parseCSV(text){
    var rows=[],row=[],cur='',q=false,i,ch;
    text=text.replace(/^\uFEFF/,'').replace(/\r\n/g,'\n').replace(/\r/g,'\n');
    for(i=0;i<text.length;i++){ch=text[i];
      if(q){ if(ch==='"'){ if(text[i+1]==='"'){cur+='"';i++;} else q=false; } else cur+=ch; }
      else{ if(ch==='"') q=true;
        else if(ch===','){row.push(cur);cur='';}
        else if(ch==='\n'){row.push(cur);rows.push(row);row=[];cur='';}
        else cur+=ch; } }
    row.push(cur);rows.push(row);
    return rows;
  }
  function norm(s){return String(s==null?'':s).replace(/[«»"'`]/g,'').replace(/№\s*\d+/g,'').replace(/\s+/g,' ').trim().toLowerCase();}
  var TR={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
  function tr(s){return s.replace(/[а-яё]/g,function(ch){return TR[ch]||ch;});}
  function key2(s){return tr(norm(s));}
  function matchKey(s,dict){
    var n=norm(s),k=key2(s);
    if(dict[n]||dict[k]) return dict[n]||dict[k];
    for(var a in ALIAS){ if(a===n||a===k){
      for(var j=0;j<ALIAS[a].length;j++) if(dict[ALIAS[a][j]]) return dict[ALIAS[a][j]];
    }}
    return null;
  }
  function parseNum(v){var m=String(v==null?'':v).replace(/\s/g,'').replace(',','.').match(/-?\d+(\.\d+)?/);return m?parseFloat(m[0]):null;}

  function findHeader(rows){
    for(var r=0;r<Math.min(rows.length,10);r++){
      var cells=rows[r].map(norm),col={};
      for(var c=0;c<cells.length;c++){var h=cells[c];
        if(h==='tier'||h==='тир') col.tier=c;
        else if(h==='rating'||h==='балл'||h==='рейтинг'||h==='оценка') col.score=c;
        else if(h==='name'||h==='импринт'||h==='название'||h==='имя') col.name=c;
        else if(h==='hero'||h==='герой') col.hero=c;
        else if(h==='сп'||h==='sp') col.sp=c;
        else if(h==='диапазон'||h==='range') col.rng=c;
      }
      if(col.tier!=null&&(col.score!=null||col.name!=null)) return {hi:r,map:col};
    }
    return null;
  }
  function autodetect(rows,hi,map){
    var spCnt={},rngCnt={},r,c,v,n=Math.min(rows.length,hi+60);
    for(r=hi+1;r<n;r++){var cells=rows[r]||[];
      for(c=0;c<cells.length;c++){
        if(c===map.tier||c===map.score||c===map.name||c===map.hero) continue;
        if(String(rows[hi][c]||'').trim()) continue;
        v=String(cells[c]==null?'':cells[c]).trim().toLowerCase();
        if(!v) continue;
        if(v==='сп'||v==='sp') spCnt[c]=(spCnt[c]||0)+1;
        else if(/\d/.test(v)&&/[-<>~]/.test(v)) rngCnt[c]=(rngCnt[c]||0)+1;
      }}
    var bS=-1,bR=-1,s=0,q=0;
    for(c in spCnt) if(spCnt[c]>s){s=spCnt[c];bS=+c;}
    for(c in rngCnt) if(rngCnt[c]>q){q=rngCnt[c];bR=+c;}
    if(bS>=0&&map.sp==null) map.sp=bS;
    if(bR>=0&&map.rng==null) map.rng=bR;
  }

  function apply(text,silent){
    if(typeof IMP_RATE!=='object'||!IMP_RATE){if(!silent)toast('GS: IMP_RATE не найден');return;}
    var rows=parseCSV(text);
    if(rows.length<2){if(!silent)toast('GS: таблица пустая');return;}
    var f=findHeader(rows);
    if(!f){if(!silent)toast('GS: шапка не найдена! Первая строка: '+rows[0].join(' | ').slice(0,150),12000);return;}
    var map=f.map; autodetect(rows,f.hi,map);
    var byHero={},missed=[],applied=0,wukong=null;
    Object.keys(IMP_RATE).forEach(function(k){byHero[norm(k)]=k;byHero[key2(k)]=k;});
    try{(window.D&&D.data&&D.data.imprints||[]).forEach(function(im){if(im&&im.name){byHero[norm(im.name)]=im.hero;byHero[key2(im.name)]=im.hero;}});}catch(e){}
    for(var r=f.hi+1;r<rows.length;r++){
      var c=rows[r];
      if(!c||!c.join('').trim()) continue;
      /* вторая секция со старыми данными — стоп */
      var probe=c[map.tier];
      if(map.name!=null){
        var pn=norm(c[map.name]);
        var pt=String(probe==null?'':probe).trim().toLowerCase();
        if((pt==='tier'||pt==='тир')||(!pt&&!pn&&String(c[map.score]==null?'':c[map.score]).trim().toLowerCase()==='rating')){
          break;
        }
      }
      var tier=map.tier!=null?String(c[map.tier]==null?'':c[map.tier]).trim().toUpperCase():'';
      var score=map.score!=null?parseNum(c[map.score]):null;
      var name=map.name!=null?(c[map.name]||''):'';
      var hero=map.hero!=null?(c[map.hero]||''):'';
      var sp=null;
      if(map.sp!=null){var sv=String(c[map.sp]||'').trim().toLowerCase(); sp=(sv==='sp'||sv==='сп');}
      var rng=map.rng!=null?String(c[map.rng]||'').trim():'';
      var key=null;
      if(hero) key=matchKey(hero,byHero);
      if(!key&&name) key=matchKey(name,byHero);
      if(!key){ if(name||hero) missed.push(name||hero); continue; }
      var rec=Object.assign({},IMP_RATE[key]);
      if(tier) rec.tier=tier;
      if(score!=null) rec.score=score;
      if(sp!=null) rec.sp=sp;
      if(rng) rec.rng=rng;
      IMP_RATE[key]=rec; applied++;
      if(key2(key).indexOf('wukong')>=0||key2(name).indexOf('wukong')>=0) wukong=score;
    }
    if(!silent){
      if(missed.length) toast('GS: нет совпадения: '+missed.slice(0,6).join(', '),12000);
      else if(wukong!=null&&wukong!==13) toast('GS: Sun Wukong: '+wukong,9000);
    }
    if(applied){
      try{localStorage.setItem(CK,JSON.stringify({t:Date.now(),d:text}));}catch(e){}
      if(typeof renderImpTier==='function') renderImpTier();
    }
  }
  var i=0,started=false;
  function next(silent){
    if(i>=URLS.length){ if(!silent) toast('GS: таблица недоступна — проверьте доступ «по ссылке»'); return; }
    fetch(URLS[i]+('&_='+Date.now())).then(function(r){
      if(!r.ok) throw new Error('http '+r.status);
      return r.text();
    }).then(function(t){
      t=String(t).replace(/^\uFEFF/,'');
      if(t.charAt(0)==='<') throw new Error('не CSV');
      apply(t,silent);
    }).catch(function(){ i++; next(silent); });
  }
  function start(){
    try{var c=JSON.parse(localStorage.getItem(CK)||'null');
      if(c&&c.d&&Date.now()-c.t<CMS){apply(c.d,true);return;}
    }catch(e){}
    next(false);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start);
  else start();
})();
