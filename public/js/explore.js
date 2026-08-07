/**
 * Explore Page Controller
 * Controls live search, interest tags filter, travel type pills, and sorting.
 */

class ExploreController {
  constructor() {
    this.destinations = [];
    this.filteredDestinations = [];
    this.selectedTravelType = 'ALL';
    this.selectedInterest = 'ALL';
    this.searchQuery = '';

    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  async init() {
    this.destinations = await window.appController.fetchData('destinations');
    this.filteredDestinations = [...this.destinations];
    this.renderDestinations();
    this.bindEvents();
  }

  bindEvents() {
    const searchInput = document.getElementById('explore-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.applyFilters();
      });
    }

    // Filter pills for travel types
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.selectedTravelType = pill.dataset.type || 'ALL';
        this.applyFilters();
      });
    });

    // Sort Dropdown
    const sortSelect = document.getElementById('explore-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortDestinations(e.target.value);
      });
    }
  }

  applyFilters() {
    this.filteredDestinations = this.destinations.filter(d => {
      // 1. Search Query Filter
      const matchesSearch = !this.searchQuery || 
        d.name.toLowerCase().includes(this.searchQuery) ||
        d.state.toLowerCase().includes(this.searchQuery) ||
        d.tagline.toLowerCase().includes(this.searchQuery);

      // 2. Travel Type Filter
      const matchesType = this.selectedTravelType === 'ALL' || 
        (d.travelTypes && d.travelTypes.some(t => t.toLowerCase() === this.selectedTravelType.toLowerCase()));

      return matchesSearch && matchesType;
    });

    this.renderDestinations();
  }

  sortDestinations(sortKey) {
    if (sortKey === 'rating') {
      this.filteredDestinations.sort((a, b) => b.rating - a.rating);
    } else if (sortKey === 'budget-low') {
      this.filteredDestinations.sort((a, b) => a.avgBudgetPerDay - b.avgBudgetPerDay);
    } else if (sortKey === 'budget-high') {
      this.filteredDestinations.sort((a, b) => b.avgBudgetPerDay - a.avgBudgetPerDay);
    }
    this.renderDestinations();
  }

  renderDestinations() {
    const grid = document.getElementById('explore-grid');
    if (!grid) return;

    if (this.filteredDestinations.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;" class="glass-card">
          <i class="fas fa-search" style="font-size:3rem;color:var(--text-subtle);margin-bottom:1rem;"></i>
          <h3>No Destinations Found</h3>
          <p style="color:var(--text-muted);">Try adjusting your search criteria or filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.filteredDestinations.map(d => `
      <div class="glass-card" style="padding:0;overflow:hidden;display:flex;flex-direction:column;">
        <div style="position:relative;height:220px;overflow:hidden;">
          <img src="${d.image}" alt="${d.name}" style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
          <div style="position:absolute;top:12px;right:12px;" class="ai-badge">
            <i class="fas fa-star" style="color:#f59e0b;"></i> ${d.rating}
          </div>
          <div style="position:absolute;bottom:12px;left:12px;background:rgba(9,13,22,0.8);backdrop-filter:blur(8px);padding:4px 10px;border-radius:6px;font-size:0.8rem;">
            ${d.state}
          </div>
        </div>

        <div style="padding:1.25rem;display:flex;flex-direction:column;flex-grow:1;justify-content:space-between;">
          <div>
            <h3 style="font-size:1.25rem;margin-bottom:0.25rem;">${d.name}</h3>
            <p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
              ${d.overview}
            </p>

            <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.25rem;">
              ${(d.interests || []).slice(0, 3).map(int => `
                <span style="font-size:0.75rem;background:rgba(99,102,241,0.12);color:var(--primary);padding:2px 8px;border-radius:4px;border:1px solid rgba(99,102,241,0.2);">
                  ${int}
                </span>
              `).join('')}
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:1px solid var(--border-glass);">
            <div>
              <span style="font-size:0.75rem;color:var(--text-subtle);display:block;">Avg Budget</span>
              <strong style="color:var(--accent-emerald);">₹${d.avgBudgetPerDay.toLocaleString('en-IN')}/day</strong>
            </div>

            <a href="/pages/trip-details.html?id=${d.id}" class="btn btn-outline" style="padding:0.4rem 0.9rem;font-size:0.85rem;">
              View Details <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }
}

new ExploreController();
