export const sampleDemand = (demands: number[], demandProbs: number[]) => {
  const rand = Math.random();
  for (let i = 0; i < demandProbs.length; i++) {
    if (rand < demandProbs[i]) {
      return demands[i];
    }
  }
  // Fallback for rounding errors
  return demands[demands.length - 1];
};
