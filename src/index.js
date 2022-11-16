const express = require('express');
const cors = require('cors');

// const readlineSync = require('readline-sync');
// const symbol = readlineSync.question('Qual par de moedas deseja monitorar? ');

const WebSocket = require('ws');
const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcbrl@bookTicker');

// ws.onopen = () => {
// ws.send(JSON.stringify({
//    "method": "SUBSCRIBE",
//    "params": [`${symbol}@bookTicker`],
//    "id": 1
//    }))
// }

ws.onmessage = (event) => {
  process.stdout.write('\033c');
  const ob = JSON.parse(event.data);
  console.log(`Symbol: ${ob.s}`);
  console.log(`Best ask: ${ob.a}`)
  console.log(`Best bit: ${ob.b}`);
}

const port = 3333;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log('Server listening on port: ' + port);
})