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
    vus: 5,
    duration: '10s',
    thresholds: {
        // 95% das requisições devem ser respondidas em até 500ms
        http_req_duration: ['p(95)<500'],

        // Nenhuma requisição pode falhar
        http_req_failed: ['rate<0.31'],

        // O tempo máximo de resposta deve ser menor que 2000ms
        http_req_duration: ['max<2000'],

        // Opcional: média de tempo de resposta abaixo de 300ms
        'http_req_duration{status:200}': ['avg<300']
    }
};

export default function () {
    // Pega um nome aleatório da lista
    const name = digimons[Math.floor(Math.random() * digimons.length)];
    const url = `https://digimon-api.vercel.app/api/digimon/name/${name}`;

    const res = http.get(url);

    console.log(`Testando Digimon: ${name} | Status: ${res.status}`);

    check(res, {
        'status é 200': (r) => r.status === 200
    });

    sleep(1);
}

export function handleSummary(data) {
    return {
        'summary.html': htmlReport(data),
        stdout: textSummary(data, { indent: '→', enableColors: true }),
    };
}