const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const TestData = await ethers.getContractFactory("TestData");
  const testData = await TestData.deploy();

  console.log("TestData contract deployed to:", testData.address);

  // 在部署完成后进行调用测试
  const dataValues = [1, 2, 3, 4, 5];
  for (const value of dataValues) {
    await testData.writeData(value);
    console.log(`Data ${value} written to contract`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

