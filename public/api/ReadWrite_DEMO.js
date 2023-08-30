const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const R2_112 = '500000FFFF03000E00100001140000000200AF01004849';
const R4411 = '500000FFFF03000E001000011400003B1100AF0100002F';
//\
const R4443 = '500000FFFF030016001000011400005B1100AF050045444F4D462E4F4C0057';
//DEMO.FLOW
const M5010 = '500000FFFF03000D0010000114010092130090010010'
const M5010_R = '500000FFFF03000D0010000114010092130090010000'
const window = Buffer.from(R2_112, 'hex');
const path = Buffer.from(R4411, 'hex');
const file = Buffer.from(R4443, 'hex');
const ok = Buffer.from(M5010, 'hex');
const ok_1 = Buffer.from(M5010_R, 'hex');
const client = net.connect(PORT, HOST, () => {
  client.write(window);
  client.write(path);
  client.write(file);
  client.write(ok);
  client.write(ok_1);
  console.log('Command sent!');
});

client.on('data', (data) => {
  //const received = data.();
  console.log('接收數據!');
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
  console.log("暫停1S");
  client.end();
}, 1000);
