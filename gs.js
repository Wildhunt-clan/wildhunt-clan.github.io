/* gs.js v8 (Wild Hunt) — импринты + тир-лист оружия из Google Таблиц */
(function(){
if(window.__GS_LOADED__)return;window.__GS_LOADED__=true;
try{window.gsApply=function(){};window.gsParseCSV=function(){return[];}}catch(e){}
var ID1='1m9uA9o1f6P9KBholq3eiAxIcy8foFrulZkrV6LiNmHw',
ID2='1dVroC9337CItITot7ZOMFIWW9bo61BBcKCIRAUaT4SE',
CKI='gs_imp_cache_v8',CKW='gs_weap_cache_v8',MKI='gs_miss_imp_v8',MKW='gs_miss_weap_v8';
function GV(id,sh){return 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:csv'+(sh?'&sheet='+encodeURIComponent(sh):'')}
function EX(id){return 'https://docs.google.com/spreadsheets/d/'+id+'/export?format=csv'}
var U1=[GV(ID1,'Лист1'),GV(ID1),EX(ID1)],U2=[GV(ID2,'Лист1'),GV(ID2),EX(ID2)];
var ALH={'thorkell':['torkell','torkel','torhwell'],'camazotz':['kamazotz','kamazots','kamazotc'],'fisher king':['korol rybak','rybiy korol','ribiy korol'],'sphinx':['sfinks'],'tlaloc':['tlalok','tlatok'],'xiwangmu':['si van mu','sivanmu','siwanmu','sivangmu'],'ankhesenamun':['ankhesenamon','anhesenamun','anhesenamon'],'zeus':['zevs'],'aphrodite':['afrodita','afrodite'],'ymir':['imir']};
var WAL={'ankh':'Анкх','aegis':'Эгида','art of war':'Искусство войны','bident':'Двузубец','excalibur':'Экскалибур','ame-no-nuboko':'Амэ-но-Нубоко','forgefire':'Пламя кузницы','grail':'Грааль','hrunting':'Хрунтинг','frunting':'Хрунтинг','mjolnir':'Мьёльнир','namsaru':'Намсару','gram':'Грам','tetsubo':'Тэцубо','katana':'Катана','naginata':'Нагината','khopesh':'Хопеш','lyra':'Лира','pelta':'Пельта','dagger':'Кинжал','macuahuitl':'Макуауитль','han jian':'Хань цзянь','fan axe':'Веерный топор','ox horn':'Бычий рог','golden bow':'Золотой лук','divine bow':'Божественный лук','galatine':'Галатин','hildglans':'Хильдганс','hildgans':'Хильдганс','tecpatl':'Текпатль','tepoztopilli':'Тепостопилли','infected claws':'Заражённые когти','fangtian huanji':'Фантянь хуацзи'};
var FAC={'aaru':'Аару','avalon':'Авалон','idzumo':'Идзумо','izumo':'Идзумо','asgard':'Асгард','olympus':'Олимп','olymp':'Олимп','tyan':'Тянь','tian':'Тянь','ekur':'Экур','omeyocan':'Омейокан','iriy':'Ирий','viraj':'Вирадж'};
var RAR={legendary:'Легендарное',epic:'Эпическое',rare:'Редкое'};
var TG={'hero with acc':'герой с ТОЧ','boss':'боссы','mobs':'мобы','do':'доб.','invok':'инвок','tank':'танки'};
var WOR=['S+','S','A','B','C','D'];
function T(m){var t=document.createElement('div');t.textContent=m;t.style.cssText='position:fixed;bottom:70px;left:50%;transform:translateX(-50%);background:#2b2113;border:1px solid #c8963e;color:#f4d488;padding:10px 16px;border-radius:10px;z-index:9999;font-size:14px;max-width:92vw;white-space:pre-wrap';document.body.appendChild(t);setTimeout(function(){t.remove()},10000)}
function CSV(x){var r=[],w=[],c='',q=0,i,ch;x=String(x).replace(/^\uFEFF/,'');for(i=0;i<x.length;i++){ch=x[i];if(q){if(ch=='"'){if(x[i+1]=='"'){c+='"';i++}else q=0}else c+=ch}else{if(ch=='"')q=1;else if(ch==','){w.push(c);c=''}else if(ch=='\n'){w.push(c);r.push(w);w=[];c=''}else c+=ch}}w.push(c);r.push(w);return r}
function N(s){return String(s==null?'':s).toLowerCase().replace(/[«»"'`]/g,'').replace(/[^a-zа-яё0-9]+/g,' ').replace(/\s+/g,' ').trim()}
var TR={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
function K(s){return N(s).replace(/[а-яё]/g,function(c){return TR[c]||c})}
function LEV(a,b){var m=a.length,n=b.length;if(!m)return n;if(!n)return m;var p=new Array(n+1),u=new Array(n+1),i,j,t;for(j=0;j<=n;j++)p[j]=j;for(i=1;i<=m;i++){u[0]=i;for(j=1;j<=n;j++)u[j]=Math.min(p[j]+1,u[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));t=p;p=u;u=t}return p[n]}
function NUM(v){var m=String(v==null?'':v).replace(/\s/g,'').replace(',','.').match(/-?\d+(\.\d+)?/);return m?parseFloat(m[0]):null}
function ESC(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function MISS(key,txt){try{var ts=+localStorage.getItem(key)||0;if(Date.now()-ts>432e5){localStorage.setItem(key,String(Date.now()));T(txt)}}catch(e){}}
/* ---------- ИМПРИНТЫ ---------- */
function hdrI(rs){for(var r=0;r<10&&r<rs.length;r++){var cs=rs[r].map(N),m={},c;for(c=0;c<cs.length;c++){var h=cs[c];if(h=='tier'||h=='тир')m.tier=c;else if(h=='rating'||h=='балл'||h=='рейтинг')m.score=c;else if(h=='name'||h=='импринт'||h=='название')m.name=c;else if(h=='hero'||h=='герой')m.hero=c;else if(h=='сп'||h=='sp')m.sp=c;else if(h=='диапазон'||h=='range')m.rng=c}if(m.tier!=null&&(m.score!=null||m.name!=null))return{h:r,m:m}}return null}
function spd(rs,h,m){var a={},b={},r,c,v,n=Math.min(rs.length,h+60);for(r=h+1;r<n;r++){var cs=rs[r]||[];for(c=0;c<cs.length;c++){if([m.tier,m.score,m.name,m.hero].indexOf(c)>=0)continue;if(String(rs[h][c]||'').trim())continue;v=String(cs[c]||'').trim().toLowerCase();if(!v)continue;if(v=='сп'||v=='sp')a[c]=(a[c]||0)+1;else if(/\d/.test(v)&&/[-<>~]/.test(v))b[c]=(b[c]||0)+1}}var x=-1,y=-1,p=0,q=0;for(c in a)if(a[c]>p){p=a[c];x=+c}for(c in b)if(b[c]>q){q=b[c];y=+c}if(x>=0&&m.sp==null)m.sp=x;if(y>=0&&m.rng==null)m.rng=y}
function mI(s,d){var n=N(s),k=K(s),a,j;if(n&&(d[n]||d[k]))return d[n]||d[k];for(a in ALH)if(a===n||a===k){for(j=0;j<ALH[a].length;j++)if(d[ALH[a][j]])return d[ALH[a][j]]}return null}
var okI=false;
function applyImp(x,silent){if(typeof IMP_RATE!='object'||!IMP_RATE)return;var rs=CSV(x);if(rs.length<2)return;var f=hdrI(rs);if(!f){if(!silent)T('GS: шапка импринтов не найдена');return}var m=f.m;spd(rs,f.h,m);var d={},used={},miss=[],n=0;Object.keys(IMP_RATE).forEach(function(k){d[N(k)]=k;d[K(k)]=k});try{(window.D&&D.data&&D.data.imprints||[]).forEach(function(im){if(im&&im.name){d[N(im.name)]=im.hero;d[K(im.name)]=im.hero}})}catch(e){}
for(var r=f.h+1;r<rs.length;r++){var c=rs[r];if(!c||!c.join('').trim())continue;var pn=m.name!=null?N(c[m.name]):'',pt=m.tier!=null?String(c[m.tier]||'').trim().toLowerCase():'';if(pt=='tier'||pt=='тир')break;var tier=pt.toUpperCase(),sc=m.score!=null?NUM(c[m.score]):null,nm=m.name!=null?(c[m.name]||''):'',hr=m.hero!=null?(c[m.hero]||''):'',sp=null;if(m.sp!=null){var sv=String(c[m.sp]||'').trim().toLowerCase();sp=(sv=='сп'||sv=='sp')}var rg=m.rng!=null?String(c[m.rng]||'').trim():'',key=hr?mI(hr,d):null;if(!key&&nm)key=mI(nm,d);if(!key){if(nm||hr)miss.push(nm||hr);continue}if(used[key])continue;used[key]=1;var rc=Object.assign({},IMP_RATE[key]);if(tier)rc.tier=tier;if(sc!=null)rc.score=sc;if(sp!=null)rc.sp=sp;if(rg)rc.rng=rg;IMP_RATE[key]=rc;n++}
if(n){okI=true;try{localStorage.setItem(CKI,x)}catch(e){}if(typeof renderImpTier=='function')renderImpTier()}
if(miss.length&&!silent)MISS(MKI,'GS импринты: не найдены на сайте: '+miss.slice(0,6).join(', '))}
/* ---------- ОРУЖИЕ ---------- */
var WDATA=[],RAW='',okW=false;
function parseWeap(txt){var rs=CSV(txt),sec='',H=null,out=[];
for(var r=0;r<rs.length;r++){var c=rs[r]||[];if(!c.join('').trim())continue;
var sm=(c.map(N).join(' ')).match(/(legendary|epic|rare)\s+weapon/);
if(sm){sec=sm[1];H=null;continue}
var idx={},tn=0;for(var i=0;i<c.length;i++){var h=N(c[i]);if(h=='tier'||h=='тир'){idx.tier=i;tn=1}else if(h=='name')idx.name=i;else if(h=='rating'||h=='балл'||h=='рейтинг')idx.rating=i;else if(h=='faction'||h=='фракция')idx.faction=i;else if(h=='cd')idx.cd=i;else if(h=='features')idx.features=i}
if(tn&&idx.name!=null){H=idx;H.hn=c.map(N);continue}
if(!sec||!H)continue;
var tier=String(c[H.tier]||'').trim().toUpperCase(),nm=H.name!=null?String(c[H.name]||'').trim():'';
if(!tier||!nm||/^(tier|тир)$/.test(N(tier)))continue;
var score=H.rating!=null?NUM(c[H.rating]):null,fac=H.faction!=null?String(c[H.faction]||'').trim():'',tags=[],rng='';
for(var k=0;k<c.length;k++){if(k==H.tier||k==H.name||k==H.rating||k==H.faction||k==H.cd||k==H.features)continue;var v=String(c[k]||'').trim();if(!v)continue;var h=(H.hn&&H.hn[k])||'';
if(/^[<>~]?\s*\d/.test(v)){if(!rng)rng=v;continue}
if(h)tags.push((TG[h]||h)+((v=='yes'||v=='да')?'':': '+v))}
out.push({tier:tier,name:nm,score:score,fac:fac,rar:RAR[sec]||'',tags:tags,rng:rng})}
return out}
function applyWeap(silent){var ws=(window.D&&D.data&&D.data.weapons)||[];if(!ws.length||!WDATA.length)return;var used={},n=0,miss=[];
WDATA.forEach(function(rec){var w=null,bd=99;
var tgt=WAL[N(rec.name)];
if(tgt)ws.forEach(function(x,i){if(!used[i]&&N(x.name)===N(tgt)){w=i;bd=-1}});
if(w==null)ws.forEach(function(x,i){if(used[i])return;var d=Math.min(LEV(K(rec.name),K(x.name)),LEV(N(rec.name),N(x.name)));var lim=K(x.name).length<=5?1:2;if(d<=lim&&d<bd){bd=d;w=i}});
if(w==null&&rec.rar&&rec.fac){var cands=[],fk=N(rec.fac).replace('idzumo','izumo');ws.forEach(function(x,i){if(used[i])return;if(N(x.rarity)!==N(rec.rar))return;var xf=N(x.faction);if((FAC[fk]&&xf===N(FAC[fk]))||LEV(K(fk),K(xf))<=2)cands.push(i)});
if(cands.length===1)w=cands[0];else if(cands.length>1){var bb=99,bi=null;cands.forEach(function(i){var d=LEV(K(rec.name),K(ws[i].name));if(d<bb){bb=d;bi=i}});w=bi}}
if(w==null){miss.push(rec.name);return}
used[w]=1;var x=ws[w];x.gs={tier:rec.tier,score:rec.score,rng:rec.rng,tags:rec.tags};n++});
if(n){okW=true;try{localStorage.setItem(CKW,RAW)}catch(e){}wPanel(true);patchRows()}
if(miss.length&&!silent)MISS(MKW,'GS оружие: не сшиты с сайтом: '+miss.slice(0,6).join(', '))}
function tierCol(t){try{if(window.D&&D.tiersMeta)return D.tiersMeta[t]||'#888'}catch(e){}return '#888'}
function badge(t){if(typeof tierBadge=='function'){try{return tierBadge(t)}catch(e){}}var c=tierCol(t);return '<span class="tierbadge" style="color:'+c+';border:2px solid '+c+'88;background:'+c+'18;padding:2px 10px;border-radius:8px;font-size:13px">'+ESC(t)+'</span>'}
var WTF={tier:'Все',q:''};
window.wSetTier=function(t){WTF.tier=t;wRenderList()};
window.wSetQ=function(){var i=document.getElementById('wtq');if(i)WTF.q=i.value;wRenderList()};
function rowsHtml(list){return list.map(function(w){var g=w.gs;
return '<tr><td>'+badge(g.tier)+'</td><td><b style="color:var(--gold2)">'+(g.score!=null?String(g.score).replace('.',','):'—')+'</b>'+(g.rng?'<div class="muted">'+ESC(g.rng)+'</div>':'')+'</td><td><b>'+ESC(w.name)+'</b></td><td><span class="pill">'+ESC(w.rarity||'')+'</span></td><td>'+ESC(w.faction||'')+'</td><td class="muted" style="font-size:12.5px;max-width:260px">'+ESC((g.tags||[]).join(', '))+'</td></tr>'}).join('')}
function wRenderList(){var el=document.getElementById('wt-tier');if(!el)return;var tb=document.getElementById('wtTBody');if(!tb)return;
var all=(window.D&&D.data&&D.data.weapons||[]).filter(function(w){return w&&w.gs});
var list=all.filter(function(w){if(WTF.tier!=='Все'&&w.gs.tier!==WTF.tier)return false;if(WTF.q){var q=WTF.q.toLowerCase(),s=(w.name+' '+(w.faction||'')+' '+(w.rarity||'')+' '+(w.gs.tags||[]).join(' ')).toLowerCase();if(s.indexOf(q)<0)return false}return true});
list.sort(function(a,b){return (b.gs.score||0)-(a.gs.score||0)||String(a.gs.tier).localeCompare(String(b.gs.tier))});
var counts={};all.forEach(function(w){counts[w.gs.tier]=(counts[w.gs.tier]||0)+1});
var chips=['Все'].concat(WOR).filter(function(t){return t==='Все'||counts[t]}).map(function(t){var on=WTF.tier===t?' on':'';var col=tierCol(t);var style=t==='Все'?'':' style="color:'+col+';border-color:'+col+'55"';var n=t==='Все'?all.length:(counts[t]||0);return '<button class="'+on+'"'+style+' onclick="wSetTier(\''+t+'\')">'+t+' <span class="n">'+n+'</span></button>'}).join('');
var ch=document.getElementById('wtChips');if(ch)ch.innerHTML=chips;
tb.innerHTML=rowsHtml(list);
var cnt=document.getElementById('wtCnt');if(cnt)cnt.textContent='('+list.length+')'}
function wPanel(force){if(!(window.D&&D.data&&D.data.weapons))return;
var host=document.getElementById('wt');if(!host)return;
var panel=host.closest?host.closest('.panel'):null;if(!panel)return;
var el=document.getElementById('wt-tier');
if(!el){el=document.createElement('div');el.id='wt-tier';panel.parentNode.insertBefore(el,panel);
el.innerHTML='<div class="panel"><h3>Тир-лист оружия <span class="muted" id="wtCnt"></span></h3><div class="toolrow"><input id="wtq" placeholder="Поиск: название, фракция, метка…" style="min-width:260px" oninput="wSetQ()"><div class="subtabs" id="wtChips"></div></div><div style="overflow-x:auto;max-height:64vh;overflow-y:auto"><table><thead><tr><th>Тир</th><th>Оценка</th><th>Название</th><th>Редкость</th><th>Фракция</th><th>Кому и куда</th></tr></thead><tbody id="wtTBody"></tbody></table></div><div class="muted" style="margin-top:8px">Оценки и метки — из Google Таблицы аналитика. «герой с ТОЧ» — под героя с точностью; «боссы»/«мобы» — где применять в подземельях.</div></div>'}
wRenderList()}
function patchRows(){var body=document.getElementById('wtbody');if(!body)return;var ws=(window.D&&D.data&&D.data.weapons)||[];if(!ws.length)return;
for(var i=0;i<body.children.length&&i<ws.length;i++){var tr=body.children[i],w=ws[i];
if(!w||!w.gs||tr.getAttribute('data-gs')==='1')continue;tr.setAttribute('data-gs','1');
var td=tr.querySelector('td');if(!td)continue;
var d=document.createElement('div');d.style.cssText='margin-top:3px;font-size:12px;color:#f4d488;white-space:normal';
var p=[];if(w.gs.tier)p.push('тир '+w.gs.tier);if(w.gs.score!=null)p.push(String(w.gs.score).replace('.',',')+' баллов');if(w.gs.rng)p.push(w.gs.rng);if(w.gs.tags&&w.gs.tags.length)p.push(w.gs.tags.join(', '));
d.textContent=p.join(' · ');td.appendChild(d)}}
setInterval(function(){try{if(!document.getElementById('wt-tier')&&document.getElementById('wt'))wPanel()}catch(e){}try{patchRows()}catch(e){}},2000);
/* ---------- ЗАПУСК ---------- */
function boot(){try{var ci=localStorage.getItem(CKI);if(ci)applyImp(ci,true)}catch(e){}
try{var cw=localStorage.getItem(CKW);if(cw){RAW=cw;WDATA=parseWeap(cw);applyWeap(true)}}catch(e){}
var i1=0,i2=0;
(function n1(){if(i1>=U1.length)return;fetch(U1[i1]+'&_='+Date.now()).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){t=String(t).replace(/^\uFEFF/,'');if(t[0]=='<')throw 0;applyImp(t,false)}).catch(function(){i1++;n1()})})();
(function n2(){if(i2>=U2.length)return;fetch(U2[i2]+'&_='+Date.now()).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){t=String(t).replace(/^\uFEFF/,'');if(t[0]=='<')throw 0;RAW=t;WDATA=parseWeap(t);applyWeap(false)}).catch(function(){i2++;n2()})})()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
