import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let starName: "star" | "star-border" | "star-half" = "star-border"; // Prazna zvezdica kao podrazumevana
    if (i <= rating) {
      starName = "star"; // Puna zvezdica
    } else if (i - 1 < rating && rating < i) {
      starName = "star-half"; // Pola zvezdice
    }
    stars.push(
      <MaterialIcons name={starName} size={20} color="#ffd700" key={i} />
    );
  }
  return <View className="flex-row mr-2">{stars}</View>;
};

export default StarRating;
