const net = require('net');

const HOST = '192.168.1.101';
const PORT = 8001;

// 定義固定值常數
const FIXED_HEADER = '500000FFFF0300';
const FIXED_COMMAND = '100001140000'; // 固定值 "0010000114"

// 定義其餘命令
const COMMANDS = {
  PATH: '0E00' + FIXED_COMMAND + '3B1100AF0100002F',
  FILE: '0E00' + FIXED_COMMAND + '3B1100AF01004544',
  OK: '0D00' + FIXED_COMMAND + '0092130090010010',
  OK_R: '0D00' + FIXED_COMMAND + '0092130090010000',
};

// 創建指令的Buffer
const path = Buffer.from(FIXED_HEADER + COMMANDS.PATH, 'hex');
const file = Buffer.from(FIXED_HEADER + COMMANDS.FILE, 'hex');
const ok = Buffer.from(FIXED_HEADER + COMMANDS.OK, 'hex');
const ok_1 = Buffer.from(FIXED_HEADER + COMMANDS.OK_R, 'hex');

// 連接到伺服器
const client = net.connect(PORT, HOST, () => {
  // 向伺服器發送指令
  client.write(path);
  client.write(file);
  client.write(ok);
  client.write(ok_1);
  console.log('指令已發送！');
});

// 處理從伺服器接收到的數據
client.on('data', (data) => {
  console.log('接收數據！');
  console.log('接收到的数据:', Buffer.from(data, 'hex'));

  // 在這裡處理接收到的數據
  // ...
});

// 處理錯誤
client.on('error', (error) => {
  console.log('錯誤：', error.message);
});

// 處理連接結束
client.on('end', () => {
  console.log('已與伺服器斷開連接');
});

// 處理連接關閉
client.on('close', () => {
  console.log('關閉連接');
});

// 在1秒後優雅地關閉連接
setTimeout(() => {
  console.log('暫停1秒');
  client.end();
}, 1000);