import { FIZZBUZZ_RULES } from '../constants/fizzbuzz.constants';
import { FizzBuzzOutput, FizzBuzzRule } from '../types/fizzbuzz.types';

/**
 * Checks if a number matches a FizzBuzz rule
 * @param num - The number to check
 * @param rule - The rule to apply
 * @returns True if the number matches the rule
 */
export const matchesRule = (num: number, rule: FizzBuzzRule): boolean =>
  num % rule.divisor === 0;

/**
 * Converts a number to its FizzBuzz representation
 * @param num - The number to convert
 * @returns The FizzBuzz representation of the number
 */
export const convertToFizzBuzz = (num: number): FizzBuzzOutput => {
  const matchedRule = FIZZBUZZ_RULES.find((rule) => matchesRule(num, rule));
  return matchedRule ? matchedRule.output : num;
};
