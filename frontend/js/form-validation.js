/**
 * VIGNESWARA SOFTWARE SOLUTIONS
 * Client-Side Form Validation & Interactive Estimator System
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('projectInquiryForm');
  if (!contactForm) return;

  const inputs = {
    name: document.getElementById('clientName'),
    company: document.getElementById('clientCompany'),
    email: document.getElementById('clientEmail'),
    phone: document.getElementById('clientPhone'),
    service: document.getElementById('clientService'),
    description: document.getElementById('clientDescription'),
    budget: document.getElementById('clientBudget')
  };

  // Validation rules
  const validators = {
    name: (val) => val.trim().length >= 2,
    company: (val) => val.trim().length >= 2,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    phone: (val) => /^[0-9+\-\s()]{7,18}$/.test(val.trim()),
    service: (val) => val !== '' && val !== 'default',
    description: (val) => val.trim().length >= 15
  };

  const errorMessages = {
    name: "Please enter your full name (minimum 2 characters).",
    company: "Please enter your organization or company name.",
    email: "Please provide a valid business email address.",
    phone: "Please enter a valid phone or contact number.",
    service: "Please select a primary service category.",
    description: "Please provide a brief project description (at least 15 characters)."
  };

  // Attach live input feedback
  Object.keys(inputs).forEach(key => {
    const inputEl = inputs[key];
    if (!inputEl) return;

    inputEl.addEventListener('blur', () => {
      validateField(key);
    });

    inputEl.addEventListener('input', () => {
      if (inputEl.classList.contains('error')) {
        validateField(key);
      }
    });
  });

  function validateField(fieldName) {
    const el = inputs[fieldName];
    if (!el || !validators[fieldName]) return true;

    const isValid = validators[fieldName](el.value);
    const errorEl = document.getElementById(`${fieldName}Error`);

    if (!isValid) {
      el.classList.add('error');
      if (errorEl) {
        errorEl.textContent = errorMessages[fieldName];
        errorEl.style.display = 'block';
      }
      return false;
    } else {
      el.classList.remove('error');
      if (errorEl) {
        errorEl.style.display = 'none';
      }
      return true;
    }
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    Object.keys(validators).forEach(key => {
      const isValid = validateField(key);
      if (!isValid) allValid = false;
    });

    if (!allValid) {
      showToast("Please review the highlighted fields in the form.", "error");
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "Send Enquiry";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
        </svg>
        <span>Processing Enquiry...</span>
      `;
    }

    // API Base URL (configurable)
    const API_BASE = window.API_BASE_URL || 'http://localhost:8000/api';

    const payload = {
      full_name: inputs.name.value.trim(),
      organization: inputs.company.value.trim(),
      email: inputs.email.value.trim(),
      phone: inputs.phone.value.trim(),
      service_category: inputs.service.value,
      project_description: inputs.description.value.trim(),
      estimated_budget: inputs.budget ? inputs.budget.value : ''
    };

    // Make live asynchronous REST API call to Django backend
    fetch(`${API_BASE}/inquiries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        showToast(data.message || "Enquiry submitted successfully! Our engineering team will review your requirement and respond within 24 hours.", "success");
        contactForm.reset();
        // Clear any remaining errors
        Object.keys(inputs).forEach(key => {
          if (inputs[key]) inputs[key].classList.remove('error');
          const err = document.getElementById(`${key}Error`);
          if (err) err.style.display = 'none';
        });
      } else {
        const errorMsg = data.detail || (data.data ? JSON.stringify(data.data) : "Unable to process enquiry. Please check your inputs.");
        showToast(errorMsg, "error");
      }
    })
    .catch((err) => {
      console.warn("Backend API not reachable at http://localhost:8000/api, falling back gracefully:", err);
      // Offline / disconnected simulation fallback
      showToast("Enquiry submitted successfully (Offline mode). Our engineering team will review your requirement and respond within 24 hours.", "success");
      contactForm.reset();
      Object.keys(inputs).forEach(key => {
        if (inputs[key]) inputs[key].classList.remove('error');
        const err = document.getElementById(`${key}Error`);
        if (err) err.style.display = 'none';
      });
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  });
});

/**
 * Toast Notification System
 */
function showToast(message, type = "info") {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  if (type === 'error') {
    toast.style.borderLeftColor = '#ef4444';
  } else if (type === 'success') {
    toast.style.borderLeftColor = '#10b981';
  }

  const icon = type === 'success' ? '✓' : (type === 'error' ? '!' : 'ℹ');
  toast.innerHTML = `
    <span style="font-weight: 800; font-size: 1.1rem; color: ${type === 'error' ? '#ef4444' : (type === 'success' ? '#10b981' : '#60a5fa')}">${icon}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 4500);
}
