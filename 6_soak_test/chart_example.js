import http from 'k6/http';
import { check } from 'k6';

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