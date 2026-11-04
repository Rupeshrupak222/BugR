/**
 * Bug Refinery - Main Interactive Script
 * Beyond Theory. Industry-Simulation Platform.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCookieConsent();
  initTerminalSimulation();
  initLabFilters();
  initForms();
});

/**
 * Mobile Navigation Toggle
 */
function initNavbar() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    // Close on clicking outside
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.add('hidden');
      }
    });
  }
}

/**
 * Cookie Consent Manager
 * Exact wording: "Cookie Consent: This site stores only your cookie choice in your own browser. No tracking, advertising, or analytics cookies are used."
 */
function initCookieConsent() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept-btn');
  const dismissBtn = document.getElementById('cookie-dismiss-btn');

  if (!banner) return;

  const choice = localStorage.getItem('br_cookie_consent');
  if (!choice) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 800);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('br_cookie_consent', 'accepted');
      banner.classList.remove('show');
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      localStorage.setItem('br_cookie_consent', 'dismissed');
      banner.classList.remove('show');
    });
  }
}

/**
 * Live Terminal Simulation
 * Shows realistic production debugging cycle turning RED to GREEN
 */
function initTerminalSimulation() {
  const terminalLogs = document.getElementById('terminal-live-logs');
  if (!terminalLogs) return;

  const steps = [
    { text: '<span class="text-slate-400">$ bugrefinery --lab python-fullstack --ticket PROD-8041</span>', delay: 400 },
    { text: '<span class="text-amber-400">⚡ Initializing dirty repo clone: /srv/payments-service (v2.4.1)...</span>', delay: 800 },
    { text: '<span class="text-slate-400">$ pytest tests/test_payment_concurrency.py</span>', delay: 1400 },
    { text: '<span class="text-rose-400 font-bold">[FAIL] AssertionError: Double debit recorded on webhook race condition!</span>', delay: 2000 },
    { text: '<span class="text-rose-400">  File "payments/tasks.py", line 142 in execute_charge</span>', delay: 2400 },
    { text: '<span class="text-slate-400">$ apply-patch safe_idempotency_key.diff</span>', delay: 3200 },
    { text: '<span class="text-cyan-400">✓ Distributed Redis lock acquired with expiration TTL=5000ms</span>', delay: 3900 },
    { text: '<span class="text-slate-400">$ pytest tests/test_payment_concurrency.py -v</span>', delay: 4600 },
    { text: '<span class="text-emerald-400 font-bold">[PASS] 32/32 tests passed (4 concurrency edge cases resolved)</span>', delay: 5400 },
    { text: '<span class="text-emerald-300">🚀 PR #149 approved by Senior Staff Reviewer. Ready for deployment.</span>', delay: 6100 }
  ];

  let currentIdx = 0;

  function renderStep() {
    if (currentIdx < steps.length) {
      const step = steps[currentIdx];
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = 'py-0.5';
        div.innerHTML = step.text;
        terminalLogs.appendChild(div);
        terminalLogs.scrollTop = terminalLogs.scrollHeight;
        currentIdx++;
        renderStep();
      }, step.delay);
    } else {
      // Loop after a brief delay
      setTimeout(() => {
        terminalLogs.innerHTML = '';
        currentIdx = 0;
        renderStep();
      }, 5000);
    }
  }

  renderStep();
}

/**
 * Interactive Lab Catalog Filter
 */
function initLabFilters() {
  const filterBtns = document.querySelectorAll('.lab-filter-btn');
  const labCards = document.querySelectorAll('.lab-card');

  if (!filterBtns.length || !labCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500/50');
        b.classList.add('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');
      });

      btn.classList.remove('bg-zinc-900', 'text-zinc-400', 'border-zinc-800');
      btn.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500/50');

      const filter = btn.getAttribute('data-filter');

      labCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Forms (Waitlist & Corporate Inquiry)
 */
function initForms() {
  const studentForm = document.getElementById('student-waitlist-form');
  const companyForm = document.getElementById('company-inquiry-form');
  const contactForm = document.getElementById('contact-form');

  if (studentForm) {
    studentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = studentForm.querySelector('input[name="name"]')?.value || 'Learner';
      showNotification('Success!', `Thank you ${name}. You have been added to the early access waitlist. We will notify you when lab cohorts open!`, 'emerald');
      studentForm.reset();
    });
  }

  if (companyForm) {
    companyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const comp = companyForm.querySelector('input[name="company"]')?.value || 'your team';
      showNotification('Inquiry Received', `Thank you! Our corporate talent team will connect with ${comp} within 1 business day.`, 'amber');
      companyForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('Message Sent', 'Thank you for reaching out to Bug Refinery. Our team will get back to you at support@bugrefinery.com within one business day.', 'cyan');
      contactForm.reset();
    });
  }
}

/**
 * Modern floating toast notification
 */
function showNotification(title, message, color = 'amber') {
  const existing = document.getElementById('br-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'br-toast';
  toast.className = `fixed top-6 right-6 z-50 max-w-md bg-zinc-900 border border-${color}-500/40 rounded-xl p-4 shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all duration-300 transform translate-y-[-20px] opacity-0`;
  
  const iconColor = color === 'emerald' ? 'text-emerald-400' : (color === 'cyan' ? 'text-cyan-400' : 'text-amber-400');

  toast.innerHTML = `
    <div class="mt-0.5 ${iconColor}">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    </div>
    <div class="flex-1">
      <h4 class="text-sm font-semibold text-white">${title}</h4>
      <p class="text-xs text-zinc-300 mt-1 leading-relaxed">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" class="text-zinc-500 hover:text-zinc-300">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  `;

  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.remove('translate-y-[-20px]', 'opacity-0');
  }, 10);

  // Auto remove after 5.5s
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-20px]');
    setTimeout(() => toast.remove(), 300);
  }, 5500);
}
