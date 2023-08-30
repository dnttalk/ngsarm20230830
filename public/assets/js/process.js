const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;
const D4000 = '500000FFFF03000C00100001040000A00F00A80100';
const a = Buffer.from(D4000, 'hex');
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const client = net.connect(PORT, HOST, () => {
  client.write(a);
  console.log('Command sent!');

});

client.on('data', (data) => {
  console.log('data received!');
  const receivedData = data.toString('hex'); // 將Buffer轉換為十六進制字串
  // 抓取倒數第3+4個字元
  const lastIndex = receivedData.length - 1;
  const thirdLastChar = receivedData.charAt(lastIndex - 3) + receivedData.charAt(lastIndex - 2);
  const decimalValue = parseInt(thirdLastChar, 16);
  console.log(decimalValue);  // 打印十进制值
  console.log('接收到的数据:', receivedData);
  console.log('進行第幾步驟:', decimalValue);

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