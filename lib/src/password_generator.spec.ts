/// <reference path="../../typings/index.d.ts" />

import { expect } from 'chai';
import { PasswordGenerator } from './password_generator';

describe('PasswordGenerator', () => {
  describe('generate()', () => {
    it('should throw an error when asking for a password of length 0', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.parts.length = 0;
      expect(() => {
        pwgen.generate();
      }).to.throw();
    });

    it('should be able to generate a password of length 10', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.parts.length = 10;
      expect(pwgen.generate().value).to.have.length(10);
    });

    it('should be able to generate a password of length 20', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.parts.length = 20;
      expect(pwgen.generate().value).to.have.length(20);
    });

    it('should be able to generate a password of length 100', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.parts.length = 100;
      expect(pwgen.generate().value).to.have.length(100);
    });

    it('should be able to generate 2 parts of 5 with a dash delimiter', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.specialCharacters = false;
      pwgen.options.parts = {
        amount: 2,
        length: 5,
        delimiter: '-'
      };
      let expectRegex = /[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}/;
      expect(expectRegex.test(pwgen.generate().value)).to.be.true;
    });

    it('should be able to generate 3 parts of 6 with a dash delimiter', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.specialCharacters = false;
      pwgen.options.parts = {
        amount: 3,
        length: 6,
        delimiter: '-'
      };
      let expectRegex = /[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}/;
      expect(expectRegex.test(pwgen.generate().value)).to.be.true;
    });

    it('should be able to generate 3 parts of 10 with a ! delimiter', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.specialCharacters = false;
      pwgen.options.parts = {
        amount: 3,
        length: 10,
        delimiter: '!'
      };
      let expectRegex = /[a-zA-Z0-9]{10}![a-zA-Z0-9]{10}![a-zA-Z0-9]{10}/;
      expect(expectRegex.test(pwgen.generate().value)).to.be.true;
    });

    it('should include at least one letter from each specified charset', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options = {
        lowercaseLetters: true,
        uppercaseLetters: true,
        numbers: true,
        specialCharacters: false,
        latin1Characters: false,
        parts: {
          amount: 1,
          length: 3,
          delimiter: '-'
        }
      }

      for (let i = 0; i < 1000; i++) {
        let password = pwgen.generate().value;
        expect(/[a-z]/.test(password), `Did not include a lowercase letter, ${password}`).to.be.true;
        expect(/[A-Z]/.test(password), `Did not include an uppercase letter, ${password}`).to.be.true;
        expect(/[0-9]/.test(password), `Did not include a number, ${password}`).to.be.true;
      }
    });
  });

  describe('generateMultiple()', () => {
    it('should be able to generate 1 password', () => {
      let pwgen = new PasswordGenerator();
      let output = pwgen.generateMultiple(1);
      expect(output).to.have.length(1);
    });

    it('should be able to generate 3 passwords', () => {
      let pwgen = new PasswordGenerator();
      let output = pwgen.generateMultiple(3);
      expect(output).to.have.length(3);
    });

    it('should be able to generate 20 passwords', () => {
      let pwgen = new PasswordGenerator();
      let output = pwgen.generateMultiple(20);
      expect(output).to.have.length(20);
    });
  });

  describe('countActiveCharsets()', () => {
    it('should return 0 because no charsets are active', () => {
      let pwgen = new PasswordGenerator({
        lowercaseLetters: false,
        uppercaseLetters: false,
        numbers: false,
        specialCharacters: false,
        latin1Characters: false,
        parts: { amount: 1, length: 30, delimiter: '-' }
      });
      expect(pwgen.countActiveCharsets()).to.be.equal(0);
    });

    it('should return 1 because 1 charset is active', () => {
      let pwgen = new PasswordGenerator({
        lowercaseLetters: true,
        uppercaseLetters: false,
        numbers: false,
        specialCharacters: false,
        latin1Characters: false,
        parts: { amount: 1, length: 30, delimiter: '-' }
      });
      expect(pwgen.countActiveCharsets()).to.be.equal(1);
    });

    it('should return 5 because 5 charsets are active', () => {
      let pwgen = new PasswordGenerator({
        lowercaseLetters: true,
        uppercaseLetters: true,
        numbers: true,
        specialCharacters: true,
        latin1Characters: true,
        parts: { amount: 1, length: 30, delimiter: '-' }
      });
      expect(pwgen.countActiveCharsets()).to.be.equal(5);
    });
  })
});

