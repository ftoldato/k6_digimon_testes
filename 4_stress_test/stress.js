import http from 'k6/http';
import { sleep } from 'k6';

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