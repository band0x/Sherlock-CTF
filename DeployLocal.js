const hre = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

async function main() {
  

  //get accounts and verify balances
  const [accounts,deployer] = await hre.ethers.getSigners();
  console.log("Signer is: ", accounts.address);
  console.log("Deployer is: ", deployer.address);

  
   // deploy setup contract
   const Setup = await hre.ethers.getContractFactory("Setup");
   const setup = await Setup.connect(deployer).deploy({ value: parseEther("9") });
   await setup.deployed();
   console.log("Setup deployed to:", setup.address);
 
   // verify challenge contract
   
   console.log("Challenge Instance:", await setup.instance());
    
  //verify unsolved
  console.log("Solved before ?: ", await setup.isSolved());
  console.log("Starting balance:", await ethers.provider.getBalance(setup.instance()));

  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
