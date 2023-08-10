(()=>{var N=new function(){this.seed=Math.random(),this.next=function(){return this.gen()/2147483647},this.gen=function(){return this.seed=this.seed*16807%2147483647}};function x(t){t.clearRect(0,0,t.canvas.width,t.canvas.height)}function w(t,e,n,l,i){for(let r=0,s=t.length;r<s;r++)for(let h=0,p=t[r].length;h<p;h++)t[r][h]&&we(r+e,h+n,i!==void 0?i:t[r][h],l)}function we(t,e,n,l){t=t*o.cellSize,t=~~t,e=~~e*o.cellSize-2*o.cellSize,l.drawImage(z,n*o.cellSize,0,o.cellSize,o.cellSize,t,e,o.cellSize,o.cellSize)}function U(t,e,n){n=n||1;let l=[];for(let i=t;i<e;i+=n)l.push(i);return l}function te(t,e){return(t%e+e)%e}var ge=document.getElementById("settings"),c={DAS:10,ARR:1,Gravity:0,"Soft Drop":31,"Lock Delay":30,Size:0,Sound:0,Volume:100,Block:0,Ghost:1,Grid:1,Outline:0},B={DAS:U(0,31),ARR:U(0,11),Gravity:function(){let t=[];t.push("Auto"),t.push("0G");for(let e=1;e<64;e++)t.push(e+"/64G");for(let e=1;e<=20;e++)t.push(e+"G");return t}(),"Soft Drop":function(){let t=[];for(let e=1;e<64;e++)t.push(e+"/64G");for(let e=1;e<=20;e++)t.push(e+"G");return t}(),"Lock Delay":U(0,101),Size:["Auto","Small","Medium","Large"],Sound:["Off","On"],Volume:U(0,101),Block:["Shaded","Solid","Glossy","Arika","World"],Ghost:["Normal","Colored","Off"],Grid:["Off","On"],Outline:["Off","On"]};var ie=class{constructor(){this.grabBag=this.gen()}init(){this.grabBag.push.apply(this.grabBag,this.gen()),this.draw()}next(){let e=this.grabBag.shift();return this.grabBag.length===7&&this.grabBag.push.apply(this.grabBag,this.gen()),this.draw(),e}gen(){return console.log("Preview.gen"),[0,1,2,3,4,5,6].sort(function(){return .5-N.next()})}draw(){x(q);for(let e=0;e<6;e++)this.grabBag[e]===0||this.grabBag[e]===3?w(y[this.grabBag[e]].tetro,y[this.grabBag[e]].x-3,y[this.grabBag[e]].y+2+e*3,q):w(y[this.grabBag[e]].tetro,y[this.grabBag[e]].x-2.5,y[this.grabBag[e]].y+2+e*3,q)}},P=new ie;function pe(){this.piece}pe.prototype.draw=function(){x(H),this.piece===0||this.piece===3?w(y[this.piece].tetro,y[this.piece].x-3,2+y[this.piece].y,H):w(y[this.piece].tetro,y[this.piece].x-2.5,2+y[this.piece].y,H)};var b=new pe;var ue,ne=!0,re=0,ye={8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"Caps Lock",27:"Esc",32:"Space",33:"PgUp",34:"PgDn",35:"End",36:"Home",37:"\u2190",38:"\u2191",39:"\u2192",40:"\u2193",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",96:"0kpad",97:"1kpad",98:"2kpad",99:"3kpad",100:"4kpad",101:"5kpad",102:"6kpad",103:"7kpad",104:"8kpad",105:"9kpad",106:"*",107:"+",109:"-",110:".",111:"/",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",173:"-",187:"=",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},se=document.getElementsByClassName("menu");function S(t){for(let e=0,n=se.length;e<n;e++)se[e].classList.remove("on");t!==void 0&&se[t].classList.add("on")}var E,oe,Se=document.getElementById("controls"),me=Se.getElementsByTagName("td");for(let t=0,e=me.length;t<e;t++)me[t].onclick=function(){E&&(m[E.id]=oe,E.innerHTML=ye[oe]),oe=m[this.id],this.innerHTML="Press key",E=this};addEventListener("keyup",function(t){if(E){for(let e in m)t.keyCode===m[e]&&(m[e]=void 0,document.getElementById(e).innerHTML=m[e]);m[E.id]=t.keyCode,E.innerHTML=ye[t.keyCode],E=0}},!1);var C,le;function ae(){ne||re>=6?(le?c[C]=c[C]===0?B[C].length-1:c[C]-1:c[C]=c[C]===B[C].length-1?0:c[C]+1,Re(C),ne=!1):re++,ue=setTimeout(ae,50)}function Q(){K(),ne=!0,re=0,clearTimeout(ue)}function Ce(){le=1,C=this.parentNode.id,this.onmouseup=Q,this.onmouseout=Q,ae()}function Le(){le=0,C=this.parentNode.id,this.onmouseup=Q,this.onmouseout=Q,ae()}function Re(t){document.getElementById(t).getElementsByTagName("span")[0].innerHTML=B[t][c[t]]}for(let t in c){let e=document.createElement("div"),n=document.createElement("b"),l=document.createElement("i"),i=document.createElement("span"),r=document.createElement("i");e.id=t,n.innerHTML=t+":",i.innerHTML=B[t][c[t]],l.className="left",r.className="right",l.onmousedown=Ce,r.onmousedown=Le,ge.appendChild(e),e.appendChild(n),e.appendChild(l),e.appendChild(i),e.appendChild(r)}var fe=class{constructor(){this.pos=0,this.lockDelay=0,this.shiftDelay=0,this.arrDelay=0,this.held=!1,this.finesse=0,this.dirty=!1}new(e){this.pos=0,this.tetro=[],this.held=!1,this.finesse=0,this.dirty=!0,o.landed=!1,this.tetro=y[e].tetro,this.kickData=y[e].kickData,this.x=y[e].x,this.y=y[e].y,this.index=e,this.moveValid(0,0,this.tetro)||(o.gameState=9,k.innerHTML="GAME OVER",S(3))}rotate(e){let n=[];if(e===-1)for(let r=this.tetro.length-1;r>=0;r--){n[r]=[];for(let s=0;s<this.tetro.length;s++)n[r][this.tetro.length-1-s]=this.tetro[s][r]}else for(let r=0;r<this.tetro.length;r++){n[r]=[];for(let s=this.tetro.length-1;s>=0;s--)n[r][s]=this.tetro[s][this.tetro.length-1-r]}let l=te(this.pos,4),i=te(this.pos+e,4);for(let r=0,s=this.kickData[0].length;r<s;r++)if(this.moveValid(this.kickData[l][r][0]-this.kickData[i][r][0],this.kickData[l][r][1]-this.kickData[i][r][1],n)){this.x+=this.kickData[l][r][0]-this.kickData[i][r][0],this.y+=this.kickData[l][r][1]-this.kickData[i][r][1],this.tetro=n,this.pos=i;break}}checkShift(){f&a.moveLeft&&!(u&a.moveLeft)?(this.shiftDelay=0,this.arrDelay=0,this.shiftReleased=!0,this.shiftDir=-1,this.finesse++):f&a.moveRight&&!(u&a.moveRight)&&(this.shiftDelay=0,this.arrDelay=0,this.shiftReleased=!0,this.shiftDir=1,this.finesse++),this.shiftDir===1&&!(f&a.moveRight)&&u&a.moveRight&&f&a.moveLeft?(this.shiftDelay=0,this.arrDelay=0,this.shiftReleased=!0,this.shiftDir=-1):this.shiftDir===-1&&!(f&a.moveLeft)&&u&a.moveLeft&&f&a.moveRight?(this.shiftDelay=0,this.arrDelay=0,this.shiftReleased=!0,this.shiftDir=1):!(f&a.moveRight)&&u&a.moveRight&&f&a.moveLeft?this.shiftDir=-1:!(f&a.moveLeft)&&u&a.moveLeft&&f&a.moveRight?this.shiftDir=1:(!(f&a.moveLeft)&&u&a.moveLeft||!(f&a.moveRight)&&u&a.moveRight)&&(this.shiftDelay=0,this.arrDelay=0,this.shiftReleased=!0,this.shiftDir=0),this.shiftDir&&(this.shiftReleased?(this.shift(this.shiftDir),this.shiftDelay++,this.shiftReleased=!1):this.shiftDelay<c.DAS?this.shiftDelay++:this.shiftDelay===c.DAS&&c.DAS!==0?(this.shift(this.shiftDir),c.ARR!==0&&this.shiftDelay++):this.arrDelay<c.ARR?this.arrDelay++:this.arrDelay===c.ARR&&c.ARR!==0&&this.shift(this.shiftDir))}shift(e){if(this.arrDelay=0,c.ARR===0&&this.shiftDelay===c.DAS){for(let n=1;n<10;n++)if(!this.moveValid(n*e,0,this.tetro)){this.x+=n*e-e;break}}else this.moveValid(e,0,this.tetro)&&(this.x+=e)}shiftDown(){if(this.moveValid(0,1,this.tetro)){let e=he[c["Soft Drop"]+1];e>1?this.y+=this.getDrop(e):this.y+=e}}hardDrop(){this.y+=this.getDrop(20),this.lockDelay=c["Lock Delay"]}getDrop(e){let n;for(n=1;n<=e;n++)if(!this.moveValid(0,n,this.tetro))return n-1;return n-1}hold(){let e=b.piece;this.held||(b.piece!==void 0?(b.piece=this.index,this.new(e)):(b.piece=this.index,this.new(P.next())),this.held=!0,b.draw())}moveValid(e,n,l){e=e+this.x,n=Math.floor(n+this.y);for(let i=0;i<l.length;i++)for(let r=0;r<l[i].length;r++)if(l[i][r]&&(e+i<0||e+i>=10||n+r>=22||L.grid[e+i][n+r]))return!1;return this.lockDelay=0,!0}update(){if(this.moveValid(0,1,this.tetro))if(o.landed=!1,c.Gravity){let e=he[c.Gravity-1];e>1?this.y+=this.getDrop(e):this.y+=e}else this.y+=de;else if(o.landed=!0,this.y=Math.floor(this.y),this.lockDelay>=c["Lock Delay"])L.addPiece(this.tetro),this.new(P.next());else{let e=1/B["Lock Delay"][c["Lock Delay"]];v.globalCompositeOperation="source-atop",v.fillStyle="rgba(0,0,0,0)",v.fillRect(0,0,M.width,M.height),v.globalCompositeOperation="source-over",this.lockDelay++}}draw(){w(this.tetro,this.x,this.y,v)}drawGhost(){!c.Ghost&&!o.landed?w(this.tetro,this.x,this.y+this.getDrop(22),v,0):c.Ghost===1&&!o.landed&&(v.globalAlpha=.3,w(this.tetro,this.x,this.y+this.getDrop(22),v),v.globalAlpha=1)}},d=new fe;function j(){}j.prototype.new=function(t,e){let n=new Array(t);for(let l=0;l<t;l++)n[l]=new Array(e);this.grid=n};j.prototype.addPiece=function(t){let e=!1,n=[],l=!1;for(let i=0;i<t.length;i++)for(let r=0;r<t[i].length;r++)t[i][r]&&(this.grid[i+d.x][r+d.y]=t[i][r],(!e||i+d.x<o.column)&&(o.column=i+d.x,e=!0),n.indexOf(r+d.y)===-1&&(n.push(r+d.y),r+d.y>1&&(l=!0)));if(!l){o.gameState=9,msg.innerHTML="GAME OVER",S(3);return}n=n.sort(function(i,r){return i-r});for(let i=n[0],r=i+n.length;i<r;i++){let s=0;for(let h=0;h<10;h++)this.grid[h][i]&&s++;if(s===10){o.lines++,G===3&&o.digLines.indexOf(i)!==-1&&o.digLines.splice(o.digLines.indexOf(i),1);for(let h=i;h>=-1;h--)for(let p=0;p<10;p++)this.grid[p][h]=this.grid[p][h-1]}}o.finesse+=d.finesse-ve[d.index][d.pos][o.column],o.piecesSet++,o.column=0,_.innerHTML=o.piecesSet,G!==3?A.innerHTML=W-o.lines:A.innerHTML=o.digLines.length,this.draw()};j.prototype.draw=function(){if(x(I),w(this.grid,0,0,I),c.Outline){let t=~~(o.cellSize/8),e=o.cellSize,n=document.createElement("canvas");n.width=D.width,n.height=D.height;let l=n.getContext("2d");l.fillStyle="rgba(255,255,255,0.5)",l.beginPath();for(let i=0,r=this.grid.length;i<r;i++)for(let s=0,h=this.grid[i].length;s<h;s++)this.grid[i][s]&&(i<9&&!this.grid[i+1][s]&&l.fillRect(i*e+e-t,s*e-2*e,t,e),i>0&&!this.grid[i-1][s]&&l.fillRect(i*e,s*e-2*e,t,e),s<21&&!this.grid[i][s+1]&&l.fillRect(i*e,s*e-2*e+e-t,e,t),this.grid[i][s-1]||l.fillRect(i*e,s*e-2*e,e,t),i<9&&s<21&&(!this.grid[i+1][s]&&!this.grid[i][s+1]?(l.clearRect(i*e+e-t,s*e-2*e+e-t,t,t),l.fillRect(i*e+e-t,s*e-2*e+e-t,t,t)):!this.grid[i+1][s+1]&&this.grid[i+1][s]&&this.grid[i][s+1]&&(l.moveTo(i*e+e,s*e-2*e+e-t),l.lineTo(i*e+e,s*e-2*e+e),l.lineTo(i*e+e-t,s*e-2*e+e),l.arc(i*e+e,s*e-2*e+e,t,3*Math.PI/2,Math.PI,!0))),i<9&&(!this.grid[i+1][s]&&!this.grid[i][s-1]?(l.clearRect(i*e+e-t,s*e-2*e,t,t),l.fillRect(i*e+e-t,s*e-2*e,t,t)):!this.grid[i+1][s-1]&&this.grid[i+1][s]&&this.grid[i][s-1]&&(l.moveTo(i*e+e-t,s*e-2*e),l.lineTo(i*e+e,s*e-2*e),l.lineTo(i*e+e,s*e-2*e+t),l.arc(i*e+e,s*e-2*e,t,Math.PI/2,Math.PI,!1))),i>0&&s<21&&(!this.grid[i-1][s]&&!this.grid[i][s+1]?(l.clearRect(i*e,s*e-2*e+e-t,t,t),l.fillRect(i*e,s*e-2*e+e-t,t,t)):!this.grid[i-1][s+1]&&this.grid[i-1][s]&&this.grid[i][s+1]&&(l.moveTo(i*e,s*e-2*e+e-t),l.lineTo(i*e,s*e-2*e+e),l.lineTo(i*e+t,s*e-2*e+e),l.arc(i*e,s*e-2*e+e,t,Math.PI*2,3*Math.PI/2,!0))),i>0&&(!this.grid[i-1][s]&&!this.grid[i][s-1]?(l.clearRect(i*e,s*e-2*e,t,t),l.fillRect(i*e,s*e-2*e,t,t)):!this.grid[i-1][s-1]&&this.grid[i-1][s]&&this.grid[i][s-1]&&(l.moveTo(i*e+t,s*e-2*e),l.lineTo(i*e,s*e-2*e),l.lineTo(i*e,s*e-2*e+t),l.arc(i*e,s*e-2*e,t,Math.PI/2,Math.PI*2,!0))));l.fill(),I.drawImage(n,0,0)}};var L=new j;var k=document.getElementById("msg"),Y=document.getElementById("stats"),A=document.getElementById("line"),_=document.getElementById("piece"),$=document.getElementsByTagName("h3"),O=document.getElementById("hold"),ee=document.getElementById("bgStack"),D=document.getElementById("stack"),M=document.getElementById("active"),X=document.getElementById("preview"),z=document.getElementById("sprite"),H=O.getContext("2d"),ke=ee.getContext("2d"),I=D.getContext("2d"),v=M.getContext("2d"),q=X.getContext("2d"),g=z.getContext("2d");var J=[[[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[1,0],[1,1],[0,-2],[1,-2]],[[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]]],be=[[[0,0],[-1,0],[2,0],[-1,0],[2,0]],[[-1,0],[0,0],[0,0],[0,-1],[0,2]],[[-1,-1],[1,-1],[-2,-1],[1,0],[-2,0]],[[0,-1],[0,-1],[0,-1],[0,1],[0,-2]]],Te=[[[0,0]],[[0,0]],[[0,0]],[[0,0]]],Ee={index:0,x:2,y:-1,kickData:be,tetro:[[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]]},Be={index:1,x:3,y:0,kickData:J,tetro:[[2,2,0],[0,2,0],[0,2,0]]},Pe={index:2,x:3,y:0,kickData:J,tetro:[[0,3,0],[0,3,0],[3,3,0]]},Me={index:3,x:4,y:0,kickData:Te,tetro:[[4,4],[4,4]]},Ae={index:4,x:3,y:0,kickData:J,tetro:[[0,5,0],[5,5,0],[5,0,0]]},Ge={index:5,x:3,y:0,kickData:J,tetro:[[0,6,0],[6,6,0],[0,6,0]]},ze={index:6,x:3,y:0,kickData:J,tetro:[[7,0,0],[7,7,0],[0,7,0]]},y=[Ee,Be,Pe,Me,Ae,Ge,ze],ve=[[[1,2,1,0,1,2,1],[2,2,2,2,1,1,2,2,2,2],[1,2,1,0,1,2,1],[2,2,2,2,1,1,2,2,2,2]],[[1,2,1,0,1,2,2,1],[2,2,3,2,1,2,3,3,2],[2,3,2,1,2,3,3,2],[2,3,2,1,2,3,3,2,2]],[[1,2,1,0,1,2,2,1],[2,2,3,2,1,2,3,3,2],[2,3,2,1,2,3,3,2],[2,3,2,1,2,3,3,2,2]],[[1,2,2,1,0,1,2,2,1],[1,2,2,1,0,1,2,2,1],[1,2,2,1,0,1,2,2,1],[1,2,2,1,0,1,2,2,1]],[[1,2,1,0,1,2,2,1],[2,2,2,1,1,2,3,2,2],[1,2,1,0,1,2,2,1],[2,2,2,1,1,2,3,2,2]],[[1,2,1,0,1,2,2,1],[2,2,3,2,1,2,3,3,2],[2,3,2,1,2,3,3,2],[2,3,2,1,2,3,3,2,2]],[[1,2,1,0,1,2,2,1],[2,2,2,1,1,2,3,2,2],[1,2,1,0,1,2,2,1],[2,2,2,1,1,2,3,2,2]]],o={cellSize:void 0,column:void 0,finesse:void 0,lines:void 0,piecesSet:void 0,startPauseTime:void 0,pauseTime:void 0,lastX:void 0,lastY:void 0,lastPos:void 0,landed:void 0,gameState:3,paused:!1,startTime:void 0,digLines:void 0,released:void 0},He=.00390625,de,he=function(){let t=[];t.push(0);for(let e=1;e<64;e++)t.push(e/64);for(let e=1;e<=20;e++)t.push(e);return t}(),R,W,T,V=!1,F,G,f,u,m={pause:27,moveLeft:37,moveRight:39,moveDown:40,moveUp:38,hardDrop:32,holdPiece:67,rotRight:88,rotLeft:90,rot180:16,retry:81},a={hardDrop:1,moveRight:2,moveLeft:4,moveDown:8,holdPiece:16,rotRight:32,rotLeft:64,rot180:128};function K(){let t=document.getElementById("a"),e=document.getElementById("b"),n=document.getElementById("c"),l=document.getElementById("content"),i=window.innerHeight-34;~~(i*1.024)>window.innerWidth&&(i=~~(window.innerWidth/1.024)),c.Size===1&&i>602?o.cellSize=15:c.Size===2&&i>602?o.cellSize=30:c.Size===3&&i>902?o.cellSize=45:o.cellSize=Math.max(~~(i/20),10);let{cellSize:s}=o,h=(window.innerHeight-(s*20+2))/2+"px";l.style.padding=h+" 0",Y.style.bottom=h,t.style.padding="0 0.5rem "+~~(s/2)+"px",D.width=M.width=ee.width=s*10,D.height=M.height=ee.height=s*20,e.style.width=D.width+"px",e.style.height=D.height+"px",O.width=s*4,O.height=s*2,t.style.width=O.width+"px",t.style.height=O.height+"px",X.width=s*4,X.height=D.height,n.style.width=X.width+"px",n.style.height=e.style.height,k.style.lineHeight=e.style.height,k.style.fontSize=~~(D.width/10)+"px",Y.style.fontSize=~~(D.width/11)+"px",document.documentElement.style.fontSize=~~(D.width/16)+"px",Y.style.width=t.style.width;for(let p=0,xe=$.length;p<xe;p++)$[p].style.lineHeight=t.style.height,$[p].style.fontSize=Y.style.fontSize;Fe(),c.Grid===1&&Oe(ke),o.gameState===0&&(d.drawGhost(),d.draw(),L.draw(),P.draw(),b.piece&&b.draw())}addEventListener("resize",K,!1);function Z(t){if(t==="replay"?V=!0:(V=!1,T={},T.seed=~~(Math.random()*2147483645)+1,G=t),W=40,o.column=0,f=0,u=0,o.released=255,d.shiftDir=0,d.shiftReleased=!0,o.startPauseTime=0,o.pauseTime=0,o.paused=!1,N.seed=T.seed,F=21,R=0,o.lastPos="reset",L.new(10,22),b.piece=void 0,c.Gravity===0&&(de=He*4),o.startTime=Date.now(),P.init(),o.finesse=0,o.lines=0,o.piecesSet=0,_.innerHTML=o.piecesSet,A.innerHTML=W-o.lines,x(I),x(v),x(H),G===3){o.digLines=[12,13,14,15,16,17,18,19,20,21],A.innerHTML=10,A.innerHTML=10;let e=[];for(let n=0;n<10;n++){let l=~~(N.next()*10);l!==e[n-1]?e.push(l):n--}for(let n=21;n>11;n--)for(let l=0;l<10;l++)e[n-12]!==l&&(L.grid[l][n]=8);L.draw()}S(),o.gameState===3?(o.gameState=2,De()):o.gameState=2}function Ie(){o.gameState===0&&(o.paused=!0,o.startPauseTime=Date.now(),k.innerHTML="PAUSED",S(4))}function ce(){o.paused=!1,o.pauseTime+=Date.now()-o.startPauseTime,k.innerHTML="",S()}function Oe(t){t.clearRect(0,0,t.canvas.width,t.canvas.height),t.fillStyle="#343434";for(let e=-1;e<t.canvas.width+1;e+=o.cellSize)t.fillRect(e,0,2,t.canvas.height);for(let e=-1;e<t.canvas.height+1;e+=o.cellSize)t.fillRect(0,e,t.canvas.width,2)}function Fe(){let t=[["#c1c1c1","#dddddd","#a6a6a6","#8b8b8b"],["#25bb9b","#4cd7b6","#009f81","#008568"],["#3397d9","#57b1f6","#007dbd","#0064a2"],["#e67e23","#ff993f","#c86400","#a94b00"],["#efc30f","#ffdf3a","#d1a800","#b38e00"],["#9ccd38","#b9e955","#81b214","#659700"],["#9c5ab8","#b873d4","#81409d","#672782"],["#e64b3c","#ff6853","#c62c25","#a70010"],["#898989","#a3a3a3","#6f6f6f","#575757"]],e=[["#ffffff","#ffffff","#ffffff","#888888","#4d4d4d"],["#7bffdf","#9fffff","#ccffff","#008165","#00442e"],["#6cdcff","#93feff","#c2ffff","#00629f","#002c60"],["#ffc166","#ffe386","#ffffb0","#aa4800","#650500"],["#ffff6a","#ffff8c","#ffffb8","#b68a00","#714f00"],["#efff81","#ffffa2","#ffffcd","#6b9200","#2c5600"],["#dc9dfe","#ffbeff","#ffe9ff","#5d287e","#210043"],["#ff9277","#ffb497","#ffe0bf","#a7000a","#600000"],["#cbcbcb","#ededed","#ffffff","#545454","#1f1f1f"]],n=[["#7b7b7b","#303030","#6b6b6b","#363636"],["#f08000","#a00000","#e86008","#b00000"],["#00a8f8","#0000b0","#0090e8","#0020c0"],["#f8a800","#b84000","#e89800","#c85800"],["#e8e000","#886800","#d8c800","#907800"],["#f828f8","#780078","#e020e0","#880088"],["#00e8f0","#0070a0","#00d0e0","#0080a8"],["#78f800","#007800","#58e000","#008800"],["#7b7b7b","#303030","#6b6b6b","#363636"]],l=[];l[0]=n[0],l[1]=n[6],l[2]=n[2],l[3]=n[3],l[4]=n[4],l[5]=n[7],l[6]=n[5],l[7]=n[1],l[8]=n[8];let{cellSize:i}=o;z.width=i*9,z.height=i;for(let r=0;r<9;r++){let s=r*i;if(c.Block===0)g.fillStyle=t[r][1],g.fillRect(s,0,i,i),g.fillStyle=t[r][3],g.fillRect(s,i/2,i,i/2),g.fillStyle=t[r][0],g.beginPath(),g.moveTo(s,0),g.lineTo(s+i/2,i/2),g.lineTo(s,i),g.fill(),g.fillStyle=t[r][2],g.beginPath(),g.moveTo(s+i,0),g.lineTo(s+i/2,i/2),g.lineTo(s+i,i),g.fill();else if(c.Block===1)g.fillStyle=t[r][0],g.fillRect(s,0,i,i);else if(c.Block===2){let h=Math.max(~~(i*.083),1),p=g.createLinearGradient(s,0,s+i,i);p.addColorStop(.5,e[r][3]),p.addColorStop(1,e[r][4]),g.fillStyle=p,g.fillRect(s,0,i,i),p=g.createLinearGradient(s,0,s+i,i),p.addColorStop(0,e[r][2]),p.addColorStop(.5,e[r][1]),g.fillStyle=p,g.fillRect(s,0,i-h,i-h),p=g.createLinearGradient(s+h,h,s+i-h,i-h),p.addColorStop(0,t[r][0]),p.addColorStop(.5,e[r][0]),p.addColorStop(.5,t[r][0]),p.addColorStop(1,e[r][0]),g.fillStyle=p,g.fillRect(s+h,h,i-h*2,i-h*2)}else if(c.Block===3||c.Block===4){c.Block===4&&(n=l);let h=Math.max(~~(i*.125),1);g.fillStyle=n[r][1],g.fillRect(s,0,i,i),g.fillStyle=n[r][0],g.fillRect(s,0,i,~~(i/2));let p=g.createLinearGradient(s,h,s,i-h);p.addColorStop(0,n[r][2]),p.addColorStop(1,n[r][3]),g.fillStyle=p,g.fillRect(s+h,h,i-h*2,i-h*2),p=g.createLinearGradient(s,h,s,i),p.addColorStop(0,n[r][0]),p.addColorStop(1,n[r][3]),g.fillStyle=p,g.fillRect(s,h,h,i-h),p=g.createLinearGradient(s,0,s,i-h),p.addColorStop(0,n[r][2]),p.addColorStop(1,n[r][1]),g.fillStyle=p,g.fillRect(s+i-h,0,h,i-h)}}}addEventListener("keydown",function(t){[32,37,38,39,40].indexOf(t.keyCode)!==-1&&t.preventDefault(),t.keyCode===m.pause&&(o.paused?ce():Ie()),t.keyCode===m.retry&&Z(G),V||(t.keyCode===m.moveLeft?f|=a.moveLeft:t.keyCode===m.moveRight?f|=a.moveRight:t.keyCode===m.moveDown?f|=a.moveDown:t.keyCode===m.hardDrop?f|=a.hardDrop:t.keyCode===m.rotRight||t.keyCode===m.moveUp?f|=a.rotRight:t.keyCode===m.rotLeft?f|=a.rotLeft:t.keyCode===m.rot180?f|=a.rot180:t.keyCode===m.holdPiece&&(f|=a.holdPiece))},!1);addEventListener("keyup",function(t){V||(o.gameState===9&&t.keyCode===13&&Z(o.gametype),t.keyCode===m.moveLeft&&f&a.moveLeft?f^=a.moveLeft:t.keyCode===m.moveRight&&f&a.moveRight?f^=a.moveRight:t.keyCode===m.moveDown&&f&a.moveDown?f^=a.moveDown:t.keyCode===m.hardDrop&&f&a.hardDrop?f^=a.hardDrop:(t.keyCode===m.rotRight||t.keyCode===m.moveUp)&&f&a.rotRight?f^=a.rotRight:t.keyCode===m.rotLeft&&f&a.rotLeft?f^=a.rotLeft:t.keyCode===m.rot180&&f&a.rot180?f^=a.rot180:t.keyCode===m.holdPiece&&f&a.holdPiece&&(f^=a.holdPiece))},!1);function Ve(){u!==f&&!V?T[R]=f:R in T&&(f=T[R]),!(u&a.holdPiece)&&a.holdPiece&f&&d.hold(),a.rotLeft&f&&!(u&a.rotLeft)?(d.rotate(-1),d.finesse++):a.rotRight&f&&!(u&a.rotRight)?(d.rotate(1),d.finesse++):a.rot180&f&&!(u&a.rot180)&&(d.rotate(1),d.rotate(1),d.finesse++),d.checkShift(),a.moveDown&f&&d.shiftDown(),!(u&a.hardDrop)&&a.hardDrop&f&&d.hardDrop(),d.update(),G!==3?o.lines>=W&&(o.gameState=1,k.innerHTML="GREAT!",S(3)):o.digLines.length===0&&(o.gameState=1,k.innerHTML="GREAT!",S(3)),u!==f&&(u=f)}function De(){if(requestAnimationFrame(De),R++,o.gameState===0)o.paused||Ve(),(d.x!==o.lastX||Math.floor(d.y)!==o.lastY||d.pos!==o.lastPos||d.dirty)&&(x(v),d.drawGhost(),d.draw()),o.lastX=d.x,o.lastY=Math.floor(d.y),o.lastPos=d.pos,d.dirty=!1;else if(o.gameState===2)R<50?k.innerHTML!=="READY"&&(k.innerHTML="READY"):R<100?k.innerHTML!=="GO!"&&(k.innerHTML="GO!"):(k.innerHTML="",o.gameState=0,o.startTime=Date.now(),d.new(P.next())),u!==f&&!V?T[R]=f:R in T&&(f=T[R]),f&a.moveLeft?(u=f,d.shiftDelay=c.DAS,d.shiftReleased=!1,d.shiftDir=-1):f&a.moveRight&&(u=f,d.shiftDelay=c.DAS,d.shiftReleased=!1,d.shiftDir=1);else if(F>=2&&(F===21&&x(v),R%2)){for(let t=0;t<10;t++)L.grid[t][F]&&(L.grid[t][F]=o.gameState-1);L.draw(),F--}}K();Z(0);window.tetris={init:Z,menu:S,unpause:ce,state:o};})();
//# sourceMappingURL=app.js.map
