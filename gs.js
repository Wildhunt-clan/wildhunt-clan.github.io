/* gs.js — загрузчик тир-листа из Google Таблицы (Wild Hunt) */
(function(){
  var SHEET_ID = '1m9uA9o1f6P9KBholq3eiAxIcy8foFrulZkrV6LiNmHw';
  var SH = encodeURIComponent('Импринты');
  var URLS = [
    'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?tqx=out:csv&sheet='+SH,
    'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?tqx=out:csv',
    'https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/export?format=csv'
  ];

  function parseCSV(text){
    var rows=[], row=[], cur='', q=false, i, ch;
    text = text.replace(/\r\n/g,'\n').replace(/\r/g,'\n');
    for(i=0;i<text.length;i++){
      ch=text[i];
      if(q){
        if(ch==='"'){ if(text[i+1]==='"'){cur+='"';i++;} else q=false; }
        else cur+=ch;
      }else{
        if(ch==='"') q=true;
        else if(ch===','){ row.push(cur); cur=''; }
        else if(ch==='\n'){ row.push(cur); rows.push(row); row=[]; cur=''; }
        else cur+=ch;
      }
    }
    row.push(cur); rows.push(row);
    return rows;
  }

  function norm(s){
    return String(s||'').replace(/[«»"'`]/g,'').replace(/№\s*\d+/g,'').replace(/\s+/g,' ').trim().toLowerCase();
  }
  function parseNum(v){
    var m = String(v==null?'':v).replace(/\s/g,'').replace(',','.').match(/-?\d+(\.\d+)?/);
    return m ? parseFloat(m[0]) : null;
  }
  function truthy(v){
    return /^(сп|sp|да|yes|y|1|\+|\+|-)$/i.test(String(v||'').trim());
  }

  function apply(text){
    if(!window.D || !D.data || !D.data.imprints || typeof IMP_RATE!=='object') return;
    var rows = parseCSV(text);
    if(!rows.length) return;
    // ищем строку заголовков
    var hi=-1, map={};
    for(var r=0;r<Math.min(rows.length,15);r++){
      var cells = rows[r].map(norm);
      var col={};
      cells.forEach(function(c,idx){
        if(c==='тир') col.tier=idx;
        else if(c==='балл'||c==='рейтинг'||c==='оценка'||c==='score') col.score=idx;
        else if(c==='импринт'||c==='название'||c==='имя') col.name=idx;
        else if(c==='герой') col.hero=idx;
        else if(c==='сп') col.sp=idx;
        else if(c==='диапазон'||c==='диап') col.rng=idx;
      });
      if(col.tier!=null && (col.score!=null||col.hero!=null||col.name!=null)){ hi=r; map=col; break; }
    }
    if(hi<0){ console.log('GS: не нашёл строку заголовков в таблице'); return; }

    // словари соответствий: герой -> герой, импринт -> герой
    var byHero={}, byImp={};
    Object.keys(IMP_RATE).forEach(function(h){ byHero[norm(h)]=h; });
    D.data.imprints.forEach(function(imp){ byImp[norm(imp.name)]=imp.hero; });

    var applied=0, missed=[];
    for(var r=hi+1;r<rows.length;r++){
      var c=rows[r];
      if(!c || !c.join('').trim()) continue;
      var tier = map.tier!=null ? String(c[map.tier]||'').trim().toUpperCase() : '';
      var score = map.score!=null ? parseNum(c[map.score]) : null;
      var name  = map.name!=null ? c[map.name] : '';
      var hero  = map.hero!=null ? c[map.hero] : '';
      var sp    = map.sp!=null ? truthy(c[map.sp]) : null;
      var rng   = map.rng!=null ? String(c[map.rng]||'').trim() : '';
      var key = null;
      if(hero && byHero[norm(hero)]) key=byHero[norm(hero)];
      if(!key && name){
        if(byHero[norm(name)]) key=byHero[norm(name)];
        else if(byImp[norm(name)]) key=byImp[norm(name)];
      }
      if(!key){ if(name||hero) missed.push((name||hero)+''); continue; }
      var cur = IMP_RATE[key];
      var rec = Object.assign({}, cur);
      if(tier) rec.tier = tier;
      if(score!=null) rec.score = score;
      if(sp!=null) rec.sp = sp;
      if(rng) rec.rng = rng;
      IMP_RATE[key] = rec;
      applied++;
    }
    console.log('GS: применено строк: '+applied);
    if(missed.length) console.log('GS: нет совпадения для: '+missed.join(', '));
    if(applied && typeof renderImpTier==='function') renderImpTier();
  }

  function next(i){
    if(i>=URLS.length){ console.log('GS: таблица недоступна, показаны встроенные данные'); return; }
    fetch(URLS[i]+('&_='+Date.now())).then(function(r){
      if(!r.ok) throw new Error('http '+r.status);
      return r.text();
    }).then(function(t){
      t = t.replace(/^\uFEFF/,'');
      if(t.charAt(0)==='<') throw new Error('не csv');
      apply(t);
    }).catch(function(){ next(i+1); });
  }
  next(0);
})();