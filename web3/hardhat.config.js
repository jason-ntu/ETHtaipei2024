// require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
    solidity: "0.8.9",
    networks: {
        scrollSepolia: {
            url: "https://sepolia-rpc.scroll.io" || "",
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
        },
    },
}