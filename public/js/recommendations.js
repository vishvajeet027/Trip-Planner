/**
 * Dynamic Trip Details Page Controller
 * Reads URL ?id=destinationId and displays rich breakdown.
 */

class TripDetailsController {
  constructor() {
    this.destinations = [];
    this.hotels = [];
    this.activities = {};
    this.foods = {};

    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const destId = urlParams.get('id') || 'goa';

    this.destinations = await window.appController.fetchData('destinations');
    this.hotels = await window.appController.fetchData('hotels');
    this.activities = await window.appController.fetchData('activities');
    this.foods = await window.appController.fetchData('foods');

    const dest = this.destinations.find(d => d.id.toLowerCase() === destId.toLowerCase()) || this.destinations[0];
    this.renderDetails(dest);
  }

  renderDetails(dest) {
    const banner = document.getElementById('details-banner');
    const content = document.getElementById('details-content');
    
    if (banner) {
      banner.style.backgroundImage = `linear-gradient(to bottom, rgba(9,13,22,0.4), rgba(9,13,22,0.95)), url('${dest.bannerImage || dest.image}')`;
    }

    if (content) {
      const destActs = this.activities[dest.id.toLowerCase()] || [];
      const destFoods = this.foods[dest.id.toLowerCase()] || [];
      const destHotels = this.hotels.filter(h => h.city.toLowerCase() === dest.name.toLowerCase() || h.state.toLowerCase() === dest.state.toLowerCase());

      content.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:2rem;">
          
          <!-- OVERVIEW HEADER -->
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1.5rem;">
            <div>
              <span class="ai-badge" style="margin-bottom:0.5rem;"><i class="fas fa-sparkles"></i> AI Featured Destination</span>
              <h1 style="font-size:2.8rem;margin-bottom:0.25rem;">${dest.name}, ${dest.state}</h1>
              <p style="color:var(--text-muted);font-size:1.15rem;">${dest.tagline}</p>
            </div>
            
            <a href="/pages/ai-planner.html" class="btn btn-glow">
              <i class="fas fa-magic"></i> Plan ${dest.name} with AI
            </a>
          </div>

          <!-- METRICS GRID -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:1rem;">
            <div class="glass-card">
              <span style="color:var(--text-subtle);font-size:0.8rem;display:block;">Best Time to Visit</span>
              <strong style="font-size:1.1rem;color:var(--accent-amber);">${dest.bestTimeToVisit}</strong>
            </div>

            <div class="glass-card">
              <span style="color:var(--text-subtle);font-size:0.8rem;display:block;">Ideal Stay Duration</span>
              <strong style="font-size:1.1rem;color:var(--accent-cyan);">${dest.idealDays ? dest.idealDays.join(' - ') : '3-5'} Days</strong>
            </div>

            <div class="glass-card">
              <span style="color:var(--text-subtle);font-size:0.8rem;display:block;">Est. Budget / Day</span>
              <strong style="font-size:1.1rem;color:var(--accent-emerald);">₹${dest.avgBudgetPerDay.toLocaleString('en-IN')}</strong>
            </div>

            <div class="glass-card">
              <span style="color:var(--text-subtle);font-size:0.8rem;display:block;">Travel Rating</span>
              <strong style="font-size:1.1rem;color:var(--primary);"><i class="fas fa-star" style="color:#f59e0b;"></i> ${dest.rating} / 5.0</strong>
            </div>
          </div>

          <!-- OVERVIEW TEXT -->
          <div class="glass-card">
            <h3 style="font-size:1.3rem;margin-bottom:0.75rem;">Destination Overview</h3>
            <p style="color:var(--text-muted);font-size:1rem;line-height:1.7;">${dest.overview}</p>
          </div>

          <!-- TWO COLUMN: ACTIVITIES & FOOD -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;" class="planner-grid">
            
            <div class="glass-card">
              <h3 style="font-size:1.2rem;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;">
                <i class="fas fa-hiking" style="color:var(--accent-cyan);"></i> Top Recommended Activities
              </h3>
              <div style="display:flex;flex-direction:column;gap:0.75rem;">
                ${destActs.length > 0 ? destActs.map(a => `
                  <div style="padding:0.75rem;background:rgba(255,255,255,0.03);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
                    <div>
                      <strong style="font-size:0.95rem;display:block;">${a.name}</strong>
                      <span style="font-size:0.75rem;color:var(--text-subtle);">${a.category} • ${a.duration}</span>
                    </div>
                    <span style="font-size:0.85rem;color:var(--accent-emerald);font-weight:600;">₹${a.cost}</span>
                  </div>
                `).join('') : '<p style="color:var(--text-muted);">Guided tours & sightseeing available.</p>'}
              </div>
            </div>

            <div class="glass-card">
              <h3 style="font-size:1.2rem;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;">
                <i class="fas fa-utensils" style="color:var(--accent-amber);"></i> Regional Food Delicacies
              </h3>
              <div style="display:flex;flex-direction:column;gap:0.75rem;">
                ${destFoods.length > 0 ? destFoods.map(f => `
                  <div style="padding:0.75rem;background:rgba(255,255,255,0.03);border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
                    <div>
                      <strong style="font-size:0.95rem;display:block;">${f.name}</strong>
                      <span style="font-size:0.75rem;color:var(--text-subtle);">Spot: ${f.recommendedSpot}</span>
                    </div>
                    <span style="font-size:0.85rem;color:var(--accent-amber);font-weight:600;">₹${f.avgCost}</span>
                  </div>
                `).join('') : '<p style="color:var(--text-muted);">Local street food stalls & fine dining restaurants.</p>'}
              </div>
            </div>

          </div>

        </div>
      `;
    }
  }
}

new TripDetailsController();
