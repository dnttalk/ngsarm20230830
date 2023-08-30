const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const R499 = '500000FFFF03000E00100001140000F30100AF01000000';
const M300 = '500000FFFF03000D001000011401002C010090010010';

const a = Buffer.from(R499, 'hex');
const b = Buffer.from(M300, 'hex');


const client = net.connect(PORT, HOST, () => {

  client.write(a);
  client.write(b);
  console.log('Command sent!');
});

client.on('data', (data) => {

  console.log('data received!');
  console.log('接收到的数据:', Buffer.from(data, 'hex'));


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
  console.log("Executed after 1 second");
  client.end();
}, 1000);

