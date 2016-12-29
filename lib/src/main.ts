import { PasswordGenerator } from './password_generator';

let pwgen = new PasswordGenerator();
pwgen.setHumanReadableOptions();
console.log(pwgen.generateMultiple(10));
