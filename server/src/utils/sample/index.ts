// Sampling charging demand
export const sampleDemand = (
  demands: number[],
  demandProbs: number[],
): number => {
  const r = Math.random();
  let cumulative = 0;

  for (let i = 0; i < demandProbs.length; i++) {
    cumulative += demandProbs[i];

    if (r < cumulative) {
      return demands[i];
    }
  }

  // Fallback for rounding errors
  return demands[demands.length - 1];
};
