/// <reference path="../../typings/index.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
require("colors");
const inquirer = require("inquirer");
const copyPaste = require("copy-paste");
const charsets_1 = require("./charsets");
const defaultOptions = {
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
};
class PasswordGenerator {
    constructor(options = defaultOptions) {
        this.options = options;
    }
    /**
     * Checks if a password string contains at least one character from a string
     * array.
     */
    containsFromCharset(password, charset) {
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
    generate() {
        let list = []; // This will hold all the characters that are going to be used
        let password = '';
        if (this.options.lowercaseLetters) {
            list = list.concat(charsets_1.lowercaseLettersList);
        }
        if (this.options.uppercaseLetters) {
            list = list.concat(charsets_1.uppercaseLettersList);
        }
        if (this.options.numbers) {
            list = list.concat(charsets_1.numbersList);
        }
        if (this.options.specialCharacters) {
            list = list.concat(charsets_1.specialCharactersList);
        }
        if (this.options.latin1Characters) {
            list = list.concat(charsets_1.latin1List);
        }
        // If the parts have a length of 0 or below, abort.
        if (this.options.parts.length <= 0) {
            return {
                value: '',
                charsetLength: list.length
            };
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
        if ((this.options.lowercaseLetters && !/[a-z]/.test(password))
            || (this.options.uppercaseLetters && !/[A-Z]/.test(password))
            || (this.options.numbers && !/[0-9]/.test(password))
            || (this.options.specialCharacters && !this.containsFromCharset(password, charsets_1.specialCharactersList))
            || (this.options.latin1Characters && !this.containsFromCharset(password, charsets_1.latin1List))) {
            return this.generate();
        }
        return {
            value: password,
            charsetLength: list.length
        };
    }
    /**
     * Generates any positive amount of passwords using this.generate().
     */
    generateMultiple(amount) {
        let passwords = [];
        for (let i = 0; i < amount; i++) {
            passwords.push(this.generate());
        }
        return passwords;
    }
    /**
     * Interactively ask the user which password they would like if they ask for
     * more than 1. Also copies it to the clipboard.
     */
    interactive(amount, verbose = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let passwords = this.generateMultiple(amount);
            let chosenPassword;
            if (amount <= 0) {
                return;
            }
            if (verbose)
                this.logInformation(passwords[0].value, passwords[0].charsetLength);
            if (amount === 1) {
                console.log(passwords[0].value);
                chosenPassword = passwords[0].value;
            }
            else {
                let answer = yield inquirer.prompt([
                    {
                        type: 'list',
                        name: 'password',
                        message: 'Choose password:',
                        choices: passwords.map(pw => pw.value)
                    }
                ]);
                chosenPassword = answer.password;
            }
            copyPaste.copy(chosenPassword, () => {
                console.log('\nPassword successfully copied to clipboard!');
            });
        });
    }
    /**
     * Log information about the security of the current password options.
     */
    logInformation(password, charsetLength) {
        const round = (input) => Math.round(input * 100) / 100;
        const ageOfUniverse = 4.3 * Math.pow(10, 17);
        const secondsInYear = 31540000;
        const combinations = Math.pow(charsetLength, password.length);
        const secs = round(combinations / (2 * Math.pow(10, 12)));
        console.log(`Your password uses a set of ${charsetLength.toString().blue} characters and has a length of ${password.length.toString().blue}.`);
        console.log(`There are ${combinations.toString().cyan} possible combinations.`);
        console.log(`It would take a supercomputer (10^12 passwords/s) ${secs.toString().red} seconds to crack it.`);
        console.log(`This is equal to ${round(secs / secondsInYear).toString().red} years or ${round(secs / ageOfUniverse).toString().red} times the age of the universe.\n`);
    }
}
exports.PasswordGenerator = PasswordGenerator;
