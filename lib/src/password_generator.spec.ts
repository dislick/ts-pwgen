/// <reference path="../../typings/index.d.ts" />

import { expect } from 'chai';
import { PasswordGenerator } from './password_generator';

describe('PasswordGenerator', () => {
  describe('generate()', () => {
    it('should be able to generate a password of length 10', () => {
      let pwgen = new PasswordGenerator();
      pwgen.options.parts.length = 10;
      expect(pwgen.generate()).to.have.length(10);
    });
  });
});

