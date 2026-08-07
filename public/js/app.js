/**
 * Global App Controller
 * API Data fetcher helper, header state controller, toast notifications.
 */

class AppController {
  constructor() {
    this.apiBase = '/api';
    this.init();
  }

  init() {
    this.highlightActiveNavLink();
  }

  /**
   * Universal fetcher with error handling
   */
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiBase}/${endpoint}`);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error(`Failed fetching ${endpoint}:`, err);
      this.showToast(`Error fetching data: ${err.message}`, 'error');
      return [];
    }
  }

  highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === '/index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `glass-card toast-${type}`;
    toast.style.cssText = 'padding:12px 20px;border-radius:10px;color:#fff;font-size:0.9rem;display:flex;align-items:center;gap:10px;animation:fadeInUp 0.3s ease;';
    
    const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    const color = type === 'error' ? '#f43f5e' : '#10b981';
    
    toast.innerHTML = `<i class="fas ${icon}" style="color:${color};font-size:1.1rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

window.appController = new AppController();
