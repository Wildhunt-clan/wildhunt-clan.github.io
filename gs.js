/* gs.js v6 (Wild Hunt) */
(function(){
if(window.__GS_LOADED__)return;window.__GS_LOADED__=true;
try{window.gsApply=function(){};window.gsParseCSV=function(){return[];};}catch(e){}
var ID='1m9uA9o1f6P9KBholq3eiAxIcy8foFrulZkrV6LiNmHw',
U=['https://docs.google.com/spreadsheets/d/'+ID+'/gviz/tq?tqx=out:csv&sheet='+encodeURIComponent('Лист1'),
'https://docs.google.com/spreadsheets/d/'+ID+'/gviz/tq?tqx=out:csv',
'https://docs.google.com/spreadsheets/d/'+ID+'/export?format=csv'],
CK='gs_cache_v6',
AL={'thorkell':['torkell','torkel','torhwell'],'camazotz':['kamazotz','kamazots','kamazotc'],'fisher king':['korol rybak','rybiy korol','ribiy korol'],'sphinx':['sfinks'],'tlaloc':['tlalok','tlatok'],'xiwangmu':['si van mu','sivanmu','siwanmu','sivangmu'],'ankhesenamun':['ankhesenamon','anhesenamun','anhesenamon'],'zeus':['zevs'],'aphrodite':['afrodita','afrodite'],'ymir':['imir']};
function T(m){var t=document.createElement('div');t.textContent=m;t.style.cssText='position:fixed;bottom:70px;left:50%;transform:translateX(-50%);background:#2b2113;border:1px solid #c8963e;color:#f4d488;padding:10px 16px;border-radius:10px;z-index:9999;font-size:14px;max-width:92vw;white-space:pre-wrap';document.body.appendChild(t);setTimeout(function(){t.remove()},10000)}
function CSV(x){var r=[],w=[],c='',q=0,i,ch;x=String(x).replace(/^\uFEFF/,'');for(i=0;i<x.length;i++){ch=x[i];if(q){if(ch=='"'){if(x[i+1]=='"'){c+='"';i++}else q=0}else c+=ch}else{if(ch=='"')q=1;else if(ch==','){w.push(c);c=''}else if(ch=='\n'){w.push(c);r.push(w);w=[];c=''}else c+=ch}}w.push(c);r.push(w);return r}
function N(s){return String(s==null?'':s).toLowerCase().replace(/[«»"'`]/g,'').replace(/[^a-zа-яё0-9]+/g,' ').replace(/\s+/g,' ').trim()}
var TR={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'i','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'};
function K(s){return N(s).replace(/[а-яё]/g,function(c){return TR[c]||c})}
function NUM(v){var m=String(v==null?'':v).replace(/\s/g,'').replace(',','.').match(/-?\d+(\.\d+)?/);return m?parseFloat(m[0]):null}
function H(rs){for(var r=0;r<10&&r<rs.length;r++){var cs=rs[r].map(N),m={},c;for(c=0;c<cs.length;c++){var h=cs[c];if(h=='tier'||h=='тир')m.tier=c;else if(h=='rating'||h=='балл'||h=='рейтинг')m.score=c;else if(h=='name'||h=='импринт'||h=='название')m.name=c;else if(h=='hero'||h=='герой')m.hero=c;else if(h=='сп'||h=='sp')m.sp=c;else if(h=='диапазон'||h=='range')m.rng=c}if(m.tier!=null&&(m.score!=null||m.name!=null))return{h:r,m:m}}return null}
function SP(rs,h,m){var a={},b={},r,c,v,n=Math.min(rs.length,h+60);for(r=h+1;r<n;r++){var cs=rs[r]||[];for(c=0;c<cs.length;c++){if([m.tier,m.score,m.name,m.hero].indexOf(c)>=0)continue;if(String(rs[h][c]||'').trim())continue;v=String(cs[c]||'').trim().toLowerCase();if(!v)continue;if(v=='сп'||v=='sp')a[c]=(a[c]||0)+1;else if(/\d/.test(v)&&/[-<>~]/.test(v))b[c]=(b[c]||0)+1}}var x=-1,y=-1,p=0,q=0;for(c in a)if(a[c]>p){p=a[c];x=+c}for(c in b)if(b[c]>q){q=b[c];y=+c}if(x>=0&&m.sp==null)m.sp=x;if(y>=0&&m.rng==null)m.rng=y}
function M(s,d){var n=N(s),k=K(s),a,j;if(n&&(d[n]||d[k]))return d[n]||d[k];for(a in AL)if(a===n||a===k){for(j=0;j<AL[a].length;j++)if(d[AL[a][j]])return d[AL[a][j]]}return null}
var ok=false;
function A(txt,silent){if(typeof IMP_RATE!='object'||!IMP_RATE)return;var rs=CSV(txt);if(rs.length<2)return;var f=H(rs);if(!f){if(!silent)T('GS: шапка не найдена');return}var m=f.m;SP(rs,f.h,m);var d={},miss=[],n=0;Object.keys(IMP_RATE).forEach(function(k){d[N(k)]=k;d[K(k)]=k});try{(window.D&&D.data&&D.data.imprints||[]).forEach(function(im){if(im&&im.name){d[N(im.name)]=im.hero;d[K(im.name)]=im.hero}})}catch(e){}
for(var r=f.h+1;r<rs.length;r++){var c=rs[r];if(!c||!c.join('').trim())continue;var pn=m.name!=null?N(c[m.name]):'',pt=m.tier!=null?String(c[m.tier]||'').trim().toLowerCase():'';if(pt=='tier'||pt=='тир'||(!pt&&!pn&&m.score!=null&&String(c[m.score]||'').trim().toLowerCase()=='rating'))break;var tier=pt.toUpperCase(),sc=m.score!=null?NUM(c[m.score]):null,nm=m.name!=null?(c[m.name]||''):'',hr=m.hero!=null?(c[m.hero]||''):'',sp=null;if(m.sp!=null){var sv=String(c[m.sp]||'').trim().toLowerCase();sp=(sv=='sp'||sv=='сп')}var rg=m.rng!=null?String(c[m.rng]||'').trim():'',key=hr?M(hr,d):null;if(!key&&nm)key=M(nm,d);if(!key){if(nm||hr)miss.push(nm||hr);continue}var rc=Object.assign({},IMP_RATE[key]);if(tier)rc.tier=tier;if(sc!=null)rc.score=sc;if(sp!=null)rc.sp=sp;if(rg)rc.rng=rg;IMP_RATE[key]=rc;n++}
if(n){ok=true;try{localStorage.setItem(CK,JSON.stringify({t:Date.now(),d:txt}))}catch(e){}if(typeof renderImpTier=='function')renderImpTier()}
if(miss.length&&!silent){try{var ts=+localStorage.getItem('gs_miss_v6')||0;if(Date.now()-ts>432e5){localStorage.setItem('gs_miss_v6',String(Date.now()));T('GS: не найдены на сайте: '+miss.slice(0,6).join(', '))}}catch(e){}}}
var i=0;
function GO(){try{var c=JSON.parse(localStorage.getItem(CK)||'null');if(c&&c.d)A(c.d,true)}catch(e){}
(function nx(){if(i>=U.length){if(!ok)T('GS: таблица недоступна — проверьте доступ «по ссылке»');return}fetch(U[i]+'&_='+Date.now()).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){t=String(t).replace(/^\uFEFF/,'');if(t[0]=='<')throw 0;A(t,false)}).catch(function(){i++;nx()})})()}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',GO);else GO();
})();
