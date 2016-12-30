/// <reference path="../../typings/index.d.ts" />
"use strict";
require("colors");
var charsets_1 = require("./charsets");
var defaultOptions = {
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
var PasswordGenerator = (function () {
    function PasswordGenerator(options) {
        if (options === void 0) { options = defaultOptions; }
        this.options = options;
    }
    /**
     * Checks if a password string contains at least one character from a string
     * array.
     */
    PasswordGenerator.prototype.containsFromCharset = function (password, charset) {
        for (var _i = 0, charset_1 = charset; _i < charset_1.length; _i++) {
            var char = charset_1[_i];
            if (password.indexOf(char) !== -1) {
                return true;
            }
        }
        return false;
    };
    /**
     * Generates a password based on this.options. This method will recursively
     * call itself if the password does not contain at least one character from
     * each specified charset.
     */
    PasswordGenerator.prototype.generate = function () {
        var list = [];
        var password = '';
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
        if (this.options.parts.length <= 0) {
            return {
                value: '',
                charsetLength: list.length
            };
        }
        var _a = this.options.parts, amount = _a.amount, length = _a.length, delimiter = _a.delimiter;
        for (var partIndex = 0; partIndex < amount; partIndex++) {
            var part = '';
            while (part.length < length) {
                var randomIndex = Math.floor(Math.random() * list.length);
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
    };
    /**
     * Generates any positive amount of passwords using this.generate().
     */
    PasswordGenerator.prototype.generateMultiple = function (amount, verbose) {
        if (verbose === void 0) { verbose = false; }
        var passwords = [];
        for (var i = 0; i < amount; i++) {
            passwords.push(this.generate());
        }
        if (verbose) {
            this.logInformation(passwords[0].value, passwords[0].charsetLength);
        }
        return passwords.map(function (pw) { return pw.value; });
    };
    /**
     * Log information about the security of the current password options.
     */
    PasswordGenerator.prototype.logInformation = function (password, charsetLength) {
        var round = function (input) { return Math.round(input * 100) / 100; };
        var ageOfUniverse = 4.3 * Math.pow(10, 17);
        var secondsInYear = 31540000;
        var combinations = Math.pow(charsetLength, password.length);
        var secs = round(combinations / (2 * Math.pow(10, 12)));
        console.log("Your password uses a set of " + charsetLength.toString().blue + " characters and has a length of " + password.length.toString().blue + ".");
        console.log("There are " + combinations.toString().cyan + " possible combinations.");
        console.log("It would take a supercomputer (10^12 passwords/s) " + secs.toString().red + " seconds to crack it.");
        console.log("This is equal to " + round(secs / secondsInYear).toString().red + " years or " + round(secs / ageOfUniverse).toString().red + " times the age of the universe.\n");
    };
    return PasswordGenerator;
}());
exports.PasswordGenerator = PasswordGenerator;
