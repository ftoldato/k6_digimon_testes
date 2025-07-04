import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export let options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  let res = http.get('https://digimon-api.vercel.app/api/digimon');
  check(res, {
    'status é 200': (r) => r.status === 200,
    'corpo não vazio': (r) => r.body && r.body.length > 0,
  });
}

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data),
    stdout: textSummary(data, { indent: '→', enableColors: true }),
  };
}