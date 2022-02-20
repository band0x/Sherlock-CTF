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
  const setupAddress = "0xfF2c41d306098Ce69316C781137EaF05FABDFF6b";
  const challengeAddress = "0xF8e8370A8d0a840DB47B2d52BEe5C549aD04809a";
  const challengeName = "Padlock";
  const setupName = "Setup";

   
  //attach setup
  const setupContract = await hre.ethers.getContractAt(setupName, setupAddress);
  //attach challenge
  const challengeContract = await hre.ethers.getContractAt(challengeName, challengeAddress);

  //verify unsolved
  console.log("Solved before ?: ", await setupContract.isSolved());
  console.log("Starting balance:", await ethers.provider.getBalance(challengeAddress));

  //exploit logic
  //deploy an exploit that will interact with the challenge
  await challengeContract.pick1("‮6167209‬");
  console.log("First lock:", await challengeContract.tumbler1());
  
  await challengeContract.pick2({value: 33});
  console.log("Second lock:", await challengeContract.tumbler2());
  
  await challengeContract.pick3("0x69420000000000006942000000000000");
  console.log("Third lock:", await challengeContract.tumbler3());
  
  await challengeContract.open();
  

  //verify solved
  console.log("Solved after?: ", await setupContract.isSolved());
  //await exploit.solve1({value: parseEther("1")});
  

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
