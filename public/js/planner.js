/**
 * Planner Page Controller
 * Controls multi-step user preference form, triggers AI recommendation algorithm,
 * handles budget optimization warnings, renders dynamic itinerary, and saves trips.
 */

class PlannerController {
  constructor() {
    this.destinations = [];
    this.hotels = [];
    this.activities = {};
    this.foods = {};
    this.currentStep = 1;

    document.addEventListener('DOMContentLoaded', () => this.init());
  }

  async init() {
    // Fetch data from Node server API endpoints
    this.destinations = await window.appController.fetchData('destinations');
    this.hotels = await window.appController.fetchData('hotels');
    this.activities = await window.appController.fetchData('activities');
    this.foods = await window.appController.fetchData('foods');

    this.populateDestinationDropdown();
    this.bindEvents();
  }

  populateDestinationDropdown() {
    const destSelect = document.getElementById('pref-destination');
    if (!destSelect) return;

    destSelect.innerHTML = '<option value="ANY">✨ Let AI Recommend Best Destination</option>';
    this.destinations.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = `${d.name}, ${d.state}`;
      destSelect.appendChild(opt);
    });
  }

  bindEvents() {
    const form = document.getElementById('ai-planner-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.generateAITrip();
      });
    }

    // Range slider value updater
    const budgetInput = document.getElementById('pref-budget');
    const budgetDisplay = document.getElementById('budget-value-display');
    if (budgetInput && budgetDisplay) {
      budgetInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        budgetDisplay.textContent = `₹${val.toLocaleString('en-IN')}`;
      });
    }
  }

  async generateAITrip() {
    const destChoice = document.getElementById('pref-destination').value;
    const days = parseInt(document.getElementById('pref-days').value) || 5;
    const budget = parseInt(document.getElementById('pref-budget').value) || 30000;
    const travelers = parseInt(document.getElementById('pref-travelers').value) || 2;
    const travelType = document.getElementById('pref-travel-type').value || 'Adventure';

    // Gather selected checkboxes for interests
    const interestBoxes = document.querySelectorAll('input[name="interests"]:checked');
    const interests = Array.from(interestBoxes).map(b => b.value);

    const userPref = {
      budget,
      days,
      travelers,
      travelType,
      interests: interests.length > 0 ? interests : ['Mountains', 'Nature']
    };

    // Show Scanning Animation UI
    const resultContainer = document.getElementById('planner-result-section');
    const formSection = document.getElementById('planner-form-section');
    
    if (resultContainer) {
      resultContainer.style.display = 'block';
      resultContainer.innerHTML = `
        <div class="glass-card" style="text-align:center;padding:4rem 2rem;position:relative;overflow:hidden;">
          <div class="ai-scanner-bar"></div>
          <i class="fas fa-brain text-gradient" style="font-size:3.5rem;margin-bottom:1.5rem;animation:pulseGlow 2s infinite;"></i>
          <h2 style="font-size:1.8rem;margin-bottom:0.5rem;">AI Recommendation Engine Scanning...</h2>
          <p style="color:var(--text-muted);max-width:500px;margin:0 auto;">
            Analyzing 20+ Indian destinations, matching interest vectors, optimizing hotel budget per day, and dynamically generating your tailored day-by-day itinerary...
          </p>
        </div>
      `;
      resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Simulate intelligent calculation delay
    setTimeout(() => {
      let selectedDest = null;
      let scoreResult = null;

      if (destChoice !== 'ANY') {
        const found = this.destinations.find(d => d.id === destChoice);
        if (found) {
          selectedDest = found;
          scoreResult = window.aiEngine.calculateDestinationScore(userPref, selectedDest);
        }
      }

      if (!selectedDest) {
        // Rank all destinations and pick #1 top match
        const scoredList = this.destinations.map(d => window.aiEngine.calculateDestinationScore(userPref, d));
        scoredList.sort((a, b) => b.finalScore - a.finalScore);
        scoreResult = scoredList[0];
        selectedDest = scoreResult.destination;
      }

      // Generate dynamic itinerary
      const itinerary = window.aiEngine.generateDynamicItinerary(
        selectedDest,
        days,
        travelType,
        this.activities,
        this.foods
      );

      // Render Complete Generated Trip View
      this.renderTripResults(userPref, scoreResult, itinerary);
    }, 1800);
  }

  renderTripResults(userPref, scoreResult, itinerary) {
    const container = document.getElementById('planner-result-section');
    if (!container) return;

    const dest = scoreResult.destination;
    const estCost = scoreResult.estTripCost;
    const isOverBudget = userPref.budget < estCost;
    const remaining = userPref.budget - estCost;
    const costPerPerson = Math.round(estCost / userPref.travelers);

    container.innerHTML = `
      <div class="animate-fade-up" style="display:flex;flex-direction:column;gap:2rem;">
        
        <!-- TOP SUMMARY HEADER -->
        <div class="glass-card" style="border:1px solid var(--border-accent);position:relative;overflow:hidden;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1.5rem;">
            <div>
              <div class="ai-badge" style="margin-bottom:0.75rem;">
                <i class="fas fa-microchip"></i> AI Match Score: ${scoreResult.matchPercentage}%
              </div>
              <h1 style="font-size:2.2rem;margin-bottom:0.25rem;">${dest.name}, ${dest.state}</h1>
              <p style="color:var(--text-muted);font-size:1.05rem;">${dest.tagline}</p>
            </div>
            
            <div style="text-align:right;">
              <button id="btn-save-trip" class="btn btn-glow">
                <i class="fas fa-bookmark"></i> Save to My Trips
              </button>
            </div>
          </div>

          <div style="margin-top:1.5rem;padding:1rem;background:rgba(255,255,255,0.03);border-radius:var(--radius-md);border-left:4px solid var(--accent-cyan);">
            <strong style="color:var(--accent-cyan);"><i class="fas fa-sparkles"></i> Why AI Selected This:</strong>
            <p style="color:var(--text-main);margin-top:0.25rem;">${scoreResult.explanation}</p>
          </div>
        </div>

        <!-- TWO COLUMN LAYOUT: ITINERARY & BUDGET OPTIMIZER -->
        <div style="display:grid;grid-template-columns:2fr 1fr;gap:2rem;" class="planner-grid">
          
          <!-- LEFT: DAY BY DAY ITINERARY -->
          <div style="display:flex;flex-direction:column;gap:1.5rem;">
            <h3 style="font-size:1.4rem;display:flex;align-items:center;gap:0.5rem;">
              <i class="fas fa-calendar-alt" style="color:var(--primary);"></i> Dynamic ${userPref.days}-Day Itinerary Plan
            </h3>

            ${itinerary.map(day => `
              <div class="glass-card" style="border-left:3px solid var(--primary);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                  <h4 style="font-size:1.15rem;color:var(--accent-cyan);">${day.title}</h4>
                  <span style="font-size:0.85rem;background:rgba(255,255,255,0.06);padding:0.25rem 0.75rem;border-radius:99px;">
                    Day ${day.day}
                  </span>
                </div>
                
                <div style="display:flex;flex-direction:column;gap:0.75rem;font-size:0.95rem;color:var(--text-muted);">
                  <p><strong style="color:var(--text-main);"><i class="fas fa-sun" style="color:#f59e0b;"></i> Morning:</strong> ${day.morning}</p>
                  <p><strong style="color:var(--text-main);"><i class="fas fa-cloud-sun" style="color:#38bdf8;"></i> Afternoon:</strong> ${day.afternoon}</p>
                  <p><strong style="color:var(--text-main);"><i class="fas fa-moon" style="color:#a855f7;"></i> Evening:</strong> ${day.evening}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- RIGHT: BUDGET INTELLIGENCE PANEL -->
          <div>
            <div class="glass-card" style="position:sticky;top:100px;">
              <h3 style="font-size:1.3rem;margin-bottom:1.25rem;display:flex;align-items:center;gap:0.5rem;">
                <i class="fas fa-calculator" style="color:var(--accent-emerald);"></i> Budget Optimization
              </h3>

              <div style="display:flex;flex-direction:column;gap:1rem;margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;">
                  <span style="color:var(--text-muted);">Total User Budget:</span>
                  <strong>₹${userPref.budget.toLocaleString('en-IN')}</strong>
                </div>

                <div style="display:flex;justify-content:space-between;">
                  <span style="color:var(--text-muted);">Estimated Trip Cost:</span>
                  <strong style="color:${isOverBudget ? 'var(--accent-rose)' : 'var(--accent-emerald)'}">
                    ₹${estCost.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div style="display:flex;justify-content:space-between;">
                  <span style="color:var(--text-muted);">Cost Per Person:</span>
                  <strong>₹${costPerPerson.toLocaleString('en-IN')}</strong>
                </div>

                <div style="display:flex;justify-content:space-between;">
                  <span style="color:var(--text-muted);">Budget Status:</span>
                  <span style="font-weight:700;color:${isOverBudget ? 'var(--accent-rose)' : 'var(--accent-emerald)'}">
                    ${isOverBudget ? 'Slightly Over Budget' : 'Within Budget'}
                  </span>
                </div>
              </div>

              ${isOverBudget ? `
                <div style="padding:1rem;background:rgba(244,63,94,0.1);border:1px solid rgba(244,63,94,0.3);border-radius:var(--radius-md);font-size:0.88rem;color:var(--text-main);">
                  <strong style="color:var(--accent-rose);"><i class="fas fa-lightbulb"></i> AI Cost-Saving Suggestion:</strong>
                  <p style="margin-top:0.4rem;">
                    Your estimated cost exceeds budget by ₹${Math.abs(remaining).toLocaleString('en-IN')}. AI suggests selecting a 3-star boutique hotel instead of 5-star heritage stay to bring cost within budget.
                  </p>
                </div>
              ` : `
                <div style="padding:1rem;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:var(--radius-md);font-size:0.88rem;color:var(--text-main);">
                  <strong style="color:var(--accent-emerald);"><i class="fas fa-check-circle"></i> AI Budget Approval:</strong>
                  <p style="margin-top:0.4rem;">
                    Trip cost fits comfortably! You have a surplus buffer of ₹${remaining.toLocaleString('en-IN')} for personal shopping.
                  </p>
                </div>
              `}
            </div>
          </div>
        </div>

      </div>
    `;

    // Bind Save Trip Event
    const saveBtn = document.getElementById('btn-save-trip');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const tripData = {
          destination: dest.name,
          state: dest.state,
          days: userPref.days,
          budget: userPref.budget,
          estCost,
          travelers: userPref.travelers,
          travelType: userPref.travelType,
          matchScore: scoreResult.matchPercentage,
          itinerary
        };
        const success = window.storageManager.saveTrip(tripData);
        if (success) {
          window.appController.showToast(`Saved ${dest.name} trip to My Trips!`, 'success');
        }
      });
    }
  }
}

new PlannerController();
