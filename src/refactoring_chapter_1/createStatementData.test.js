import given from 'given2';

import statement from './createStatementData';

describe('statement', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
  };

  given('invoice', () => ({
    customer: 'WeLoveRefactoring',
    performances: [
      {
        playID: given.playID,
        audience: given.audience,
      },
    ],
  }));

  given('playID', () => 'hamlet');

  it('prints out the name of the customer', () => {
    const result = statement(given.invoice, plays);

    expect(result).toContain(given.invoice.customer);
  });

  it('accumulates volume credits when number of audience is more than 30', () => {
    given('audience', () => 35);

    const result = statement(given.invoice, plays);

    expect(result).toContain('적립 포인트: 5점');
  });

  it('sums up ticket price cosutomer must pay', () => {
    given('audience', () => 35);

    const result = statement(given.invoice, plays);

    expect(result).toContain('$450');
  });

  context('with tragedy type', () => {
    given('audience', () => 30);

    it('charges play ticket price as $400', () => {
      const result = statement(given.invoice, plays);

      expect(result).toContain('$400');
    });

    context('with number of audiences more than 30', () => {
      given('audience', () => 31);

      it('charges $10 per audience from default ticket price', () => {
        const result = statement(given.invoice, plays);

        expect(result).toContain('$410');
      });
    });
  });

  context('with comedy type', () => {
    given('playID', () => 'as-like');
    given('audience', () => 20);

    it('charges play ticket price as $300 with $3 per audience', () => {
      const result = statement(given.invoice, plays);

      expect(result).toContain('$360');
    });

    it('accumulate additional volume credit', () => {
      given('audience', () => 20);
      given('playID', () => 'as-like');

      const result = statement(given.invoice, plays);

      expect(result).toContain('적립 포인트: 4점');
    });

    context('with number of audience more than 20', () => {
      given('audience', () => 21);

      it('charges additional $5 per audience', () => {
        const result = statement(given.invoice, plays);

        expect(result).toContain('총액: $468');
      });
    });
  });

  context('with undefined type', () => {
    given('playID', () => 'hero');

    it('prompts out undefined play type alert message', () => {
      try {
        statement(given.invoice, {
          hero: { name: 'Hero', type: 'history' },
        });
      } catch (error) {
        expect(error).toHaveProperty('message', '알 수 없는 장르: history');
      }
    });
  });
});
