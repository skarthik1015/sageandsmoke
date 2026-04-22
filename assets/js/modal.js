// ═══════════════════════════════════════════
// WAITLIST MODAL
// ═══════════════════════════════════════════

(function () {
  const overlay    = document.querySelector('.modal-overlay');
  const closeBtn   = document.querySelector('.modal-close');
  const openBtns   = document.querySelectorAll('.btn-waitlist');
  const form       = document.querySelector('.modal-form');
  const formWrap   = document.querySelector('.modal-form-wrap');
  const successEl  = document.querySelector('.modal-success');
  const emailInput = document.querySelector('.modal-input[type="email"]');

  if (!overlay) return;

  function openModal() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      if (emailInput) emailInput.focus();
    }, 300);
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open triggers
  openBtns.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Click outside modal card
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Form submit
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@')) {
        if (emailInput) {
          emailInput.style.borderColor = '#c0392b';
          emailInput.focus();
          setTimeout(function () {
            emailInput.style.borderColor = '';
          }, 2000);
        }
        return;
      }

      // In prototype: just show success state
      // In production: replace this with Klaviyo API call
      if (formWrap)  formWrap.classList.add('hidden');
      if (successEl) successEl.classList.add('visible');

      // Auto-close after 3 seconds
      setTimeout(function () {
        closeModal();
        setTimeout(function () {
          if (formWrap)  formWrap.classList.remove('hidden');
          if (successEl) successEl.classList.remove('visible');
          if (form)      form.reset();
        }, 400);
      }, 3000);
    });
  }

  // Focus trap inside modal
  overlay.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open') || e.key !== 'Tab') return;

    const focusable = overlay.querySelectorAll(
      'button, input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
