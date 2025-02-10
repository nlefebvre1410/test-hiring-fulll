import { FizzBuzzRule } from '../types/fizzbuzz.types';

/**
 * FizzBuzz rules configuration.
 * Easily extensible to add new rules.
 * Order matters: more specific rules (like 15) should come before more general ones (like 3 or 5)
 */
export const FIZZBUZZ_RULES = Object.freeze([
  { divisor: 15, output: 'FizzBuzz' },
  { divisor: 3, output: 'Fizz' },
  { divisor: 5, output: 'Buzz' },
]) as readonly FizzBuzzRule[];
