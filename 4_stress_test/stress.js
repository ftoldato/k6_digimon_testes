import http from 'k6/http';
import { sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';


export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 300 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 0 },
    ],
};

export default function () {
    http.get('https://digimon-api.vercel.app/api/digimon');
    sleep(1);
}

export function handleSummary(data) {
    return {
        'index.html': htmlReport(data),
        stdout: textSummary(data, { indent: '→', enableColors: true }),
    };
}
