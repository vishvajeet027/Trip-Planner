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
    this.initBackgroundSlider();
  }

  /**
   * Dynamic Background City Image Slider (Changes every 3 seconds)
   */
  initBackgroundSlider() {
    const cityImages = [
      { name: "Jaipur, Pink City", url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2000&q=85" },
      { name: "Varanasi, Sacred Ghats", url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=2000&q=85" },
      { name: "Agra, Taj Mahal", url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2000&q=85" },
      { name: "Goa, Tropical Coast", url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2000&q=85" },
      { name: "Mumbai, Coastal Skyline", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2000&q=85" },
      { name: "Udaipur, City of Lakes", url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2000&q=85" },
      { name: "New Delhi, Historic Capital", url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2000&q=85" },
      { name: "Leh Ladakh, High Pass", url: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=2000&q=85" },
      { name: "Manali, Alpine Valley", url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=85" },
      { name: "Kerala, Palm Backwaters", url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85" },
      { name: "Amritsar, Golden Temple", url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=2000&q=85" },
      { name: "Kolkata, Cultural Capital", url: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=2000&q=85" },
      { name: "Bengaluru, Garden City", url: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=2000&q=85" },
      { name: "Shimla, Queen of Hills", url: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=2000&q=85" },
      { name: "Rishikesh, Yoga Sanctuary", url: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=85" },
      { name: "Jaisalmer, Golden Fort", url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85" },
      { name: "Srinagar, Kashmir Paradise", url: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=2000&q=85" },
      { name: "Darjeeling, Himalayan Tea Hills", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85" },
      { name: "Hyderabad, Pearl City", url: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=2000&q=85" },
      { name: "Mysore, Illuminated Palace", url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2000&q=85" }
    ];

    let sliderContainer = document.getElementById('bg-slider-container');
    if (!sliderContainer) {
      sliderContainer = document.createElement('div');
      sliderContainer.id = 'bg-slider-container';
      document.body.prepend(sliderContainer);
    }

    let overlay = document.getElementById('bg-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'bg-overlay';
      document.body.prepend(overlay);
    }

    let slide1 = document.createElement('div');
    slide1.className = 'bg-slide active';
    slide1.style.backgroundImage = `url('${cityImages[0].url}')`;

    let slide2 = document.createElement('div');
    slide2.className = 'bg-slide';

    sliderContainer.appendChild(slide1);
    sliderContainer.appendChild(slide2);

    let cityBadge = document.createElement('div');
    cityBadge.id = 'bg-city-badge';
    cityBadge.className = 'bg-city-badge';
    cityBadge.innerHTML = `<i class="fas fa-location-dot"></i> <span id="bg-city-name">${cityImages[0].name}</span>`;
    document.body.appendChild(cityBadge);

    let currentIndex = 0;
    let activeSlide = slide1;
    let nextSlide = slide2;

    // Slide transition every 3000ms (3 seconds)
    setInterval(() => {
      currentIndex = (currentIndex + 1) % cityImages.length;
      const currentCity = cityImages[currentIndex];

      nextSlide.style.backgroundImage = `url('${currentCity.url}')`;
      nextSlide.classList.add('active');
      activeSlide.classList.remove('active');

      const cityNameEl = document.getElementById('bg-city-name');
      if (cityNameEl) {
        cityNameEl.style.opacity = '0';
        setTimeout(() => {
          cityNameEl.textContent = currentCity.name;
          cityNameEl.style.opacity = '1';
        }, 300);
      }

      let temp = activeSlide;
      activeSlide = nextSlide;
      nextSlide = temp;
    }, 3000);
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
