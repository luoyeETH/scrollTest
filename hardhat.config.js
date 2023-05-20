require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    scroll: {
      url: `https://alpha-rpc.scroll.io/l2`,
      accounts: ["privateKey"]
    }
  }
};
