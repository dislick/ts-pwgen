/// <reference path="../../typings/index.d.ts" />
"use strict";
require("colors");
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
    PasswordGenerator.prototype.containsFromCharset = function (password, charset) {
        var contains = false;
        for (var _i = 0, charset_1 = charset; _i < charset_1.length; _i++) {
            var char = charset_1[_i];
            if (password.indexOf(char) !== -1) {
                contains = true;
            }
        }
        return contains;
    };
    PasswordGenerator.prototype.generate = function () {
        var list = [];
        var password = '';
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
            };
        }
        for (var partIndex = 0; partIndex < this.options.parts.amount; partIndex++) {
            var part = '';
            while (part.length < this.options.parts.length) {
                var randomIndex = Math.floor(Math.random() * list.length);
                part += list[randomIndex];
            }
            if (partIndex !== this.options.parts.amount - 1) {
                part += this.options.parts.delimiter;
            }
            password += part;
        }
        if ((this.options.lowercaseLetters && !/[a-z]/.test(password))
            || (this.options.uppercaseLetters && !/[A-Z]/.test(password))
            || (this.options.numbers && !/[0-9]/.test(password))
            || (this.options.specialCharacters && !this.containsFromCharset(password, PasswordGenerator.specialCharactersList))
            || (this.options.latin1Characters && !this.containsFromCharset(password, PasswordGenerator.latin1List))) {
            return this.generate();
        }
        return {
            value: password,
            charsetLength: list.length
        };
    };
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
PasswordGenerator.lowercaseLettersList = 'abcdefghijklmnopqrstuvwxyz'.split('');
PasswordGenerator.uppercaseLettersList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
PasswordGenerator.numbersList = '0123456789'.split('');
PasswordGenerator.specialCharactersList = '!"#%&()*+,-./:;<=>?@[\]^_`{|}~'.split('');
PasswordGenerator.latin1List = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'.split('');
exports.PasswordGenerator = PasswordGenerator;
