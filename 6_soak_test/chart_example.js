import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export let options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    let res = http.get('https://digimon-api.vercel.app/api/digimon');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'body is not empty': (r) => r.body.length > 0,
    });
}

export function handleSummary(data) {
    return {
        'index.html': htmlReport(data),
        stdout: textSummary(data, { indent: '→', enableColors: true }),
    };
}