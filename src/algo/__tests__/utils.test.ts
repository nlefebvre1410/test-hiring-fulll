import { describe, expect, it } from 'vitest';

import { FizzBuzzRule } from '../types/fizzbuzz.types.js';
import { convertToFizzBuzz, matchesRule } from '../utils/fizzbuzz.utils';

describe('matchesRule', () => {
  it('should return true when number is divisible by rule divisor', () => {
    const rule: FizzBuzzRule = { divisor: 3, output: 'Fizz' };
    expect(matchesRule(3, rule)).toBe(true);
    expect(matchesRule(6, rule)).toBe(true);
    expect(matchesRule(9, rule)).toBe(true);
  });

  it('should return false when number is not divisible by rule divisor', () => {
    const rule: FizzBuzzRule = { divisor: 3, output: 'Fizz' };
    expect(matchesRule(1, rule)).toBe(false);
    expect(matchesRule(2, rule)).toBe(false);
    expect(matchesRule(4, rule)).toBe(false);
  });
});

describe('convertToFizzBuzz', () => {
  it('should return "Fizz" for multiples of 3', () => {
    expect(convertToFizzBuzz(3)).toBe('Fizz');
    expect(convertToFizzBuzz(6)).toBe('Fizz');
    expect(convertToFizzBuzz(9)).toBe('Fizz');
  });

  it('should return "Buzz" for multiples of 5', () => {
    expect(convertToFizzBuzz(5)).toBe('Buzz');
    expect(convertToFizzBuzz(10)).toBe('Buzz');
    expect(convertToFizzBuzz(20)).toBe('Buzz');
  });

  it('should return "FizzBuzz" for multiples of both 3 and 5', () => {
    expect(convertToFizzBuzz(15)).toBe('FizzBuzz');
    expect(convertToFizzBuzz(30)).toBe('FizzBuzz');
    expect(convertToFizzBuzz(45)).toBe('FizzBuzz');
  });

  it('should return the number itself when no rules match', () => {
    expect(convertToFizzBuzz(1)).toBe(1);
    expect(convertToFizzBuzz(2)).toBe(2);
    expect(convertToFizzBuzz(4)).toBe(4);
  });
});
