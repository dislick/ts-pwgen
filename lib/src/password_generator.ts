/// <reference path="../../typings/index.d.ts" />

import 'colors';
import { PasswordGeneratorOptions, GeneratedPassword } from './password_generator.interface';
import {
  latin1List,
  lowercaseLettersList,
  numbersList,
  specialCharactersList,
  uppercaseLettersList
} from './charsets';

const defaultOptions: PasswordGeneratorOptions = {
  lowercaseLetters: true,
  uppercaseLetters: true,
  numbers: true,
  specialCharacters: true,
  latin1Characters: false,
  parts: {
    amount: 1,
    length: 30,
    delimiter: '-'
  }
}

export class PasswordGenerator {
  constructor(public options: PasswordGeneratorOptions = defaultOptions) {
  }

  /**
   * Checks if a password string contains at least one character from a string
   * array.
   */
  private containsFromCharset(password: string, charset: string[]): boolean {
    for (let char of charset) {
      if (password.indexOf(char) !== -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * Generates a password based on this.options. This method will recursively
   * call itself if the password does not contain at least one character from
   * each specified charset.
   */
  generate(): GeneratedPassword {
    let list: string[] = [];
    let password: string = '';    

    if (this.options.lowercaseLetters) {
      list = list.concat(lowercaseLettersList);
    }
    if (this.options.uppercaseLetters) {
      list = list.concat(uppercaseLettersList);
    }
    if (this.options.numbers) {
      list = list.concat(numbersList);
    }
    if (this.options.specialCharacters) {
      list = list.concat(specialCharactersList);
    }
    if (this.options.latin1Characters) {
      list = list.concat(latin1List);
    }

    if (this.options.parts.length <= 0) {
      return {
        value: '',
        charsetLength: list.length
      }
    }

    let { amount, length, delimiter } = this.options.parts;
    for (let partIndex = 0; partIndex < amount; partIndex++) {
      let part = '';

      while (part.length < length) {
        let randomIndex = Math.floor(Math.random() * list.length);
        part += list[randomIndex];
      }

      // If this is not the last part, add the delimiter.
      if (partIndex !== amount - 1) {
        part += delimiter;
      }

      password += part;
    }

    // Make sure that at least one character from each used charset is present,
    // otherwise call this method again.
    if (
      (this.options.lowercaseLetters && !/[a-z]/.test(password))
      || (this.options.uppercaseLetters && !/[A-Z]/.test(password))
      || (this.options.numbers && !/[0-9]/.test(password))
      || (this.options.specialCharacters && !this.containsFromCharset(password, specialCharactersList))
      || (this.options.latin1Characters && !this.containsFromCharset(password, latin1List))
    ) {
      return this.generate();
    }

    return {
      value: password,
      charsetLength: list.length
    }
  }

  /**
   * Generates any positive amount of passwords using this.generate().
   */
  generateMultiple(amount: number, verbose: boolean = false): string[] {
    let passwords: GeneratedPassword[] = [];

    for (let i = 0; i < amount; i++) {
      passwords.push(this.generate());
    }

    if (verbose) {
      this.logInformation(passwords[0].value, passwords[0].charsetLength);
    }

    return passwords.map(pw => pw.value);
  }

  /**
   * Log information about the security of the current password options.
   */
  private logInformation(password: string, charsetLength: number): void {
    const round = (input: number) => Math.round(input * 100) / 100;
    const ageOfUniverse = 4.3 * 10 ** 17;
    const secondsInYear = 31540000;
    const combinations = charsetLength ** password.length;
    const secs = round(combinations / (2 * 10 ** 12));

    console.log(`Your password uses a set of ${charsetLength.toString().blue} characters and has a length of ${password.length.toString().blue}.`);
    console.log(`There are ${combinations.toString().cyan} possible combinations.`);
    console.log(`It would take a supercomputer (10^12 passwords/s) ${secs.toString().red} seconds to crack it.`)
    console.log(`This is equal to ${round(secs / secondsInYear).toString().red} years or ${round(secs / ageOfUniverse).toString().red} times the age of the universe.\n`);
  }
}
