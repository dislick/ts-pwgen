"use strict";
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
    PasswordGenerator.prototype.generate = function (verbose) {
        if (verbose === void 0) { verbose = false; }
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
        // Display password strength
        if (verbose) {
            var round = function (input) { return Math.round(input * 100) / 100; };
            var ageOfUniverse = 4.3 * Math.pow(10, 17);
            var secondsInYear = 31540000;
            var combinations = Math.pow(list.length, password.length);
            var secs = round(combinations / (2 * Math.pow(10, 12)));
            console.log("Your password uses a set of " + list.length + " characters and has a length of " + password.length + ".");
            console.log("There are " + combinations + " possible combinations.");
            console.log("It would take a supercomputer (10^12 passwords/s) " + secs + " seconds to crack it.");
            console.log("This is equal to " + round(secs / secondsInYear) + " years or " + round(secs / ageOfUniverse) + " times the current age of the universe.\n");
        }
        return password;
    };
    PasswordGenerator.prototype.generateMultiple = function (amount, verbose) {
        if (verbose === void 0) { verbose = true; }
        var passwords = [];
        for (var i = 0; i < amount; i++) {
            passwords.push(this.generate(verbose));
        }
        return passwords;
    };
    return PasswordGenerator;
}());
PasswordGenerator.lowercaseLettersList = 'abcdefghijklmnopqrstuvwxyz'.split('');
PasswordGenerator.uppercaseLettersList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
PasswordGenerator.numbersList = '0123456789'.split('');
PasswordGenerator.specialCharactersList = '!"#%&()*+,-./:;<=>?@[\]^_`{|}~'.split('');
PasswordGenerator.latin1List = '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'.split('');
exports.PasswordGenerator = PasswordGenerator;
