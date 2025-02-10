/**
 * Interface defining a FizzBuzz rule
 */
export type FizzBuzzRule = {
  readonly divisor: number;
  readonly output: string;
};

/**
 * Type for possible FizzBuzz output values
 */
export type FizzBuzzOutput = string | number;
