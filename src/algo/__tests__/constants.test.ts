import { describe, expect, it } from 'vitest';

import { FIZZBUZZ_RULES } from '../constants/fizzbuzz.constants';

describe('FIZZBUZZ_RULES', () => {
  it('should contain all required rules', () => {
    expect(FIZZBUZZ_RULES).toHaveLength(3);
  });

  it('should have rules in correct order (most specific first)', () => {
    expect(FIZZBUZZ_RULES[0]).toEqual({ divisor: 15, output: 'FizzBuzz' });
    expect(FIZZBUZZ_RULES[1]).toEqual({ divisor: 3, output: 'Fizz' });
    expect(FIZZBUZZ_RULES[2]).toEqual({ divisor: 5, output: 'Buzz' });
  });

  it('should be readonly', () => {
    expect(Object.isFrozen(FIZZBUZZ_RULES)).toBe(true);
  });
});
