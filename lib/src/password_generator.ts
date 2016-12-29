interface PasswordGeneratorOptions {
  length: number;
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
  length: 30,
  lowercaseLetters: true,
  uppercaseLetters: true,
  numbers: true,
  specialCharacters: true,
  parts: {
    amount: 1,
    length: 10,
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

  generate() {

  }
}
