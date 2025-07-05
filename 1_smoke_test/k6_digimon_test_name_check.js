import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

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