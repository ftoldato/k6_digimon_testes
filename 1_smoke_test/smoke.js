import http from 'k6/http';

export let options = {
    vus: 1,
    iterations: 1,
};

export default function () {
    let res = http.get('https://digimon-api.vercel.app/api/digimon');
    console.log('Status:', res.status);
}