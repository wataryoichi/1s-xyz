/* bookgen site.js */

/* --- Chart.js auto-init --- */
(function(){
  if(typeof Chart==="undefined")return;
  var isDark=document.documentElement.getAttribute("data-theme")==="dark"
    ||(!document.documentElement.hasAttribute("data-theme")&&window.matchMedia("(prefers-color-scheme:dark)").matches);
  Chart.defaults.color=isDark?"#e2e8f0":"#1a1a2e";
  Chart.defaults.borderColor=isDark?"#334155":"#e2e8f0";
})();

/* --- Syntax highlighting --- */
(function(){
  if(typeof hljs==="undefined")return;
  hljs.highlightAll();
})();

/* --- Mermaid --- */
(function(){
  if(typeof mermaid==="undefined")return;
  var d=document.documentElement;
  var isDark=d.getAttribute("data-theme")==="dark"
    ||(!d.hasAttribute("data-theme")&&window.matchMedia("(prefers-color-scheme:dark)").matches);
  mermaid.initialize({startOnLoad:true,theme:isDark?"dark":"default"});
})();

/* --- KaTeX --- */
(function(){
  if(typeof renderMathInElement==="undefined")return;
  renderMathInElement(document.body,{delimiters:[
    {left:"$$",right:"$$",display:true},
    {left:"$",right:"$",display:false}
  ]});
})();

/* --- Sidebar TOC --- */
(function(){
  var headings=document.querySelectorAll(".content h2,.content h3");
  var toc=document.getElementById("page-toc");
  if(!toc||headings.length===0)return;

  var title=document.createElement("div");
  title.className="toc-title";
  title.textContent="この章の目次";
  toc.appendChild(title);

  var ul=document.createElement("ul");
  headings.forEach(function(h,i){
    if(!h.id)h.id="section-"+i;
    var li=document.createElement("li");
    li.className=h.tagName==="H3"?"toc-h3":"toc-h2";
    var a=document.createElement("a");
    a.href="#"+h.id;
    a.textContent=h.textContent;
    li.appendChild(a);
    ul.appendChild(li);
  });
  toc.appendChild(ul);

  var links=toc.querySelectorAll("a");
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(l){l.classList.remove("active");l.removeAttribute("aria-current");});
        var active=toc.querySelector('a[href="#'+e.target.id+'"]');
        if(active){active.classList.add("active");active.setAttribute("aria-current","true");}
      }
    });
  },{rootMargin:"-80px 0px -70% 0px"});
  headings.forEach(function(h){observer.observe(h);});
})();

/* --- Mobile sidebar toggle --- */
(function(){
  var toggle=document.getElementById("sidebar-toggle");
  var sidebar=document.getElementById("sidebar");
  if(toggle&&sidebar){
    toggle.addEventListener("click",function(){
      sidebar.classList.toggle("open");
    });
  }
})();

/* --- Scroll to top --- */
(function(){
  var btn=document.getElementById("scroll-top");
  if(!btn)return;
  window.addEventListener("scroll",function(){
    btn.style.display=window.scrollY>400?"block":"none";
  });
  btn.addEventListener("click",function(){
    window.scrollTo({top:0,behavior:"smooth"});
  });
})();

/* --- Theme toggle --- */
(function(){
  var btn=document.getElementById("theme-toggle");
  if(!btn)return;
  var key=btn.getAttribute("data-storage-key")||"bookgen-theme";
  btn.addEventListener("click",function(){
    var cur=document.documentElement.getAttribute("data-theme");
    var next=cur==="dark"?"light":"dark";
    document.documentElement.setAttribute("data-theme",next);
    localStorage.setItem(key,next);
  });
})();

/* --- Code copy button --- */
(function(){
  document.querySelectorAll("pre").forEach(function(pre){
    if(pre.classList.contains("mermaid"))return;
    var code=pre.querySelector("code");
    if(!code)return;
    var btn=document.createElement("button");
    btn.className="copy-btn";
    btn.textContent="Copy";
    btn.setAttribute("aria-label","コードをコピー");
    btn.addEventListener("click",function(){
      navigator.clipboard.writeText(code.textContent||"").then(function(){
        btn.textContent="Copied!";
        setTimeout(function(){btn.textContent="Copy";},2000);
      });
    });
    pre.appendChild(btn);
  });
})();

/* --- Keyboard chapter navigation --- */
(function(){
  document.addEventListener("keydown",function(e){
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.isContentEditable)return;
    if(e.key==="ArrowLeft"){
      var prev=document.querySelector(".nav-prev");
      if(prev)prev.click();
    }
    if(e.key==="ArrowRight"){
      var next=document.querySelector(".nav-next");
      if(next)next.click();
    }
  });
})();

/* --- Reading progress bar --- */
(function(){
  var bar=document.createElement("div");
  bar.className="reading-progress";
  document.body.prepend(bar);
  window.addEventListener("scroll",function(){
    var h=document.documentElement;
    var pct=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
    bar.style.width=Math.min(pct,100)+"%";
  });
})();
