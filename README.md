# AI-Based Smart Personalized Trip Planner

An innovative AI-powered personalized travel recommendation and itinerary optimization system built for college final-year presentation.

## 🎓 Academic Concept & AI Algorithm

The system replaces traditional static travel packages with a dynamic **Multi-Criteria Decision Analysis (MCDA)** recommendation engine implemented in Vanilla JavaScript:

$$\text{Destination Score} = w_{\text{interest}} S_{\text{interest}} + w_{\text{budget}} S_{\text{budget}} + w_{\text{type}} S_{\text{type}} + w_{\text{duration}} S_{\text{duration}} + w_{\text{activity}} S_{\text{activity}}$$

### Scoring Weight Ratios:
- **30% Interest Match**: Keyword vector match between user selected interests & destination traits.
- **25% Budget Compatibility**: Ratio of user budget vs destination minimum daily cost.
- **20% Travel Type Match**: Direct match for Adventure, Relaxation, Cultural, Spiritual, Nature, Romantic, etc.
- **15% Duration Match**: Ideal stay duration alignment.
- **10% Activity Match**: Available destination activity compatibility.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3 (Dark Futuristic Theme + Glassmorphism), Vanilla JavaScript (ES6 Modules)
- **Backend Layer**: Node.js + Express web server
- **Data Layer**: JSON Data Files (`destinations.json`, `hotels.json`, `activities.json`, `foods.json`, `transport.json`)
- **Storage**: Browser `localStorage` (No SQL/NoSQL database required)

---

## 📁 Project Folder Structure

```text
Trip-Planner/
│
├── server.js                      # Main Express server serving REST API & HTML SPA routes
├── package.json                   # Project setup & dependencies
├── README.md                      # Viva presentation guide & documentation
│
└── public/                        # Public assets served by Node server
    ├── index.html                 # Hero landing page & algorithm concept breakdown
    │
    ├── pages/                     # Application Sub-pages
    │   ├── ai-planner.html        # Interactive AI multi-parameter trip generator form
    │   ├── explore.html           # Destination catalog with filter pills & search
    │   ├── stay.html              # Indian city hotel explorer with AI Hotel Match %
    │   ├── my-trips.html          # Saved trip dashboard using localStorage
    │   └── trip-details.html      # Deep-dive destination breakdown page
    │
    ├── css/                       # Modular CSS Stylesheets
    │   ├── style.css              # Main theme, variables, typography & layout
    │   ├── animations.css         # Keyframes, AI scanning animation, float effects
    │   └── responsive.css         # Mobile & tablet breakpoint styles
    │
    ├── js/                        # Modular JavaScript Code
    │   ├── app.js                 # Global navigation & toast notifications
    │   ├── ai-engine.js           # Core MCDA Recommendation Scoring Engine
    │   ├── planner.js             # Planner wizard & dynamic itinerary renderer
    │   ├── explore.js             # Explore filter pills, search & sorting
    │   ├── hotels.js              # City stay explorer & AI Hotel Match calculation
    │   ├── recommendations.js     # Trip details dynamic page builder
    │   └── storage.js             # LocalStorage manager for saved trips
    │
    └── data/                      # Clean REST JSON Datasets
        ├── destinations.json      # 20+ realistic Indian travel destinations
        ├── hotels.json            # 5+ hotels per Indian city with pricing & ratings
        ├── activities.json        # Destination indexed activities
        ├── foods.json             # Regional culinary recommendations
        └── transport.json         # Inter-state & local transit pricing
```

---

## 🚀 How to Run the Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Node.js Backend Server**:
   ```bash
   node server.js
   ```

3. **Open in Browser**:
   Open `http://localhost:3000` in your web browser.
