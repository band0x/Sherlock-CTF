require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
//const ALCHEMY_API_KEY = "KEY";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0";

module.exports = {

  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.11",
        settings: {},
      },
    ], 
  },  
  //solidity: "0.8.0", "0.8.11"
  networks: {
    ctf: {
      url: `https://ctf.sherlock.xyz/fJBgYRP8iYJ3bpQmBuXcKNO49EtEcHWn9Et2Bp0r_-0`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }
};
