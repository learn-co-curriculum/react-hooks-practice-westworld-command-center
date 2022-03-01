export function formatAreaName(areaName) {
    return areaName
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }