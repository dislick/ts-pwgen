/// <reference path="../../typings/index.d.ts" />

import { expect } from 'chai';
import { PasswordGenerator } from './password_generator';

describe('PasswordGenerator', () => {
  describe('generate()', () => {
    it('should be able to generate a password of length 0', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.parts.length = 0;
      expect(pwgen.generate()).to.have.length(0);
    });

    it('should be able to generate a password of length 10', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.parts.length = 10;
      expect(pwgen.generate()).to.have.length(10);
    });

    it('should be able to generate a password of length 20', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.parts.length = 20;
      expect(pwgen.generate()).to.have.length(20);
    });

    it('should be able to generate a password of length 100', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.parts.length = 100;
      expect(pwgen.generate()).to.have.length(100);
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
      expect(expectRegex.test(pwgen.generate())).to.be.true;
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
      expect(expectRegex.test(pwgen.generate())).to.be.true;
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
      expect(expectRegex.test(pwgen.generate())).to.be.true;
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
});

