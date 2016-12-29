interface PasswordGeneratorOptions {
  lowercaseLetters: boolean;
  uppercaseLetters: boolean;
  numbers: boolean;
  specialCharacters: boolean;
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

  constructor(public options: PasswordGeneratorOptions = defaultOptions) {
  }

  generate(): string {
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

    return password;
  }

  generateMultiple(amount: number): string[] {
    let passwords: string[] = [];

    for (let i = 0; i < amount; i++) {
      passwords.push(this.generate());
    }

    return passwords;
  }
}
