const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const M5001 = '500000FFFF03000D0010000114010089130090010001';
const M5001_off = '500000FFFF03000D0010000114010089130090010000';
const M5001_read = '500000FFFF03000C00100001040100891300900100';
const M700_on = '500000FFFF03000D00100001140100BC020090010010';
const D600_read = '500000FFFF03000C00100001040000580200A80100';
const D601_read = '500000FFFF03000C00100001040000590200A80100';

const a = Buffer.from(M5001, 'hex');
const a_off = Buffer.from(M5001_off, 'hex');
const a_read = Buffer.from(M5001_read, 'hex');

const client = net.connect(PORT, HOST, () => {
  client.write(Buffer.from(M700_on, 'hex'));
  console.log('Command sent!');
  buffer = Buffer.from(D600_read, 'hex');
  setTimeout(() => { }, 1000);
  client.write(buffer);
  console.log("data1");
  buffer = Buffer.from(D601_read, 'hex');
  setTimeout(() => { client.write(buffer); }, 1000);
  console.log("data2");
  //client.write(a_off);
});

client.on('data', (data) => {
  //const received = data.();
  console.log('data received!');
  console.log('接收到的数据:', Buffer.from(data, 'hex'));

  // 在这里处理接收到的数据
  // ...
});
client.on('error', (error) => {
  console.log(error);
})

client.on('end', () => {
  client.end;
  console.log('已与服务器断开连接');
});

client.on('close', () => {
  console.log('Closing connection');
})

setTimeout(function () {
  console.log("Executed after 5 second");
  client.end();
}, 5000);

//client.end();