interface PasswordGeneratorOptions {
  lowercaseLetters: boolean;
  uppercaseLetters: boolean;
  numbers: boolean;
  specialCharacters: boolean;
}

export class PasswordGenerator {  
  constructor(private options: PasswordGeneratorOptions) {
    
  }

}
