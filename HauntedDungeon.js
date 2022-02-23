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
  const setupAddress = "0x9BDCf71048DFd8ef1C03a7ae3EDe79F04A096B7F";
  const challengeAddress = "0x137A5B4bB53A62BD1Db46e563b89D1884afaC0Ac";
  const challengeName = "HauntedDungeon";
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
  
  const prod = "mntnDew"
  const eth = {value: ethers.utils.parseEther("0.2")}

  await challengeContract.enterDungeon({ value: parseEther("0.2") });
  console.log("Dungeon entered");

    await challengeContract.store( prod, eth);
    await challengeContract.store( prod, eth);
    await challengeContract.store( prod, eth);  
    console.log("stats: Lives" , await challengeContract.lives(accounts.address),"Attack :", await challengeContract.attack(accounts.address),"Defense :", await challengeContract.defense(accounts.address) );
    await challengeContract.turn();
    console.log("Current floor :", await challengeContract.currentFloor(accounts.address));
  
  

  await challengeContract.turn();
  await challengeContract.store( prod, eth);
  await challengeContract.store( prod, eth);
  await challengeContract.store( prod, eth);
  console.log("stats: Lives" , await challengeContract.lives(accounts.address),"Attack :", await challengeContract.attack(accounts.address),"Defense :", await challengeContract.defense(accounts.address) );
  await challengeContract.turn();
  console.log("Current floor :", await challengeContract.currentFloor(accounts.address));

  await challengeContract.turn();
  await challengeContract.store( prod, eth);
  await challengeContract.store( prod, eth);
  await challengeContract.store( prod, eth);
  console.log("stats: Lives" , await challengeContract.lives(accounts.address),"Attack :", await challengeContract.attack(accounts.address),"Defense :", await challengeContract.defense(accounts.address) );
  await challengeContract.turn();
  console.log("Current floor :", await challengeContract.currentFloor(accounts.address));
 
  await challengeContract.turn();

 


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
