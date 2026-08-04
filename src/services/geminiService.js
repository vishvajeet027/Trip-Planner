import { GoogleGenerativeAI } from "@google/generative-ai";
import hotelsData from "../data/hotels.json";
import touristPlacesData from "../data/touristPlaces.json";
import restaurantsData from "../data/restaurants.json";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

let genAI = null;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

// Mock database for mood & hidden gems fallback
const MOOD_DESTINATIONS = {
  Relaxed: [
    { name: "Munnar", state: "Kerala", tag: "Tea Gardens & Misty Valleys", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80", desc: "Soothing greenery, quiet hill resorts, and refreshing spice plantations." },
    { name: "Alleppey", state: "Kerala", tag: "Backwater Houseboats", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80", desc: "Serene lagoon cruises with luxury meals prepared fresh on traditional houseboats." }
  ],
  Adventure: [
    { name: "Rishikesh", state: "Uttarakhand", tag: "White Water Rafting & Bungee", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80", desc: "Thrill-seeker capital on the Ganges, zip-lining across valleys, and cliff jumping." },
    { name: "Leh Ladakh", state: "Ladakh", tag: "High-Altitude Passes & Lakes", image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80", desc: "Dramatic mountain passes, Pangong Tso lake, and rugged off-road bike expeditions." }
  ],
  Spiritual: [
    { name: "Varanasi", state: "Uttar Pradesh", tag: "Ganga Aarti & Ancient Ghats", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80", desc: "World's oldest living city, mesmerizing morning boat rides, and evening light ceremonies." },
    { name: "Amritsar", state: "Punjab", tag: "Golden Temple & Langar Service", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80", desc: "Divine serenity at Harmandir Sahib, soulful holy music, and warm hospitality." }
  ],
  Heritage: [
    { name: "Jaipur", state: "Rajasthan", tag: "Forts, Palaces & Craft Bazaars", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80", desc: "Royal palaces, Sheesh Mahal, royal dining experiences, and rich handicraft heritage." },
    { name: "Hampi", state: "Karnataka", tag: "Vijayanagara Ruins & Boulder Hills", image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80", desc: "UNESCO World Heritage ancient stone temples, riverside sunsets, and stone chariots." }
  ],
  Romantic: [
    { name: "Udaipur", state: "Rajasthan", tag: "City of Lakes & Floating Palaces", image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f1c?auto=format&fit=crop&w=800&q=80", desc: "Sunset lake boat rides, candlelit rooftop dinners, and luxury heritage hotels." },
    { name: "Srinagar", state: "Jammu & Kashmir", tag: "Dal Lake Shikara & Tulip Gardens", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80", desc: "Romantic Shikara rides, snow peaks, and lotus blooms on Dal Lake." }
  ],
  Party: [
    { name: "North Goa", state: "Goa", tag: "Beach Clubs & Night Markets", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", desc: "Sun-drenched beach shacks, live DJs, sunset parties, and vibrant night markets." }
  ]
};

const HIDDEN_GEMS = [
  {
    name: "Ziro Valley",
    state: "Arunachal Pradesh",
    category: "Eco & Cultural",
    crowdLevel: "Low",
    bestSeason: "Sept - April",
    description: "Pine-clad hills and Apatani tribal culture known for organic farming and Ziro Music Festival.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Gokarna",
    state: "Karnataka",
    category: "Beach & Peace",
    crowdLevel: "Moderate",
    bestSeason: "Oct - March",
    description: "Serene alternative to Goa with Om Beach, Kudle Beach trekking trails, and tranquil vibes.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    category: "High Altitude Desert",
    crowdLevel: "Low",
    bestSeason: "May - Oct",
    description: "Key Monastery, Chandratal Lake, and world's highest post office in Hikkim.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Chettinad",
    state: "Tamil Nadu",
    category: "Heritage Palaces & Cuisine",
    crowdLevel: "Low",
    bestSeason: "Nov - Feb",
    description: "70+ grand heritage mansions with Italian marble tiles and legendary spicy Chettinad feasts.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
  }
];

const generateMockItinerary = (params) => {
  const {
    startCity = "Delhi",
    destination = "Jaipur",
    startDate = "2026-09-01",
    endDate = "2026-09-04",
    budget = "Medium",
    travelers = 2,
    hotelType = "Luxury",
    travelStyle = "Culture & Heritage"
  } = params;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const daysCount = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);

  const cityHotels = hotelsData.filter(
    h => h.city.toLowerCase().includes(destination.toLowerCase()) || h.state.toLowerCase().includes(destination.toLowerCase())
  );
  const recHotels = cityHotels.length > 0 ? cityHotels : hotelsData.slice(0, 2);

  const cityPlaces = touristPlacesData.filter(
    p => p.cityName.toLowerCase().includes(destination.toLowerCase())
  );
  const recPlaces = cityPlaces.length > 0 ? cityPlaces : touristPlacesData.slice(0, 4);

  const cityRestaurants = restaurantsData.filter(
    r => r.cityName.toLowerCase().includes(destination.toLowerCase())
  );
  const recRestaurants = cityRestaurants.length > 0 ? cityRestaurants : restaurantsData.slice(0, 2);

  const dayWise = [];
  for (let i = 1; i <= daysCount; i++) {
    let dayTheme = i === 1 ? `Arrival in ${destination} & Heritage Orientation` :
                   i === daysCount ? `Shopping, Local Markets & Farewell` :
                   `Deep Exploration & Cultural Highlights of ${destination}`;

    const place1 = recPlaces[(i * 2 - 2) % recPlaces.length] || recPlaces[0];
    const place2 = recPlaces[(i * 2 - 1) % recPlaces.length] || recPlaces[1];
    const restaurant = recRestaurants[(i - 1) % recRestaurants.length] || recRestaurants[0];

    dayWise.push({
      day: i,
      title: `Day ${i}: ${dayTheme}`,
      morning: `Start at 09:00 AM after breakfast. Visit ${place1.name}. ${place1.description.slice(0, 100)}...`,
      afternoon: `Enjoy an authentic lunch at ${restaurant.name} (${restaurant.cuisine}). Post lunch, explore local handicraft bazaars and cultural sights.`,
      evening: `Visit ${place2.name} for sunset photography. Experience evening lights, folk music, and local snacks.`,
      recommendedHotel: recHotels[(i - 1) % recHotels.length]?.name || "Luxury Heritage Stay",
      estimatedExpense: budget === "Budget" ? 2500 : budget === "Luxury" ? 8500 : 4500
    });
  }

  const perPersonDaily = budget === "Budget" ? 2200 : budget === "Luxury" ? 9500 : 4800;
  const totalExpense = perPersonDaily * daysCount * travelers;

  return {
    id: "ai_trip_" + Date.now(),
    title: `${destination} ${travelStyle} Getaway`,
    startCity,
    destination,
    startDate,
    endDate,
    daysCount,
    budget,
    travelers,
    hotelType,
    travelStyle,
    isAIGenerated: true,
    createdWithGemini: !!genAI,
    dayWiseItinerary: dayWise,
    recommendedHotels: recHotels.map(h => ({ name: h.name, category: h.category, price: h.pricePerNight, image: h.image })),
    touristAttractions: recPlaces.map(p => p.name),
    recommendedRestaurants: recRestaurants.map(r => `${r.name} (${r.cuisine})`),
    estimatedExpenses: {
      total: totalExpense,
      currency: "INR",
      perPerson: Math.round(totalExpense / travelers),
      breakdown: {
        accommodation: Math.round(totalExpense * 0.45),
        transportation: Math.round(totalExpense * 0.25),
        foodAndDining: Math.round(totalExpense * 0.20),
        sightseeingAndActivities: Math.round(totalExpense * 0.10)
      }
    },
    packingList: [
      "Comfortable walking shoes / sandals",
      "Cotton clothing & light scarf for temple visits",
      "Sunscreen SPF 50+, sunglasses & sun hat",
      "Camera & power bank (10,000 mAh)",
      "Essential personal medication & hydration pack",
      "Reusable water bottle & hand sanitizer"
    ],
    travelTips: [
      `Best time to visit ${destination} is during winter & pleasant morning hours.`,
      "Respect local customs and dress modestly when entering sacred temples or gurdwaras.",
      "Keep digital copies of photo IDs (Aadhaar / Passport) on your phone.",
      "Negotiate politely with auto-rickshaw drivers or use app-based rides."
    ],
    weatherAdvice: `Expect pleasant temperatures around 24°C - 30°C in ${destination}. Clear skies with low humidity.`
  };
};

export const geminiService = {
  generateTripItinerary: async (params) => {
    if (!genAI) {
      await new Promise(resolve => setTimeout(resolve, 1400));
      return generateMockItinerary(params);
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are TravelAI India, a luxury travel expert. Create a complete, detailed JSON trip plan ONLY for Indian travel.
Params:
- Starting City: ${params.startCity}
- Destination City: ${params.destination}
- Dates: ${params.startDate} to ${params.endDate}
- Budget Level: ${params.budget}
- Travelers: ${params.travelers}
- Hotel Type: ${params.hotelType}
- Travel Style: ${params.travelStyle}

Return ONLY valid JSON matching this schema:
{
  "title": "string",
  "dayWiseItinerary": [
    {
      "day": 1,
      "title": "string",
      "morning": "string",
      "afternoon": "string",
      "evening": "string",
      "recommendedHotel": "string",
      "estimatedExpense": 4500
    }
  ],
  "recommendedHotels": [{"name": "string", "category": "string", "price": 5000}],
  "touristAttractions": ["string"],
  "recommendedRestaurants": ["string"],
  "estimatedExpenses": {
    "total": 25000,
    "perPerson": 12500,
    "breakdown": {"accommodation": 10000, "transportation": 6000, "foodAndDining": 5000, "sightseeingAndActivities": 4000}
  },
  "packingList": ["string"],
  "travelTips": ["string"],
  "weatherAdvice": "string"
}`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const cleanJsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedData = JSON.parse(cleanJsonStr);

      return {
        id: "ai_trip_" + Date.now(),
        startCity: params.startCity,
        destination: params.destination,
        startDate: params.startDate,
        endDate: params.endDate,
        daysCount: parsedData.dayWiseItinerary ? parsedData.dayWiseItinerary.length : 3,
        budget: params.budget,
        travelers: params.travelers,
        hotelType: params.hotelType,
        travelStyle: params.travelStyle,
        isAIGenerated: true,
        createdWithGemini: true,
        ...parsedData
      };
    } catch (err) {
      console.warn("Gemini API fallback triggered.", err);
      return generateMockItinerary(params);
    }
  },

  chatWithAI: async (message) => {
    if (!genAI) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const msg = message.toLowerCase();
      if (msg.includes("goa") || msg.includes("beach")) {
        return "For Goa, the best time to visit is November to February. Top spots include Baga, Palolem, Fort Aguada, and Dudhsagar Falls. Don't miss authentic Goan Fish Curry at Thalassa!";
      } else if (msg.includes("rajasthan") || msg.includes("jaipur") || msg.includes("udaipur")) {
        return "Rajasthan is royal! Visit Jaipur's Amber Fort, Udaipur's Lake Pichola boat ride, and Jaisalmer's Sam Sand Dunes. Enjoy Dal Baati Churma at Chokhi Dhani!";
      } else if (msg.includes("budget") || msg.includes("cheap")) {
        return "For budget travel in India, consider destinations like Rishikesh, Varanasi, Kasol, or Gokarna where stay options start from ₹800/night and street food is incredible!";
      } else {
        return `Namaste! As TravelAI India's assistant, I recommend exploring Jaipur for heritage, Goa for beaches, Munnar for tea gardens, or Kashmir for snow! What region interests you most?`;
      }
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are TravelAI India, a friendly and knowledgeable AI travel assistant specializing strictly in Indian tourism, destinations, hotels, food, culture, and travel planning.
Keep your response concise, polite, helpful, and beautifully formatted in markdown.

User Question: ${message}`;
      const response = await model.generateContent(prompt);
      return response.response.text();
    } catch (err) {
      return "Namaste! I am currently assisting with Indian travel destinations. Ask me about hotels in Jaipur, houseboats in Kerala, or snow spots in Kashmir!";
    }
  },

  recognizeLandmark: async (landmarkName = "Amber Fort") => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const match = touristPlacesData.find(p => p.name.toLowerCase().includes(landmarkName.toLowerCase())) || touristPlacesData[0];
    return {
      landmarkName: match.name,
      location: match.cityName,
      category: match.category,
      entryFee: match.entryFee,
      timings: match.timings,
      rating: match.rating,
      image: match.image,
      historicalContext: match.description,
      bestPhotoTime: "07:30 AM - 09:30 AM (Golden hour lighting)",
      localTips: [
        "Hire an official ASI certified tour guide near ticket counter.",
        "Wear comfortable shoes as walking uphill or cobblestones is required.",
        "Visit light & sound show in the evening for storytelling experience."
      ]
    };
  },

  getDestinationsByMood: (mood = "Relaxed") => {
    return MOOD_DESTINATIONS[mood] || MOOD_DESTINATIONS.Relaxed;
  },

  getHiddenGems: () => {
    return HIDDEN_GEMS;
  },

  getPersonalizedRecommendations: (savedTrips = []) => {
    if (!savedTrips || savedTrips.length === 0) {
      return {
        matchedProfile: "First Time Explorer",
        recommendedDestinations: [
          { name: "Jaipur", reason: "Ideal starter destination for culture, palatial luxury & shopping", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80" },
          { name: "Goa", reason: "Top pick for beaches, watersports & relaxed coastal vibes", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80" }
        ],
        insiderTip: "Save your first trip to get AI hyper-personalized recommendations tailored to your style!"
      };
    }

    const destinations = savedTrips.map(t => t.destination || "").join(" ").toLowerCase();
    
    if (destinations.includes("jaipur") || destinations.includes("udaipur") || destinations.includes("rajasthan")) {
      return {
        matchedProfile: "Royal Heritage & Architecture Connoisseur",
        recommendedDestinations: [
          { name: "Jodhpur (Blue City)", reason: "Since you loved royal palaces, Mehrangarh Fort & Umaid Bhawan await!", image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80" },
          { name: "Gwalior & Orchha", reason: "Unexplored ancient forts and chhatris with royal grandeur.", image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80" }
        ],
        insiderTip: "You prefer heritage stays! Try staying at heritage Haveli boutique hotels in Jodhpur."
      };
    } else if (destinations.includes("goa") || destinations.includes("kerala") || destinations.includes("beach")) {
      return {
        matchedProfile: "Coastal & Tropical Vacationer",
        recommendedDestinations: [
          { name: "Andaman & Nicobar", reason: "Crystal clear turquoise waters, Radhanagar beach & scuba diving.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
          { name: "Varkala & Marari", reason: "Clifftop ocean views and pristine quiet beaches.", image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80" }
        ],
        insiderTip: "Since you prefer coastal trips, book between Oct and Feb for pleasant breeze."
      };
    }

    return {
      matchedProfile: "Diverse Explorer",
      recommendedDestinations: [
        { name: "Kashmir Valley", reason: "Snow peaks, flower meadows and serene houseboats on Dal Lake.", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80" },
        { name: "Munnar & Thekkady", reason: "Misty tea hills paired with wildlife safari experiences.", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80" }
      ],
      insiderTip: "Your trip history shows high versatility. Consider mountain retreats next!"
    };
  }
};
