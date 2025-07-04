import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 0 },
    ],
};

export default function () {
    http.get('https://digimon-api.vercel.app/api/digimon');
    sleep(1);
}