import { GoogleGenerativeAI } from "@google/generative-ai";
import hotelsData from "../data/hotels.json";
import touristPlacesData from "../data/touristPlaces.json";
import restaurantsData from "../data/restaurants.json";

// Read API key from environment variable if available
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

let genAI = null;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

/**
 * Intelligent Mock AI Generator for Indian Destinations
 * Works 100% out-of-the-box if no API key is set or if API call fails/times out.
 */
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

  // Calculate days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const daysCount = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);

  // Filter recommended hotels & places
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
      // Simulate realistic AI generation loading delay
      await new Promise(resolve => setTimeout(resolve, 1800));
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
      // Clean JSON formatting
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
      console.warn("Gemini API error or missing response. Falling back to intelligent engine.", err);
      return generateMockItinerary(params);
    }
  },

  chatWithAI: async (message, history = []) => {
    if (!genAI) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const msg = message.toLowerCase();
      if (msg.includes("goa") || msg.includes("beach")) {
        return "For Goa, the best time to visit is November to February. Top spots include Baga, Palolem, Fort Aguada, and Dudhsagar Falls. Don't miss authentic Goan Fish Curry at Thalassa!";
      } else if (msg.includes("rajasthan") || msg.includes("jaipur") || msg.includes("udaipur")) {
        return "Rajasthan is royal! Visit Jaipur's Amber Fort, Udaipur's Lake Pichola boat ride, and Jaisalmer's Sam Sand Dunes. Enjoy Dal Baati Churma at Chokhi Dhani!";
      } else if (msg.includes("budget") || msg.includes("cheap")) {
        return "For budget travel in India, consider destinations like Rishikesh, Varanasi, Kasol, or Gokarna where stay options start from ₹800/night and street food is incredible!";
      } else if (msg.includes("kashmir") || msg.includes("snow")) {
        return "Kashmir is paradise! Take a Shikara ride on Dal Lake in Srinagar, try snow skiing in Gulmarg, and walk through Betaab Valley in Pahalgam!";
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
      console.warn("Gemini Chat error", err);
      return "Namaste! I am currently assisting with Indian travel destinations. Try asking about hotels in Jaipur, houseboats in Kerala, or snow spots in Kashmir!";
    }
  }
};
