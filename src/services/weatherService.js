import weatherTips from "../data/weatherTips.json";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "";

const mockWeatherData = {
  "Jaipur": { temp: 28, humidity: 45, windSpeed: 12, rainChance: 10, condition: "Sunny & Warm", icon: "☀️", forecast: [ { day: "Mon", temp: 28 }, { day: "Tue", temp: 29 }, { day: "Wed", temp: 30 }, { day: "Thu", temp: 27 }, { day: "Fri", temp: 28 } ] },
  "Udaipur": { temp: 26, humidity: 50, windSpeed: 10, rainChance: 15, condition: "Pleasant & Breezy", icon: "🌤️", forecast: [ { day: "Mon", temp: 26 }, { day: "Tue", temp: 27 }, { day: "Wed", temp: 26 }, { day: "Thu", temp: 25 }, { day: "Fri", temp: 27 } ] },
  "Manali": { temp: 16, humidity: 65, windSpeed: 8, rainChance: 35, condition: "Cool Mountain Air", icon: "🏔️", forecast: [ { day: "Mon", temp: 16 }, { day: "Tue", temp: 15 }, { day: "Wed", temp: 14 }, { day: "Thu", temp: 16 }, { day: "Fri", temp: 17 } ] },
  "North Goa": { temp: 31, humidity: 78, windSpeed: 16, rainChance: 20, condition: "Tropical & Sunny", icon: "🏖️", forecast: [ { day: "Mon", temp: 31 }, { day: "Tue", temp: 32 }, { day: "Wed", temp: 31 }, { day: "Thu", temp: 30 }, { day: "Fri", temp: 31 } ] },
  "Goa": { temp: 31, humidity: 78, windSpeed: 16, rainChance: 20, condition: "Tropical & Sunny", icon: "🏖️", forecast: [ { day: "Mon", temp: 31 }, { day: "Tue", temp: 32 }, { day: "Wed", temp: 31 }, { day: "Thu", temp: 30 }, { day: "Fri", temp: 31 } ] },
  "Munnar": { temp: 19, humidity: 82, windSpeed: 9, rainChance: 25, condition: "Misty & Refreshing", icon: "🌫️", forecast: [ { day: "Mon", temp: 19 }, { day: "Tue", temp: 18 }, { day: "Wed", temp: 19 }, { day: "Thu", temp: 20 }, { day: "Fri", temp: 19 } ] },
  "Srinagar": { temp: 18, humidity: 55, windSpeed: 7, rainChance: 15, condition: "Crisp & Clear", icon: "🌤️", forecast: [ { day: "Mon", temp: 18 }, { day: "Tue", temp: 17 }, { day: "Wed", temp: 19 }, { day: "Thu", temp: 18 }, { day: "Fri", temp: 16 } ] },
  "Leh": { temp: 12, humidity: 30, windSpeed: 18, rainChance: 5, condition: "Sunny High Altitude", icon: "☀️", forecast: [ { day: "Mon", temp: 12 }, { day: "Tue", temp: 13 }, { day: "Wed", temp: 11 }, { day: "Thu", temp: 12 }, { day: "Fri", temp: 14 } ] },
  "Rishikesh": { temp: 25, humidity: 60, windSpeed: 11, rainChance: 15, condition: "Clear River Valley", icon: "☀️", forecast: [ { day: "Mon", temp: 25 }, { day: "Tue", temp: 26 }, { day: "Wed", temp: 24 }, { day: "Thu", temp: 25 }, { day: "Fri", temp: 27 } ] }
};

export const weatherService = {
  getWeatherByCity: async (cityName = "Jaipur") => {
    if (OPENWEATHER_API_KEY) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)},IN&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        if (res.ok) {
          const data = await res.json();
          return {
            city: data.name,
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6), // convert m/s to km/h
            rainChance: data.clouds ? data.clouds.all : 20,
            condition: data.weather[0]?.main || "Clear",
            icon: "☀️",
            forecast: [
              { day: "Mon", temp: Math.round(data.main.temp) },
              { day: "Tue", temp: Math.round(data.main.temp + 1) },
              { day: "Wed", temp: Math.round(data.main.temp - 1) },
              { day: "Thu", temp: Math.round(data.main.temp) },
              { day: "Fri", temp: Math.round(data.main.temp + 2) }
            ]
          };
        }
      } catch (err) {
        console.warn("OpenWeather API error, using fallback data", err);
      }
    }

    // Fallback data
    const matched = mockWeatherData[cityName] || {
      temp: 27,
      humidity: 55,
      windSpeed: 12,
      rainChance: 15,
      condition: "Pleasant Weather",
      icon: "🌤️",
      forecast: [ { day: "Mon", temp: 27 }, { day: "Tue", temp: 28 }, { day: "Wed", temp: 27 }, { day: "Thu", temp: 26 }, { day: "Fri", temp: 27 } ]
    };

    return { city: cityName, ...matched, tips: weatherTips };
  }
};