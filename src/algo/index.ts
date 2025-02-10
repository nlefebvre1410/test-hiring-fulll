/**
 * Main entry point for the FizzBuzz application
 * Exports all types, constants, utilities, and services
 */
export * from './types/fizzbuzz.types';
export * from './constants/fizzbuzz.constants';
export * from './utils/fizzbuzz.utils';
export * from './services/fizzbuzz.service';

// Example usage
import { displayFizzBuzz } from './services/fizzbuzz.service';

displayFizzBuzz(100);
