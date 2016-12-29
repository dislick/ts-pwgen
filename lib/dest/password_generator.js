"use strict";
var defaultOptions = {
    lowercaseLetters: true,
    uppercaseLetters: true,
    numbers: true,
    specialCharacters: true,
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
    PasswordGenerator.prototype.setHumanReadableOptions = function () {
        this.options = {
            lowercaseLetters: true,
            uppercaseLetters: false,
            numbers: true,
            specialCharacters: false,
            parts: {
                amount: 3,
                length: 5,
                delimiter: '-'
            }
        };
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
        return password;
    };
    PasswordGenerator.prototype.generateMultiple = function (amount) {
        var passwords = [];
        for (var i = 0; i < amount; i++) {
            passwords.push(this.generate());
        }
        return passwords;
    };
    return PasswordGenerator;
}());
PasswordGenerator.lowercaseLettersList = 'abcdefghijklmnopqrstuvwxyz'.split('');
PasswordGenerator.uppercaseLettersList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
PasswordGenerator.numbersList = '0123456789'.split('');
PasswordGenerator.specialCharactersList = '!"#%&()*+,-./:;<=>?@[\]^_`{|}~'.split('');
exports.PasswordGenerator = PasswordGenerator;
