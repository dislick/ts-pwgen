/// <reference path="../../typings/index.d.ts" />

import 'colors';

interface PasswordGeneratorOptions {
  lowercaseLetters: boolean;
  uppercaseLetters: boolean;
  numbers: boolean;
  specialCharacters: boolean;
  latin1Characters: boolean;
  parts: {
    amount: number;
    length: number;
    delimiter: string;
  }
}

interface GeneratedPassword {
  value: string;
  charsetLength: number;
  differentCharacters?: number;
}

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
  private static lowercaseLettersList: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  private static uppercaseLettersList: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  private static numbersList: string[] = '0123456789'.split('');
  private static specialCharactersList: string[] = '!"#%&()*+,-./:;<=>?@[\]^_`{|}~'.split('');
  private static latin1List: string[] = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'.split('');

  constructor(public options: PasswordGeneratorOptions = defaultOptions) {
  }

  private containsFromCharset(password: string, charset: string[]): boolean {
    for (let char of charset) {
      if (password.indexOf(char) === -1) {
        return false;
      }
    }
    return true;
  }

  generate(): GeneratedPassword {
    let list: string[] = [];
    let password: string = '';    

    if (this.options.lowercaseLetters) {
      list = list.concat(PasswordGenerator.lowercaseLettersList);
    }
    if (this.options.uppercaseLetters) {
      list = list.concat(PasswordGenerator.uppercaseLettersList);
    }
    if (this.options.numbers) {
      list = list.concat(PasswordGenerator.numbersList);
    }
    if (this.options.specialCharacters) {
      list = list.concat(PasswordGenerator.specialCharactersList);
    }
    if (this.options.latin1Characters) {
      list = list.concat(PasswordGenerator.latin1List);
    }

    if (this.options.parts.length <= 0) {
      return {
        value: '',
        charsetLength: list.length
      }
    }

    for (let partIndex = 0; partIndex < this.options.parts.amount; partIndex++) {
      let part = '';

      while (part.length < this.options.parts.length) {
        let randomIndex = Math.floor(Math.random() * list.length);
        part += list[randomIndex];
      }

      if (partIndex !== this.options.parts.amount - 1) {
        part += this.options.parts.delimiter;
      }

      password += part;
    }

    if (
      (this.options.lowercaseLetters && !/[a-z]/.test(password))
      || (this.options.uppercaseLetters && !/[A-Z]/.test(password))
      || (this.options.numbers && !/[0-9]/.test(password))
      || (this.options.specialCharacters && this.containsFromCharset(password, PasswordGenerator.specialCharactersList))
      || (this.options.latin1Characters && this.containsFromCharset(password, PasswordGenerator.latin1List))
    ) {
      return this.generate();
    }

    return {
      value: password,
      charsetLength: list.length
    };
  }

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
