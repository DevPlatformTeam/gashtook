export type SubCategories = {
  subCategory:
  | {
    sight: [
      "all" | "religious" | "rural" | "nature" | "museum" | "historical",
    ];
  }
  | {
    buy: [
      "all" | "bookstore" | "hypermarket" | "market" | "commercialCenter",
    ];
  }
  | {
    eat: ["all" | "cafe" | "fastFood" | "restaurant"];
  }
  | {
    hotel: ["all" | "hotel" | "guestHouse" | "apartmentHotel"];
  }
  | {
    fun: [
      | "all"
      | "sportsComplex"
      | "entertainmentAndGames"
      | "waterActivities"
      | "cinema"
      | "park"
      | "amusementPark"
      | "swimming"
      | "sportsHall",
    ];
  }
  | {
    healthcare: ["all" | "hospital" | "clinic" | "hospital"]
  };
};
