require("@nomiclabs/hardhat-waffle");


require('dotenv').config();

module.exports = {
  // ... other configurations ...
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
