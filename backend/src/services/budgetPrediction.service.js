export const predictWeddingBudget = ({ guests, city, luxuryLevel }) => {
  const baseCostPerGuest = luxuryLevel === "premium" ? 2500 : 1500;

  const cityMultiplier =
    city === "Bangalore" || city === "Mumbai" ? 1.3 : 1;

  const estimatedBudget = guests * baseCostPerGuest * cityMultiplier;

  return {
    guests,
    city,
    luxuryLevel,
    estimatedBudget: Math.round(estimatedBudget),
  };
};
