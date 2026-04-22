// ═══════════════════════════════════════════
// SCENT TABS — filter + left panel swap
// ═══════════════════════════════════════════

(function () {
  // ── Data ──────────────────────────────────
  const SCENTS = {
    'all': {
      name: 'All Scents',
      dot: '#B8A898',
      description: 'Three distinct scent stories, each crafted to ground the body and quiet the mind. Explore our full collection and find the one that feels like you.',
      top:   '',
      heart: '',
      base:  ''
    },
    'scent-1': {
      name: 'Scent 1',
      dot: '#B8A898',
      description: 'Soft earth shifts underfoot as you move into the heart of the woods. An open fire crackles. Warm. Enveloping. Grounded. Engulfed in a wash of amber, a hit of Australian sandalwood, cedar, vetiver — a gentle wave of cardamom carrying across the breeze.',
      top:   'Note A, Note B, Note C',
      heart: 'Note D, Note E, Note F',
      base:  'Note G, Note H, Note I'
    },
    'scent-2': {
      name: 'Scent 2',
      dot: '#A89880',
      description: 'A trail of smoke drifts through still morning air. Cool mineral stone, warm resin, a breath of sea salt at the edges. Quiet. Centering. The kind of calm that settles deep in the chest and stays.',
      top:   'Note J, Note K',
      heart: 'Note L, Note M, Note N',
      base:  'Note O, Note P'
    },
    'scent-3': {
      name: 'Scent 3',
      dot: '#C4B0A0',
      description: 'White petals on warm skin. A thread of green basil cuts through sweetness — bright, clean, alive. Something Mediterranean in the air. The feeling of stepping into sunlight from cool shade.',
      top:   'Note Q, Note R',
      heart: 'Note S, Note T, Note U',
      base:  'Note V, Note W'
    }
  };

  // ── Elements ──────────────────────────────
  const tabs        = document.querySelectorAll('.scent-tab');
  const cards       = document.querySelectorAll('.product-card');
  const groups      = document.querySelectorAll('.scent-group');
  const groupLabels = document.querySelectorAll('.scent-group-label');

  const scentIdentity    = document.querySelector('.scent-identity');
  const scentDot         = document.querySelector('.scent-dot');
  const scentNameDisplay = document.querySelector('.scent-name-display');
  const scentDescription = document.querySelector('.scent-description');
  const scentNotes       = document.querySelector('.scent-notes');
  const notesTop         = document.getElementById('notes-top');
  const notesHeart       = document.getElementById('notes-heart');
  const notesBase        = document.getElementById('notes-base');
  const notesSection     = document.querySelector('.notes-section');

  if (!tabs.length) return;

  // ── Helpers ───────────────────────────────
  function setVisible(el, isVisible) {
    if (!el) return;
    if (isVisible) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  }

  function updatePanel(scentKey) {
    const data = SCENTS[scentKey];
    if (!data) return;

    // Fade out
    setVisible(scentIdentity, false);
    setVisible(scentDescription, false);
    setVisible(scentNotes, false);

    // Swap content after brief delay
    setTimeout(function () {
      if (scentDot)         scentDot.style.backgroundColor = data.dot;
      if (scentNameDisplay) scentNameDisplay.textContent = data.name;
      if (scentDescription) scentDescription.textContent = data.description;

      if (scentKey === 'all') {
        if (notesSection) notesSection.style.display = 'none';
      } else {
        if (notesSection) notesSection.style.display = '';
        if (notesTop)   notesTop.textContent   = data.top;
        if (notesHeart) notesHeart.textContent = data.heart;
        if (notesBase)  notesBase.textContent  = data.base;
      }

      // Fade in
      requestAnimationFrame(function () {
        setVisible(scentIdentity, true);
        setVisible(scentDescription, true);
        setVisible(scentNotes, true);
      });
    }, 160);
  }

  function filterCards(scentKey) {
    const showAll = scentKey === 'all';

    cards.forEach(function (card) {
      if (showAll || card.dataset.scent === scentKey) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    groups.forEach(function (group) {
      if (showAll || group.dataset.scent === scentKey) {
        group.classList.remove('hidden');
      } else {
        group.classList.add('hidden');
      }
    });

    groupLabels.forEach(function (label) {
      label.classList.toggle('hidden', !showAll);
    });
  }

  function activateTab(scentKey) {
    tabs.forEach(function (tab) {
      tab.classList.toggle('active', tab.dataset.scent === scentKey);
    });

    updatePanel(scentKey);
    filterCards(scentKey);

    // Update URL without reload
    const url = new URL(window.location.href);
    if (scentKey === 'all') {
      url.searchParams.delete('scent');
    } else {
      url.searchParams.set('scent', scentKey);
    }
    history.replaceState(null, '', url.toString());
  }

  // ── Event listeners ───────────────────────
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.dataset.scent);
    });
  });

  // ── Init from URL ─────────────────────────
  const params   = new URLSearchParams(window.location.search);
  const initScent = params.get('scent') || 'all';
  activateTab(initScent);

  // ── Mobile accordion ──────────────────────
  const accordionToggle = document.querySelector('.panel-accordion-toggle');
  const panelContent    = document.querySelector('.scent-panel-content');

  if (accordionToggle && panelContent) {
    accordionToggle.addEventListener('click', function () {
      const isOpen = panelContent.classList.contains('open');
      panelContent.classList.toggle('open', !isOpen);
      accordionToggle.classList.toggle('open', !isOpen);
    });
  }
})();
