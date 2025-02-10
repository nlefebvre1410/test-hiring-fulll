import { FizzBuzzOutput } from '../types/fizzbuzz.types';
import { convertToFizzBuzz } from '../utils/fizzbuzz.utils';

/**
 * Generates a FizzBuzz sequence up to N
 * @param n - The upper limit of the sequence
 * @returns An array containing the FizzBuzz sequence
 * @throws {Error} If N is not a positive integer
 */
export const generateFizzBuzz = (n: number): readonly FizzBuzzOutput[] => {
  if (!Number.isInteger(n) || n <= 0) {
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error('N must be a positive integer');
  }

  return Array.from(
    { length: n },
    (_, index): FizzBuzzOutput => convertToFizzBuzz(index + 1)
  );
};

/**
 * Displays the FizzBuzz sequence
 * @param n - The upper limit of the sequence
 */
// eslint-disable-next-line functional/no-return-void
export const displayFizzBuzz = (n: number): void => {
  try {
    const sequence = generateFizzBuzz(n);
    sequence.forEach((value, index) => {
      console.log(`${index + 1}: ${value}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('An unexpected error occurred');
    }
  }
};
