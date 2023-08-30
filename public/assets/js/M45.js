const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const M45 = '500000FFFF03000D001000011401002D000090010010';
const M45_R = '500000FFFF03000D001000011401002D000090010000';


const a = Buffer.from(M45, 'hex');
const a_R = Buffer.from(M45_R, 'hex');

const client = net.connect(PORT, HOST, () => {
  client.write(a);
  client.write(a_R);

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

