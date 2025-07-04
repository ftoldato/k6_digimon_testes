import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 200 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 200 },
        { duration: '10s', target: 10 },
    ],
};

export default function () {
    http.get('https://digimon-api.vercel.app/api/digimon');
    sleep(1);
}