const { ethers, providers } = require("hardhat");

async function writeDataLoop(scrollOkayBears, privateKey, provider) {
  const dataValues = [1, 2, 3];
  const randomDataValues = getRandomElements(dataValues, 1); // 获取随机的一个数据值

  for (const value of randomDataValues) {
    const wallet = new ethers.Wallet(privateKey, provider);
    const scrollOkayBearsWithSigner = scrollOkayBears.connect(wallet);
    await scrollOkayBearsWithSigner.mint(value);
    console.log(`Data ${value} written to contract`);
  }
}

// 从数组中随机获取指定数量的元素
function getRandomElements(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function executeRandomly(scrollOkayBears, privateKey, provider) {
  while (true) {
    const maxIterations = 5;
    let count = 0;

    while (count < maxIterations) {
      console.log(`Iteration ${count + 1}`);
      try {
        await writeDataLoop(scrollOkayBears, privateKey, provider);
      } catch (error) {
        console.log(`Error writing data to contract\n` + error);
      }
      count++;
      let randomDelay = getRandomDelay();
      console.log(`Waiting for ${randomDelay} milliseconds`);
      await delay(randomDelay); // 等待随机的延迟时间
    }
  }
}

function getRandomDelay() {
  const minDelay = 1 * 60 * 60 * 1000; // 1小时的毫秒数
  const maxDelay = 24 * 60 * 60 * 1000; // 24小时的毫秒数

  return Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // 指定你的私钥列表
  const privateKeys = ["私钥1",
                       "私钥2",
                       "私钥3"
                      ];

  const ScrollOkayBears = await ethers.getContractFactory("ScrollOkayBears");
  console.log("ScrollOkayBears contract deployed to:\n");
  for (i = 0;i < 10;i++) {
    const scrollOkayBears = await ScrollOkayBears.deploy();
//   const provider = new ethers.providers.JsonRpcProvider("https://alpha-rpc.scroll.io/l2");
    console.log(scrollOkayBears.address);
  }
//   const executeTasks = privateKeys.map(privateKey => executeRandomly(scrollOkayBears, privateKey, provider));
//   await Promise.all(executeTasks);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
