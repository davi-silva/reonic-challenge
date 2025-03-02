import { afterEach, describe, expect, it, vi } from 'vitest';

import { sampleDemand } from '../../utils/sample';

const mockMathRandom = (value: number) => {
  vi.spyOn(Math, 'random').mockReturnValue(value);
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Utils', () => {
  const demands = [0, 5, 10, 20, 30, 50, 100, 200, 300];
  const demandProbs = [
    0.3431, 0.3921, 0.4901, 0.6077, 0.6959, 0.8135, 0.9213, 0.9703, 1.0,
  ];

  it('returns the first demand when rand is below the first probability', () => {
    mockMathRandom(0.3);
    const result = sampleDemand(demands, demandProbs);
    expect(result).toBe(0);
  });

  it('returns a middle demand when rand falls between probabilities', () => {
    mockMathRandom(0.5);
    const result = sampleDemand(demands, demandProbs);
    expect(result).toBe(20);
  });

  it('returns the last demand when rand is just below 1', () => {
    mockMathRandom(0.99);
    const result = sampleDemand(demands, demandProbs);
    expect(result).toBe(300);
  });

  it('returns the last demand when rand is exactly 1 (fallback)', () => {
    mockMathRandom(1.0);
    const result = sampleDemand(demands, demandProbs);
    expect(result).toBe(300);
  });

  it('returns the last demand when rand is slightly above last probability due to rounding', () => {
    mockMathRandom(0.9999999999999999);
    const result = sampleDemand(demands, demandProbs);
    expect(result).toBe(300);
  });

  it('works with a minimal valid input', () => {
    mockMathRandom(0.7);
    const minimalDemands = [10];
    const minimalProbs = [1.0];
    const result = sampleDemand(minimalDemands, minimalProbs);
    expect(result).toBe(10);
  });
});
