export interface PasswordGeneratorOptions {
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

export interface GeneratedPassword {
  value: string;
  charsetLength: number;
  differentCharacters?: number;
}
