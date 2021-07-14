/* eslint-disable no-restricted-syntax */
import { invoices, plays } from './fixtures';

function accumulateVolumeCredit(invoice, plays) {
  // 포인트
  let defaultCredits = 0;
  let bonusCredits = 0;

  for (const perf of invoice.performances) {
    const play = plays[perf.playID];

    // 포인트를 적립한다.
    if (perf.audience > 30) {
      defaultCredits += perf.audience - 30;
    }

    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if (play.type === 'comedy') bonusCredits += Math.floor(perf.audience / 5);
  }

  return defaultCredits + bonusCredits;
}

export default function statement(invoice, plays) {
  // 전체 공연료
  let totalAmount = 0;

  let result = `Statement for ${invoice.customer}\n`;

  const { format } = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFactionDigits: 2,
  });

  for (const perf of invoice.performances) {
    // e.g) { "name": "Hamlet", "type": "tragedy" }
    const play = plays[perf.playID];

    // 공연료
    let thisAmount = 0;

    switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // 청구 내역을 출력한다
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${accumulateVolumeCredit(invoice, plays)}점\n`;

  return result;
}

invoices.forEach((invoice) => {
  console.log(statement(invoice, plays));
  console.log('------------------------------------------');
});
