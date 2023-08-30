const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const delayedHexData = '500000FFFF03000E001000011400003B1100AF01000100';
const buffer = Buffer.from(delayedHexData, 'hex');

const client = net.connect(PORT, HOST, () => {
  console.log('已連接到伺服器');
  client.write(buffer);
});

client.on('data', (data) => {
  const receivedData = data.toString();
  console.log('1.接收到的回應數據:', receivedData);
  console.log('2.接收到的資料:', Buffer.from(receivedData, 'hex'));
  console.log('3.接收到的数据:', data.toString('hex'));
});

client.on('end', () => {
  console.log('已與伺服器斷開連接');
});