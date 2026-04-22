// ═══════════════════════════════════════════
// PRODUCT GALLERY — thumbnail swap + mobile carousel
// ═══════════════════════════════════════════

(function () {
  const thumbs  = document.querySelectorAll('.gallery-thumb');
  const mainImg = document.querySelector('.gallery-main-img');
  const dots    = document.querySelectorAll('.gallery-dot');

  // ── Thumbnail click ───────────────────────
  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');

      if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(function () {
          mainImg.src = thumb.dataset.full || thumb.querySelector('img')?.src || '';
          mainImg.style.opacity = '1';
        }, 150);
      }

      dots.forEach(function (d) { d.classList.remove('active'); });
      if (dots[i]) dots[i].classList.add('active');
    });
  });

  // ── Dot click (mobile) ────────────────────
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      dots.forEach(function (d) { d.classList.remove('active'); });
      dot.classList.add('active');

      thumbs.forEach(function (t) { t.classList.remove('active'); });
      if (thumbs[i]) thumbs[i].classList.add('active');
    });
  });

  // ── Scent pill switching ──────────────────
  const scentPills = document.querySelectorAll('.scent-pill');

  scentPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      scentPills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');

      const label = document.querySelector('.scent-selector-label span');
      if (label) label.textContent = pill.textContent;
    });
  });
})();
