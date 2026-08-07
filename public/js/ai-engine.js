/**
 * AI Recommendation Engine
 * Handles weighted MCDA scoring algorithms, compatibility matching,
 * explanation rationale generation, and dynamic day-by-day itinerary generation.
 */

class AIEngine {
  constructor() {
    // Recommendation Scoring Weights (Total = 1.0)
    this.weights = {
      interestMatch: 0.30,   // 30% Weight
      budgetCompat: 0.25,    // 25% Weight
      travelTypeMatch: 0.20, // 20% Weight
      durationCompat: 0.15,  // 15% Weight
      activityMatch: 0.10    // 10% Weight
    };
  }

  /**
   * Calculates overall AI Recommendation Score for a destination based on user preferences.
   * @param {Object} userPref - User inputs (budget, days, travelers, travelType, interests, etc.)
   * @param {Object} destination - Destination object from destinations.json
   * @returns {Object} { finalScore, matchPercentage, breakdown, explanation }
   */
  calculateDestinationScore(userPref, destination) {
    const userBudget = parseFloat(userPref.budget) || 25000;
    const userDays = parseInt(userPref.days) || 5;
    const userTravelers = parseInt(userPref.travelers) || 2;
    const userTravelType = userPref.travelType || 'Adventure';
    const userInterests = Array.isArray(userPref.interests) ? userPref.interests : (userPref.interests ? [userPref.interests] : []);

    // 1. Interest Match Score (30%)
    let interestScore = 0;
    if (userInterests.length > 0 && destination.interests) {
      const matchCount = userInterests.filter(interest => 
        destination.interests.some(destInt => destInt.toLowerCase() === interest.toLowerCase())
      ).length;
      interestScore = Math.min(100, (matchCount / userInterests.length) * 100);
      if (matchCount > 0 && interestScore < 50) interestScore = 60; // Base boost for partial match
    } else {
      interestScore = 70; // Default fallback score
    }

    // 2. Budget Compatibility Score (25%)
    // Estimated minimum cost for entire group = avgBudgetPerDay * userDays * userTravelers
    const estTripCost = destination.avgBudgetPerDay * userDays * userTravelers;
    let budgetScore = 0;
    
    if (userBudget >= estTripCost) {
      // Comfortably within budget
      const savingsRatio = (userBudget - estTripCost) / userBudget;
      budgetScore = 100 - (savingsRatio * 20); // 80 - 100 range
    } else {
      // Over budget penalty
      const ratio = userBudget / estTripCost;
      budgetScore = Math.max(20, ratio * 100);
    }

    // 3. Travel Type Match Score (20%)
    let travelTypeScore = 50;
    if (destination.travelTypes && destination.travelTypes.some(t => t.toLowerCase() === userTravelType.toLowerCase())) {
      travelTypeScore = 100;
    } else {
      travelTypeScore = 40;
    }

    // 4. Duration Compatibility Score (15%)
    let durationScore = 70;
    if (destination.idealDays && destination.idealDays.includes(userDays)) {
      durationScore = 100;
    } else if (destination.idealDays) {
      const minIdeal = Math.min(...destination.idealDays);
      const maxIdeal = Math.max(...destination.idealDays);
      if (userDays >= minIdeal && userDays <= maxIdeal) {
        durationScore = 90;
      } else {
        durationScore = 60;
      }
    }

    // 5. Activity Match Score (10%)
    const activityScore = interestScore * 0.9; // Tied closely to interest affinity

    // Weighted Final Composite Score Calculation
    const compositeScore = (
      (interestScore * this.weights.interestMatch) +
      (budgetScore * this.weights.budgetCompat) +
      (travelTypeScore * this.weights.travelTypeMatch) +
      (durationScore * this.weights.durationCompat) +
      (activityScore * this.weights.activityMatch)
    );

    const matchPercentage = Math.round(Math.min(99, Math.max(50, compositeScore)));

    // Generate Dynamic Explanation Text
    const explanation = this.generateExplanation(destination, matchPercentage, userTravelType, userBudget, estTripCost, userInterests);

    return {
      destination,
      finalScore: compositeScore,
      matchPercentage,
      estTripCost,
      breakdown: {
        interestScore: Math.round(interestScore),
        budgetScore: Math.round(budgetScore),
        travelTypeScore: Math.round(travelTypeScore),
        durationScore: Math.round(durationScore)
      },
      explanation
    };
  }

  /**
   * Generates dynamic plain-language reasoning for professor/user presentation.
   */
  generateExplanation(dest, matchPct, travelType, userBudget, estCost, userInterests) {
    const reasons = [];
    
    if (userInterests.length > 0) {
      reasons.push(`matches your preferences for ${userInterests.slice(0, 2).join(' & ')}`);
    }

    if (userBudget >= estCost) {
      reasons.push(`fits comfortably within your ₹${userBudget.toLocaleString('en-IN')} budget`);
    } else {
      reasons.push(`provides great value for a ${travelType.toLowerCase()} trip`);
    }

    reasons.push(`is ideal for a ${dest.travelTypes ? dest.travelTypes[0] : travelType} experience`);

    return `AI recommended ${dest.name} (${matchPct}% Match) because it ${reasons.join(', ')}.`;
  }

  /**
   * Calculates AI Suitability Score for a hotel based on budget tier & user travel style.
   */
  calculateHotelScore(userBudgetPerNight, userCategory, hotel) {
    let score = 80;
    
    // Price match
    if (hotel.pricePerNight <= userBudgetPerNight) {
      score += 15;
    } else if (hotel.pricePerNight <= userBudgetPerNight * 1.25) {
      score += 5;
    } else {
      score -= 20;
    }

    // Category match
    if (userCategory && hotel.category.toLowerCase().includes(userCategory.toLowerCase())) {
      score += 10;
    }

    // Rating boost
    score += (hotel.rating - 4.0) * 10;

    return Math.min(98, Math.max(65, Math.round(score)));
  }

  /**
   * Dynamically constructs a multi-day itinerary based on inputs.
   */
  generateDynamicItinerary(destination, days, travelType, activitiesData, foodsData) {
    const numDays = parseInt(days) || 3;
    const destKey = destination.id.toLowerCase();
    const destActivities = activitiesData[destKey] || [];
    const destFoods = foodsData[destKey] || [];

    const itinerary = [];

    for (let d = 1; d <= numDays; d++) {
      const morningAct = destActivities[(d - 1) % (destActivities.length || 1)] || {
        name: `Morning Exploration & Heritage Walk in ${destination.name}`,
        category: 'Sightseeing'
      };

      const afternoonAct = destActivities[(d) % (destActivities.length || 1)] || {
        name: `Local Sightseeing & Cultural Center Tour`,
        category: 'Culture'
      };

      const eveningFood = destFoods[(d - 1) % (destFoods.length || 1)] || {
        name: `Traditional Regional Dining Experience`,
        recommendedSpot: `Famous Local Restaurant`
      };

      itinerary.push({
        day: d,
        title: `Day ${d}: ${destination.name} ${morningAct.category || 'Highlights'}`,
        morning: `Morning (9:00 AM - 1:00 PM): ${morningAct.name}. Enjoy guided tour and photo ops.`,
        afternoon: `Afternoon (2:00 PM - 5:30 PM): ${afternoonAct.name}. Explore local crafts and surrounding attractions.`,
        evening: `Evening (6:30 PM - 9:30 PM): Dinner at ${eveningFood.recommendedSpot} featuring ${eveningFood.name}.`,
        stay: `Recommended 4-star boutique stay in central ${destination.name}`
      });
    }

    return itinerary;
  }
}

// Export singleton instance
window.aiEngine = new AIEngine();
