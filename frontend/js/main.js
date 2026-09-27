/**
 * VIGNESWARA SOFTWARE SOLUTIONS
 * Core Application Controller & UI Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSolutionsSwitcher();
  initProjectsFilter();
  initModalSystem();
  initScrollAnimations();
  initProcessTimeline();
});

/**
 * Navigation Bar Controller & Mobile Menu
 */
function initNavigation() {
  const header = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Scroll compact header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  const toggleMobileMenu = (open) => {
    hamburgerBtn?.classList.toggle('active', open);
    mobileDrawer?.classList.toggle('open', open);
    mobileOverlay?.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  hamburgerBtn?.addEventListener('click', () => {
    const isOpen = mobileDrawer?.classList.contains('open');
    toggleMobileMenu(!isOpen);
  });

  mobileOverlay?.addEventListener('click', () => {
    toggleMobileMenu(false);
  });

  // Smooth scroll & close mobile drawer on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          toggleMobileMenu(false);
          const headerHeight = 75;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Active navigation scroll spy
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));
}

/**
 * Solutions Category Switcher
 */
function initSolutionsSwitcher() {
  const tabs = document.querySelectorAll('.solution-tab-btn');
  const badgeEl = document.getElementById('solActiveBadge');
  const titleEl = document.getElementById('solActiveTitle');
  const descEl = document.getElementById('solActiveDesc');
  const featuresContainer = document.getElementById('solActiveFeatures');
  const techContainer = document.getElementById('solActiveTech');
  const problemEl = document.getElementById('solActiveProblem');
  const solutionEl = document.getElementById('solActiveSolution');

  if (!tabs.length) return;

  const updateSolutionView = (key) => {
    const data = solutionsData[key];
    if (!data) return;

    if (badgeEl) badgeEl.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (problemEl) problemEl.textContent = data.problem;
    if (solutionEl) solutionEl.textContent = data.solution;

    if (featuresContainer) {
      featuresContainer.innerHTML = data.features.map(feat => `
        <div class="sol-feature-item">
          <span class="sol-feature-bullet"></span>
          <span>${feat}</span>
        </div>
      `).join('');
    }

    if (techContainer) {
      techContainer.innerHTML = data.techStack.map(tech => `
        <span class="tech-tag">${tech}</span>
      `).join('');
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-solution');
      updateSolutionView(key);
    });
  });
}

/**
 * Projects Filtering & Grid Rendering
 */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category?.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * Modal System for Project Deep Dives & Service Exploration
 */
function initModalSystem() {
  const modalBackdrop = document.getElementById('generalModalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const openModal = (title, contentHtml) => {
    if (!modalBackdrop) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = contentHtml;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach Service Card "Explore" Triggers
  document.querySelectorAll('.service-explore-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      const data = servicesDeepData[serviceKey];
      if (!data) return;

      const html = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-blue-600); font-weight: 700;">
            SERVICE MODULE ${data.num}
          </div>
          <p style="font-size: 1.05rem; color: var(--text-dark-primary); font-weight: 600; line-height: 1.5;">
            ${data.tagline}
          </p>
          <p style="font-size: 0.95rem; color: var(--text-dark-secondary); line-height: 1.7;">
            ${data.desc}
          </p>
          
          <div style="background-color: var(--bg-page-light); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem;">
            <h5 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-dark-primary);">
              Core Capabilities & Deliverables
            </h5>
            <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${data.capabilities.map(cap => `
                <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-dark-secondary);">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background-color: var(--color-blue-600);"></span>
                  ${cap}
                </li>
              `).join('')}
            </ul>
          </div>

          <div>
            <h5 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-dark-primary); text-transform: uppercase; font-family: var(--font-mono);">
              Supported Technology Stack
            </h5>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${data.technologies.map(t => `<span class="tech-tag" style="background-color: #ffffff; border-color: var(--border-light);">${t}</span>`).join('')}
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
            <a href="#contact" class="btn btn-primary" onclick="document.getElementById('generalModalBackdrop').classList.remove('active'); document.body.style.overflow='';">
              Request Project Scope for This Service
            </a>
          </div>
        </div>
      `;

      openModal(data.title, html);
    });
  });

  // Attach Project Detail Triggers
  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const proj = projectsData.find(p => p.id === projectId);
      if (!proj) return;

      const html = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="type-pill ${proj.tag.toLowerCase()}">${proj.tag}</span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dark-muted);">${proj.domain}</span>
          </div>

          <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-dark-primary); line-height: 1.5;">
            ${proj.headline}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background-color: var(--bg-page-light); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
              <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-dark-primary); margin-bottom: 0.4rem;">Problem Context</h5>
              <p style="font-size: 0.85rem; color: var(--text-dark-secondary); line-height: 1.5;">${proj.problem}</p>
            </div>
            <div style="background-color: var(--bg-page-light); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
              <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--color-blue-600); margin-bottom: 0.4rem;">Engineered Solution</h5>
              <p style="font-size: 0.85rem; color: var(--text-dark-secondary); line-height: 1.5;">${proj.solution}</p>
            </div>
          </div>

          <div>
            <h5 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text-dark-primary);">Key Architectural Features</h5>
            <ul style="display: flex; flex-direction: column; gap: 0.4rem;">
              ${proj.features.map(f => `
                <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-dark-secondary);">
                  <span style="color: var(--color-blue-600); font-weight: bold;">✔</span>
                  ${f}
                </li>
              `).join('')}
            </ul>
          </div>

          <div style="background-color: #0b1120; color: #ffffff; padding: 1rem; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.8rem;">
            <div style="color: var(--color-blue-400); font-size: 0.7rem; margin-bottom: 0.3rem;">// SYSTEM ARCHITECTURE</div>
            <div>${proj.architecture}</div>
          </div>

          <div>
            <h5 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-dark-primary); text-transform: uppercase; font-family: var(--font-mono);">
              Technologies Used
            </h5>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${proj.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `;

      openModal(proj.name, html);
    });
  });

  // Legal Modal Triggers (Privacy Policy & Terms)
  document.querySelectorAll('.legal-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const type = link.getAttribute('data-legal');
      if (type === 'privacy') {
        openModal("Privacy Policy", `
          <div style="font-size: 0.9rem; color: var(--text-dark-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
            <p><strong>Vigneswara Software Solutions</strong> values client confidentiality and data security. All project requirements, business workflows, and technical assets shared with us remain strictly confidential under standard non-disclosure agreements.</p>
            <p>Information submitted through our contact and consultation forms is exclusively utilized for project scoping, communication, and requirement analysis. We do not sell, distribute, or share client data with third parties.</p>
            <p>For inquiries regarding data protection standards or non-disclosure agreements, contact: <strong>contact@vigneswarasoftware.com</strong></p>
          </div>
        `);
      } else if (type === 'terms') {
        openModal("Terms & Conditions", `
          <div style="font-size: 0.9rem; color: var(--text-dark-secondary); line-height: 1.7; display: flex; flex-direction: column; gap: 1rem;">
            <p><strong>Engagement Terms:</strong> All software development, prototyping, and technical consultation engagements conducted by Vigneswara Software Solutions are governed by individualized Statements of Work (SOW) and service agreements.</p>
            <p><strong>Intellectual Property:</strong> Custom software, source code, and project deliverables engineered for clients become the exclusive property of the client upon fulfillment of agreed project milestone terms.</p>
            <p><strong>Prototypes & Research:</strong> Prototypes and feasibility demonstrations are designed for validation and testing purposes under documented technical constraints.</p>
          </div>
        `);
      }
    });
  });
}

/**
 * Development Process Interactive Stepper
 */
function initProcessTimeline() {
  const stepCards = document.querySelectorAll('.process-step-card');
  stepCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      stepCards.forEach(c => c.style.borderColor = 'var(--border-light)');
      card.style.borderColor = 'var(--color-blue-600)';
    });
  });
}

/**
 * Scroll Reveal Animations (Lightweight IntersectionObserver)
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.service-card, .why-principle-card, .process-step-card, .tech-category-column');
  
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity 0.5s ease ${(index % 4) * 0.1}s, transform 0.5s ease ${(index % 4) * 0.1}s, border-color 0.2s ease, box-shadow 0.2s ease`;
    observer.observe(el);
  });
}
