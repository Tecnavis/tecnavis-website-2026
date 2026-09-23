(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if(hasGSAP) gsap.registerPlugin(ScrollTrigger);
  var isTouch = window.matchMedia('(pointer: coarse)').matches;

  /* ---------- marquee content (present on every page) ---------- */
  var techs = ['Flutter','Laravel','React','Node.js','MySQL','MongoDB','REST APIs','Play Store','App Store','PHP'];
  var track = document.getElementById('marqueeTrack');
  if(track){
    var mHtml = '';
    for(var t=0;t<4;t++){
      techs.forEach(function(name){
        mHtml += '<span class="marquee-item"><span class="sq"></span>'+name+'</span>';
      });
    }
    track.innerHTML = mHtml;
  }

  /* ---------- top progress bar ---------- */
  var progressFill = document.getElementById('progressFill');
  if(progressFill){
    var updateProgress = function(){
      var h = document.documentElement;
      var scrolled = h.scrollTop || document.body.scrollTop;
      var height = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      var pct = height > 0 ? (scrolled / height) * 100 : 0;
      progressFill.style.width = pct + '%';
    };
    document.addEventListener('scroll', updateProgress, {passive:true});
    updateProgress();
  }

  /* ---------- cursor glow (desktop only) ---------- */
  var glow = document.getElementById('cursorGlow');
  if(glow){
    if(!isTouch && !reduceMotion){
      window.addEventListener('mousemove', function(e){
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      });
    } else {
      glow.style.display = 'none';
    }
  }

  /* ---------- circuit spine: build node dots + scrub fill ---------- */
  var spineCol = document.getElementById('spineCol');
  var spineFill = document.getElementById('spineFill');
  var topEl = document.getElementById('top');
  var nodeSections = Array.prototype.slice.call(document.querySelectorAll('[data-node]'));

  if(spineCol && spineFill && topEl){
    function layoutNodes(){
      spineCol.querySelectorAll('.node-dot').forEach(function(n){ n.remove(); });
      var mainTop = topEl.getBoundingClientRect().top + window.scrollY;
      nodeSections.forEach(function(sec){
        var rect = sec.getBoundingClientRect();
        var top = rect.top + window.scrollY - mainTop;
        var dot = document.createElement('div');
        dot.className = 'node-dot';
        dot.style.top = top + 40 + 'px';
        dot.dataset.target = sec.id;
        spineCol.appendChild(dot);
      });
    }
    if(window.matchMedia('(min-width:1080px)').matches){ layoutNodes(); }
    window.addEventListener('resize', function(){
      if(window.matchMedia('(min-width:1080px)').matches){ layoutNodes(); } else { spineCol.querySelectorAll('.node-dot').forEach(function(n){ n.remove(); }); }
    });

    function activateNode(id){
      var dot = spineCol.querySelector('.node-dot[data-target="'+id+'"]');
      if(dot) dot.classList.add('is-live');
    }

    if(hasGSAP){
      ScrollTrigger.create({
        trigger: topEl,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: function(self){
          spineFill.style.height = (self.progress*100) + '%';
        }
      });
      nodeSections.forEach(function(sec){
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: function(){ activateNode(sec.id); },
          onEnterBack: function(){ activateNode(sec.id); }
        });
      });
    }
  }

  /* ---------- hero headline stagger-in (home only) ---------- */
  var heroEl = document.getElementById('node-hero');
  if(heroEl){
    if(hasGSAP){
      gsap.set('.hero h1 .line-inner, .hero h1 .rotator-wrap', {yPercent: 110});
      gsap.set('.hero-sub, .hero-actions, .hero-eyebrow-row', {opacity:0, y:18});
      gsap.set('.hero-visual', {opacity:0, scale:0.85});
      gsap.timeline({delay:0.2})
        .to('.hero-eyebrow-row', {opacity:1, y:0, duration:0.6, ease:'power2.out'}, 0)
        .to('.hero h1 .line-inner, .hero h1 .rotator-wrap', {yPercent:0, duration:0.9, ease:'power4.out', stagger:0.12}, 0.1)
        .to('.hero-sub, .hero-actions', {opacity:1, y:0, duration:0.7, ease:'power2.out', stagger:0.1}, 0.55)
        .to('.hero-visual', {opacity:1, scale:1, duration:0.9, ease:'power3.out'}, 0.4);

      gsap.to('.hero-blob.b1', { y: 120, ease:'none', scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
      gsap.to('.hero-blob.b2', { y: -80, ease:'none', scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
      gsap.to('.hero-blob.b3', { y: 60, ease:'none', scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
      gsap.to('.hero-grid', { y: 40, ease:'none', scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
    } else {
      document.querySelectorAll('.hero-sub,.hero-actions,.hero-eyebrow-row,.hero h1 .line-inner,.hero h1 .rotator-wrap,.hero-visual').forEach(function(el){ el.style.opacity=1; });
    }

    /* rotating word */
    var rotatorWords = ['Websites','E-commerce','Mobile apps','Custom Softwares','Storefronts','AI systems','Automation','Digital Marketing'];
    var rotatorEl = document.getElementById('rotatorWord');
    if(rotatorEl && !reduceMotion){
      var rIdx = 0;
      setInterval(function(){
        rIdx = (rIdx+1) % rotatorWords.length;
        rotatorEl.style.animation = 'none';
        rotatorEl.textContent = rotatorWords[rIdx];
        void rotatorEl.offsetWidth;
        rotatorEl.style.animation = '';
      }, 2400);
    }

    /* circuit-core mouse parallax (desktop only) */
    var heroVisualInner = document.getElementById('heroVisualInner');
    if(hasGSAP && heroVisualInner && !isTouch && !reduceMotion){
      var hvX = gsap.quickTo(heroVisualInner, 'rotationY', {duration:0.6, ease:'power3.out'});
      var hvY = gsap.quickTo(heroVisualInner, 'rotationX', {duration:0.6, ease:'power3.out'});
      gsap.set(heroVisualInner, {transformPerspective:700, transformStyle:'preserve-3d'});
      heroEl.addEventListener('mousemove', function(e){
        var rect = heroVisualInner.getBoundingClientRect();
        var cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
        var dx = (e.clientX - cx) / (rect.width/2);
        var dy = (e.clientY - cy) / (rect.height/2);
        hvX(gsap.utils.clamp(-10,10, dx*10));
        hvY(gsap.utils.clamp(-10,10, dy*-10));
      });
      heroEl.addEventListener('mouseleave', function(){ hvX(0); hvY(0); });
    }
  }

  /* ---------- stat counters (any page with .stat-grid) ---------- */
  var statGrid = document.querySelector('.stat-grid');
  if(statGrid){
    var counted = false;
    function runCounters(){
      if(counted) return; counted = true;
      document.querySelectorAll('.stat-num').forEach(function(el){
        var target = parseInt(el.dataset.count, 10);
        var suffix = el.dataset.suffix || '';
        var obj = {val:0};
        if(hasGSAP){
          gsap.to(obj, {
            val: target, duration: 1.6, ease:'power2.out',
            onUpdate: function(){ el.textContent = Math.round(obj.val) + suffix; }
          });
        } else {
          el.textContent = target + suffix;
        }
      });
    }
    if(hasGSAP){
      ScrollTrigger.create({ trigger: statGrid, start:'top 85%', onEnter: runCounters, onEnterBack: runCounters });
    } else { runCounters(); }
  }

  /* ---------- about: story/mission/vision step reveal ---------- */
  var panelStack = document.getElementById('panelStack');
  if(panelStack){
    var panels = panelStack.querySelectorAll('.panel');
    function setActivePanel(i){
      panels.forEach(function(p, idx){ p.classList.toggle('is-active', idx===i); });
    }
    if(hasGSAP && panels.length){
      panels.forEach(function(panel, i){
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: function(){ setActivePanel(i); },
          onEnterBack: function(){ setActivePanel(i); }
        });
      });
    }
  }

  /* ---------- services: alternating reveal ---------- */
  if(hasGSAP){
    document.querySelectorAll('.service-row').forEach(function(row){
      var fromX = row.classList.contains('reverse') ? 60 : -60;
      gsap.from(row, {
        opacity:0, x: fromX, duration:0.9, ease:'power3.out',
        scrollTrigger:{ trigger: row, start:'top 82%' }
      });
      var visual = row.querySelector('.service-visual');
      if(visual){
        gsap.from(visual, {
          clipPath:'inset(0 0 100% 0)', duration:1, ease:'power3.out',
          scrollTrigger:{ trigger: row, start:'top 78%' }
        });
      }
    });
  }

  /* ---------- process: pinned horizontal scroll + line animation ---------- */
  var rail = document.getElementById('processRail');
  if(rail){
    var processCards = Array.prototype.slice.call(document.querySelectorAll('.process-card'));
    var progressFillEl = document.getElementById('processProgressFill');
    var dotsWrap = document.getElementById('processDots');
    var pDots = [];
    if(dotsWrap){
      processCards.forEach(function(){
        var d = document.createElement('div');
        d.className = 'p-dot';
        dotsWrap.appendChild(d);
      });
      pDots = dotsWrap.querySelectorAll('.p-dot');
    }
    var cardLineFills = processCards.map(function(c){ return c.querySelector('.line-fill'); });

    function updateProcessLines(progress){
      if(progressFillEl) progressFillEl.style.width = (progress*100) + '%';
      var n = processCards.length;
      processCards.forEach(function(card, i){
        var start = i/n, end = (i+1)/n;
        var local = (progress - start) / (end - start);
        local = Math.max(0, Math.min(1, local));
        if(cardLineFills[i]) cardLineFills[i].style.width = (local*100) + '%';
        if(pDots[i]) pDots[i].classList.toggle('is-live', progress >= start);
      });
    }

    if(hasGSAP && window.matchMedia('(min-width:760px)').matches){
      var pin = document.getElementById('processPin') || rail.parentElement;
      function railScrollLength(){
        return Math.max(0, rail.scrollWidth - window.innerWidth + 2*72);
      }
      ScrollTrigger.create({
        trigger: pin,
        start: 'top top',
        end: function(){ return '+=' + (railScrollLength() + 400); },
        pin: true,
        scrub: 0.6,
        onUpdate: function(self){
          gsap.set(rail, { x: -self.progress * railScrollLength() });
          updateProcessLines(self.progress);
        }
      });
    } else {
      /* mobile: native horizontal swipe, dots track whichever card is centred */
      var mobileTicking = false;
      function updateMobileProcessProgress(){
        mobileTicking = false;
        var railRect = rail.getBoundingClientRect();
        var centerX = railRect.left + railRect.width / 2;
        var closest = 0, closestDist = Infinity;
        processCards.forEach(function(card, i){
          var r = card.getBoundingClientRect();
          var cardCenter = r.left + r.width / 2;
          var dist = Math.abs(cardCenter - centerX);
          if(dist < closestDist){ closestDist = dist; closest = i; }
        });
        Array.prototype.forEach.call(pDots, function(d, i){ d.classList.toggle('is-live', i <= closest); });
        cardLineFills.forEach(function(f, i){ if(f) f.style.width = (i <= closest ? '100%' : '0%'); });
      }
      rail.addEventListener('scroll', function(){
        if(!mobileTicking){ mobileTicking = true; requestAnimationFrame(updateMobileProcessProgress); }
      }, {passive:true});
      window.addEventListener('resize', updateMobileProcessProgress);
      updateMobileProcessProgress();
    }
  }

  /* ---------- work: case-file portfolio (data-driven) ---------- */
  var caseList = document.getElementById('caseList');
  var filmstrip = document.getElementById('workFilmstrip');
  if(caseList && filmstrip){
    var caseData = [
      { mono:'RK', name:'RSA Kerala', tag:'Roadside assistance', color:'var(--purple)',
        desc:'A booking platform for a Kerala crane and vehicle-recovery service — pick-up and drop-off scheduling across flatbed, underlift, tow and jump-start jobs, with one-tap WhatsApp dispatch for round-the-clock breakdown calls.',
        url:'rsakerala.com' },
      { mono:'TC', name:'Tarak Connect', tag:'Logistics marketplace', color:'var(--teal)',
        desc:'A load-matching marketplace connecting truck owners with shippers, matching available trucks and body types to freight routes across Kerala.',
        url:'tarakconnect.com' },
      { mono:'AL', name:'Adamlex', tag:'E-commerce · Legal study', color:'var(--magenta)',
        desc:'An online storefront selling curated law study material and notes for students preparing for judiciary and law-entrance exams.',
        url:'adamlex.com' },
      { mono:'DJ', name:'DuoJobs', tag:'Job listings', color:'var(--amber)',
        desc:'A job board connecting employers with candidates — postings, search and applications, built for the local hiring market.',
        url:'duojobs.in' },
      { mono:'MT', name:'Mind Touch Counsellors', tag:'Healthcare · Clinic', color:'var(--purple-soft)',
        desc:'A calm, trust-building site for a psychology and counselling clinic — introducing therapists and services, and giving new clients an easy way to reach out.',
        url:'mindtouchcounsellors.com' },
      { mono:'CL', name:'Cognix Learn', tag:'EdTech · K-12', color:'var(--teal)',
        desc:'A study-resource hub for State, CBSE and ICSE students — notes and materials organised by board, class and subject.',
        url:'cognixlearn.com' },
      { mono:'LO', name:'Looi', tag:'E-commerce · Fashion', color:'var(--magenta)',
        desc:'A fashion storefront for a growing apparel label — catalogue browsing, sizing and checkout built to handle real traffic.',
        url:'looi.in' },
      { mono:'MD', name:'Malabar Decors', tag:'E-commerce · Home', color:'var(--amber)',
        desc:'An online store for a Kerala-based home-décor brand — product discovery and checkout for browsing-heavy shoppers.',
        url:'malabardecors.com' },
      { mono:'DM', name:'Dotmart', tag:'Marketplace · Industrial machinery', color:'var(--purple)',
        desc:'A buy-and-rent marketplace for used industrial machinery, where outside sellers list their own equipment alongside platform stock, gated by admin approval and a tiered, admin-configurable listing fee.',
        status:'In development' },
      { mono:'TB', name:'TecBill', tag:'WhatsApp · GST invoicing', color:'var(--teal)',
        desc:'A WhatsApp-first invoicing tool — describe what was sold in a message, and it comes back as a GST-compliant invoice or quotation, ready to send as a PDF.',
        status:'In development' }
    ];

    caseData.forEach(function(item, i){
      var idx = String(i+1).padStart(2,'0');

      var row = document.createElement('div');
      row.className = 'case-row';
      row.id = 'case-'+idx;
      var visitHtml = item.url
        ? '<a class="case-link" href="https://'+item.url+'" target="_blank" rel="noopener">'+item.url+
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8"/></svg></a>'
        : '<span class="case-status">'+item.status+'</span>';
      row.innerHTML =
        '<div class="case-mono" style="background:'+item.color+';">'+item.mono+'</div>'+
        '<div class="case-info">'+
          '<h3>'+item.name+'<span class="case-tag">'+item.tag+'</span></h3>'+
          '<p>'+item.desc+'</p>'+
        '</div>'+
        '<div class="case-visit">'+visitHtml+'</div>';
      caseList.appendChild(row);

      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'film-chip';
      chip.dataset.target = 'case-'+idx;
      chip.innerHTML = '<span class="chip-mono" style="background:'+item.color+';">'+item.mono+'</span>'+item.name;
      chip.addEventListener('click', function(){
        document.getElementById('case-'+idx).scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'center'});
      });
      filmstrip.appendChild(chip);
    });

    var chips = filmstrip.querySelectorAll('.film-chip');
    function setActiveCase(i){
      chips.forEach(function(c, idx){ c.classList.toggle('is-active', idx===i); });
    }
    setActiveCase(0);

    if(hasGSAP){
      document.querySelectorAll('.case-row').forEach(function(row, i){
        gsap.from(row, {
          opacity:0, x: i%2===0 ? -50 : 50, duration:0.8, ease:'power3.out',
          scrollTrigger:{ trigger: row, start:'top 82%' }
        });
        gsap.to(row.querySelector('.case-mono'), {
          opacity:1, scale:1, duration:0.7, ease:'back.out(1.7)',
          scrollTrigger:{ trigger: row, start:'top 80%' }
        });
        ScrollTrigger.create({
          trigger: row, start:'top 55%', end:'bottom 45%',
          onEnter: function(){ setActiveCase(i); },
          onEnterBack: function(){ setActiveCase(i); }
        });
      });
    } else {
      document.querySelectorAll('.case-mono').forEach(function(el){ el.style.opacity=1; el.style.transform='scale(1)'; });
    }
  }

  /* ---------- platform: module grid ---------- */
  var moduleGrid = document.getElementById('moduleGrid');
  if(moduleGrid){
    var moduleData = [
      { code:'HR', name:'HRM', color:'var(--purple)' },
      { code:'CR', name:'CRM', color:'var(--magenta)', status:'Coming soon' },
      { code:'SA', name:'Sales', color:'var(--teal)' },
      { code:'FI', name:'Finance', color:'var(--amber)' },
      { code:'IN', name:'Inventory', color:'var(--purple-soft)' },
      { code:'PR', name:'Projects', color:'var(--purple)' },
      { code:'RE', name:'Reports', color:'var(--magenta)' },
      { code:'SE', name:'Settings', color:'var(--teal)' }
    ];
    moduleData.forEach(function(m){
      var chip = document.createElement('div');
      chip.className = 'module-chip';
      chip.innerHTML =
        '<div class="module-mono" style="background:'+m.color+';">'+m.code+'</div>'+
        '<div><span class="module-name">'+m.name+'</span>'+
        (m.status ? '<span class="module-status">'+m.status+'</span>' : '')+
        '</div>';
      moduleGrid.appendChild(chip);
    });
    if(hasGSAP){
      gsap.to('.module-chip', {
        opacity:1, scale:1, duration:0.6, ease:'back.out(1.6)', stagger:0.08,
        scrollTrigger:{ trigger: moduleGrid, start:'top 85%' }
      });
      var platformCopy = document.querySelector('.platform-copy');
      if(platformCopy){
        gsap.from(platformCopy, {
          opacity:0, y:24, duration:0.8, ease:'power2.out',
          scrollTrigger:{ trigger: platformCopy, start:'top 85%' }
        });
      }
    } else {
      document.querySelectorAll('.module-chip').forEach(function(el){ el.style.opacity=1; el.style.transform='scale(1)'; });
    }
  }

  /* ---------- why: velocity tilt ---------- */
  var tiltCards = document.querySelectorAll('.tilt-card');
  if(hasGSAP && tiltCards.length && !isTouch){
    var proxy = {skew:0};
    var skewSetter = gsap.quickSetter('.tilt-card', 'skewY', 'deg');
    var clampFn = gsap.utils.clamp(-6, 6);
    ScrollTrigger.create({
      onUpdate: function(self){
        var skew = clampFn(self.getVelocity() / -300);
        if(Math.abs(skew) > Math.abs(proxy.skew)) proxy.skew = skew;
        gsap.to(proxy, {
          skew:0, duration:0.8, ease:'power3.out',
          overwrite:true,
          onUpdate: function(){ skewSetter(proxy.skew); }
        });
      }
    });
    gsap.utils.toArray('.tilt-card').forEach(function(card){
      gsap.from(card, { opacity:0, y:36, duration:0.8, ease:'power2.out', scrollTrigger:{ trigger:card, start:'top 88%' } });
    });
  } else if(tiltCards.length){
    tiltCards.forEach(function(c){ c.style.opacity = 1; });
  }

  /* ---------- FAQ accordion (contact / about pages) ---------- */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    if(!q) return;
    q.addEventListener('click', function(){
      var wasOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('is-open'); });
      if(!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---------- section fade-ins for remaining generic blocks ---------- */
  if(hasGSAP){
    gsap.utils.toArray('.section-head').forEach(function(el){
      gsap.from(el, { opacity:0, y:24, duration:0.8, ease:'power2.out', scrollTrigger:{ trigger: el, start:'top 88%' } });
    });
    gsap.utils.toArray('.fade-up').forEach(function(el){
      gsap.from(el, { opacity:0, y:24, duration:0.8, ease:'power2.out', scrollTrigger:{ trigger: el, start:'top 88%' } });
    });
  }

  /* ---------- mobile nav toggle (every page) ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  if(navToggle && mobileMenu){
    function openMobileMenu(){
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu(){
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    navToggle.addEventListener('click', openMobileMenu);
    if(mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---------- contact form: Web3Forms submission (contact page) ---------- */
  var form = document.getElementById('quoteForm');
  if(form){
    var submitBtn = document.getElementById('formSubmitBtn');
    var alertOverlay = document.getElementById('alertOverlay');
    var alertIconSuccess = document.getElementById('alertIconSuccess');
    var alertIconError = document.getElementById('alertIconError');
    var alertTitle = document.getElementById('alertTitle');
    var alertMessage = document.getElementById('alertMessage');
    var alertClose = document.getElementById('alertClose');

    function showAlert(ok){
      if(alertIconSuccess) alertIconSuccess.classList.toggle('is-active', ok);
      if(alertIconError) alertIconError.classList.toggle('is-active', !ok);
      if(alertTitle) alertTitle.textContent = ok ? 'Message sent' : "Couldn't send that";
      if(alertMessage) alertMessage.textContent = ok
        ? "Thanks — that's landed in our inbox. We'll reply from info@tecnavis.in shortly."
        : 'Something went wrong — try again, or email info@tecnavis.in directly.';
      if(alertOverlay) alertOverlay.classList.add('show');
    }
    function hideAlert(){ if(alertOverlay) alertOverlay.classList.remove('show'); }
    if(alertClose) alertClose.addEventListener('click', hideAlert);
    if(alertOverlay) alertOverlay.addEventListener('click', function(e){ if(e.target === alertOverlay) hideAlert(); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') hideAlert(); });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }

      if(submitBtn) submitBtn.disabled = true;
      var originalLabel = submitBtn ? submitBtn.innerHTML : '';
      if(submitBtn) submitBtn.innerHTML = 'Sending…';

      var payload = Object.fromEntries(new FormData(form));

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function(res){ return res.json(); })
        .then(function(data){
          if(data.success){ showAlert(true); form.reset(); } else { showAlert(false); }
        })
        .catch(function(){ showAlert(false); })
        .finally(function(){
          if(submitBtn){ submitBtn.disabled = false; submitBtn.innerHTML = originalLabel; }
        });
    });
  }

  window.addEventListener('load', function(){ if(hasGSAP) ScrollTrigger.refresh(); });
})();
