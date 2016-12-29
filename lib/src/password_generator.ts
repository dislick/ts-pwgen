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

  generate(verbose: boolean = false): string {
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

    // Display password strength
    if (verbose) {
      const round = (input: number) => Math.round(input * 100) / 100;
      const ageOfUniverse = 4.3 * 10 ** 17;
      const secondsInYear = 31540000;
      let combinations = list.length ** password.length;
      let secs = round(combinations / (2 * 10 ** 12));

      console.log(`Your password uses a set of ${list.length} characters and has a length of ${password.length}.`);
      console.log(`There are ${combinations} possible combinations.`);
      console.log(`It would take a supercomputer (10^12 passwords/s) ${secs} seconds to crack it.`)
      console.log(`This is equal to ${round(secs / secondsInYear)} years or ${round(secs / ageOfUniverse)} times the current age of the universe.\n`);
    }

    return password;
  }

  generateMultiple(amount: number, verbose: boolean = true): string[] {
    let passwords: string[] = [];

    for (let i = 0; i < amount; i++) {
      passwords.push(this.generate(verbose));
    }

    return passwords;
  }
}
