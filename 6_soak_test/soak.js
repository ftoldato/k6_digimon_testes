import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 50,
    duration: '1h',
};

export default function () {
    http.get('https://digimon-api.vercel.app/api/digimon');
    sleep(1);
}