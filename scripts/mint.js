const { ethers } = require('ethers');

// 配置 RPC 网络和链 ID
const provider = new ethers.providers.JsonRpcProvider('https://alpha-rpc.scroll.io/l2', {
  chainId: 534353
});

const contractAbi = [
    // 合约方法定义
    {
      "constant": false,
      "inputs": [
        {
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

// 填入您的私钥列表
const privateKeys = [
  "私钥1",
  "私钥2",
  "私钥3",
  // 添加更多私钥...
];

// 填入您的合约地址列表
const contractAddresses = [
  "合约1",
  "合约2",
  "合约3",
  // 添加更多合约地址...
];

// 创建签名器列表
const signers = privateKeys.map(privateKey => new ethers.Wallet(privateKey, provider));

// 交互函数
async function mintToken(contract) {
  try {
    // 随机生成 1、2 或 3
    const num = Math.floor(Math.random() * 3) + 1;

    // 随机延迟 10-100 秒开始执行
    const delay = Math.floor(Math.random() * 91) + 10;
    console.log(`随机延迟${delay}秒后执行`);
    await sleep(delay * 1000);

    // 使用合约实例调用 mint 函数
    const transaction = await contract.mint(num);

    // 等待交易被打包和确认
    await transaction.wait();

    console.log(`交互成功！合约地址: ${contract.address}, num: ${num}`);
  } catch (error) {
    console.error('交互失败:', error);
  }
}

// 等待指定毫秒数的辅助函数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 执行交互任务
async function executeMintTasks() {
  let times = 0;
  while (true) {
    // 逐个执行交互任务
    for (let i = 0; i < signers.length; i++) {
      const randomIndex = Math.floor(Math.random() * contractAddresses.length);
      const contract = new ethers.Contract(contractAddresses[randomIndex], contractAbi, signers[i]);
      await mintToken(contract);
    }
    console.log(`第 ${++times} 轮随机执行完成！`);
    // 等待 4 小时后开始新一轮随机执行
    await sleep(4 * 60 * 60 * 1000);
  }
}

// 启动执行任务
executeMintTasks().catch(error => console.error('执行任务失败:', error));
