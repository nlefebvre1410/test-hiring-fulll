import { describe, expect, it, vi } from 'vitest';

import {
  displayFizzBuzz,
  generateFizzBuzz,
} from '../services/fizzbuzz.service';

describe('generateFizzBuzz', () => {
  it('should generate correct sequence for first 15 numbers', () => {
    const result = generateFizzBuzz(15);
    const expected = [
      1,
      2,
      'Fizz',
      4,
      'Buzz',
      'Fizz',
      7,
      8,
      'Fizz',
      'Buzz',
      11,
      'Fizz',
      13,
      14,
      'FizzBuzz',
    ];
    expect(result).toEqual(expected);
  });

  it('should throw error for negative numbers', () => {
    expect(() => generateFizzBuzz(-1)).toThrow('N must be a positive integer');
  });

  it('should throw error for zero', () => {
    expect(() => generateFizzBuzz(0)).toThrow('N must be a positive integer');
  });

  it('should throw error for non-integer numbers', () => {
    expect(() => generateFizzBuzz(3.5)).toThrow('N must be a positive integer');
  });
});

describe('displayFizzBuzz', () => {
  it('should correctly log the FizzBuzz sequence', () => {
    // Mock console.log
    const consoleSpy = vi.spyOn(console, 'log');

    displayFizzBuzz(5);

    expect(consoleSpy).toHaveBeenCalledTimes(5);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, '1: 1');
    expect(consoleSpy).toHaveBeenNthCalledWith(2, '2: 2');
    expect(consoleSpy).toHaveBeenNthCalledWith(3, '3: Fizz');
    expect(consoleSpy).toHaveBeenNthCalledWith(4, '4: 4');
    expect(consoleSpy).toHaveBeenNthCalledWith(5, '5: Buzz');

    consoleSpy.mockRestore();
  });

  it('should handle errors gracefully', () => {
    // Mock console.error
    const consoleSpy = vi.spyOn(console, 'error');

    displayFizzBuzz(-1);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error:',
      'N must be a positive integer'
    );

    consoleSpy.mockRestore();
  });
});
