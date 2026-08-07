/**
 * Stay Page Controller
 * City selector with 20+ Indian cities and 5+ hotels per city with AI Hotel Match scores.
 */

class StayController {
  constructor() {
    this.hotels = [];
    this.selectedCity = 'Goa';

    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  async init() {
    this.hotels = await window.appController.fetchData('hotels');
    this.renderCitySelector();
    this.renderHotels();
  }

  renderCitySelector() {
    const citySelect = document.getElementById('stay-city-select');
    if (!citySelect) return;

    // Extract unique cities
    const cities = Array.from(new Set(this.hotels.map(h => h.city)));
    citySelect.innerHTML = cities.map(c => `<option value="${c}">${c}</option>`).join('');

    citySelect.addEventListener('change', (e) => {
      this.selectedCity = e.target.value;
      this.renderHotels();
    });
  }

  renderHotels() {
    const grid = document.getElementById('stay-hotels-grid');
    if (!grid) return;

    const cityHotels = this.hotels.filter(h => h.city.toLowerCase() === this.selectedCity.toLowerCase());

    if (cityHotels.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:3rem;" class="glass-card">
          <p style="color:var(--text-muted);">No hotels found for ${this.selectedCity}.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = cityHotels.map(h => {
      // Calculate dynamic AI Hotel Suitability Score
      const aiScore = window.aiEngine.calculateHotelScore(15000, h.category, h);

      return `
        <div class="glass-card" style="padding:0;overflow:hidden;display:flex;flex-direction:column;">
          <div style="position:relative;height:200px;">
            <img src="${h.image}" alt="${h.name}" style="width:100%;height:100%;object-fit:cover;">
            <div style="position:absolute;top:12px;right:12px;" class="ai-badge">
              <i class="fas fa-microchip"></i> AI Match: ${aiScore}%
            </div>
            <div style="position:absolute;bottom:12px;left:12px;background:rgba(9,13,22,0.85);backdrop-filter:blur(8px);padding:4px 10px;border-radius:6px;font-size:0.8rem;color:var(--accent-amber);">
              ${h.category}
            </div>
          </div>

          <div style="padding:1.25rem;display:flex;flex-direction:column;flex-grow:1;justify-content:space-between;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.4rem;">
                <h3 style="font-size:1.15rem;">${h.name}</h3>
                <span style="font-size:0.85rem;color:var(--accent-amber);"><i class="fas fa-star"></i> ${h.rating}</span>
              </div>

              <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:1rem;">
                ${h.description}
              </p>

              <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.25rem;">
                ${(h.amenities || []).slice(0, 3).map(a => `
                  <span style="font-size:0.75rem;background:rgba(255,255,255,0.05);color:var(--text-muted);padding:2px 8px;border-radius:4px;">
                    <i class="fas fa-check" style="color:var(--accent-emerald);"></i> ${a}
                  </span>
                `).join('')}
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:1px solid var(--border-glass);">
              <div>
                <span style="font-size:0.75rem;color:var(--text-subtle);display:block;">Price per night</span>
                <strong style="color:var(--accent-emerald);font-size:1.1rem;">₹${h.pricePerNight.toLocaleString('en-IN')}</strong>
              </div>

              <button class="btn btn-primary" style="padding:0.4rem 0.9rem;font-size:0.85rem;" onclick="window.appController.showToast('Hotel selection saved to AI Planner preferences!', 'success')">
                Select Stay
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

new StayController();
