import http from 'k6/http';

export let options = {
    vus: 1,
    duration: '10s',
};

export default function () {
    let res = http.get('https://digimon-api.vercel.app/api/digimon');
    console.log('Status:', res.status);
}