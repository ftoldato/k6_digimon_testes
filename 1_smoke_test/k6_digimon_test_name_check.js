import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// Carrega os nomes dos Digimons de um arquivo JSON
const digimons = new SharedArray('Digimon Names', function () {
    return JSON.parse(open('./digimons.json')).names;
});

export let options = {
    vus: 10,
    duration: '10s'
};

export default function () {
    const name = digimons[__ITER];
    const url = `https://digimon-api.vercel.app/api/digimon/name/${name}`;
    const res = http.get(url);

    console.log(`log:[${name}] Status: ${res.status} | Corpo: ${res.body}`);

    check(res, {
        'status é 200': (r) => r.status === 200,
        'tempo de resposta <= 3000ms': (r) => r.timings.duration <= 3000
    });

    sleep(1);
}

export function handleSummary(data) {
    return {
        'summary.html': htmlReport(data),
        stdout: textSummary(data, { indent: '→', enableColors: true }),
    };
}

