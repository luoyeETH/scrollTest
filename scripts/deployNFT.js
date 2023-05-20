const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const NFTContract = await ethers.getContractFactory("NFTContract");
  const nftContract = await NFTContract.deploy();

  console.log("NFTContract deployed to:", nftContract.address);

  // 进行五次铸造测试
  for (let i = 1; i <= 5; i++) {
    await nftContract.mint(deployer.address, i);
    console.log(`NFT ${i} minted`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

