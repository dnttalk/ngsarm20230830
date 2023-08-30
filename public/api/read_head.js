const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const M812 = '500000FFFF03000C001000010401002C0300900100';
const D844 = '500000FFFF03000C001000010401004C0300A80100';
const a = Buffer.from(M812, 'hex');
const b = Buffer.from(D844, 'hex');

const client = net.connect(PORT, HOST, () => {
  console.log('已连接到服务器');
  //client.write(a);
  client.write(b);
});

client.on('data', (data) => {
  //console.log('接收到的数据:', data);
  console.log('接收到的数据:', data.toString('hex'));

  // 在这里处理接收到的数据
  // ...
});

client.on('end', () => {
  console.log('已与服务器断开连接');
});