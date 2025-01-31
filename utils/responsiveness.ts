import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const getScreenPercent = (
  number: number,
  dimension: "height" | "width" = "width"
): number => {
  let max = width;
  if (dimension === "height") max = height;
  return dimension === "height" ? (number * max) / 844 : (number * max) / 390;
};

export const getScreenHeight = (number: number) => {
  return getScreenPercent(number, "height");
};

export const getScreenWidth = (number: number) => {
  return getScreenPercent(number, "width");
};
