const hre = require("hardhat");
async function main() {
  

  //get accounts and verify balances
  const [accounts,deployer] = await hre.ethers.getSigners();
  console.log("Signer is: ", accounts.address);
  console.log("Deployer is: ", deployer.address);

  
   // deploy setup contract
   const challenges = [ 
    "0x5e40D0d98126323b81246008d386a93BA091704f",
    "0x459D9C80482c541deC1Aa491209EF598BF7c9344",
    "0xABF1f66a9fb48F3f5b75C8A83FB5854A9d906343",
    "0x46C9489797c5647F850dD3A5bcB13C240bcd383A",
    "0xFfb20eF6668F8160934FD84b60F3DeD127F787Aa",
    "0xfF2c41d306098Ce69316C781137EaF05FABDFF6b",
    "0x0a73CA730FaF56126487196a4B7E10B2A9B3df67",
    "0x5364B5A9e489b495CaAE4722e9706C817Cf54433",
    "0xA083913ed673b23dC5FB921b3909021CacFD794C",
    "0x38B500E61267Ee672c823bE3a8fA559236Bd1FD3",
    "0x427255B0e21A7f0D809c7cE854569A10df44378d",
    "0x1f5c09a7d6a9B30b43DDDAABD384425DEe0ADe91",
    "0x9e6C0511d07695420A0B57003d6e8c133Cd0185d",
    "0x0ABBC49482097b530516d385B4dD183b59073f1C",
    "0xe95dF719Fc223CD8E57bA9bAAb8E86bEDF3e5d69",
    "0x9BDCf71048DFd8ef1C03a7ae3EDe79F04A096B7F",
    "0x6c06959586640De3BcdE69BDcEbF2efDa5d3983B",
    "0x4742FD1862E94dc74AeD62A96B6374E68e658f80",
    "0x64A9fcaD8D299aF9B1a96dA17458c0b3D876b687",
    "0x869a2D3856BE26cfE77cC7Cb6579219d13373Bc9",
    "0x85CCd0c58Fe07DC6716f1EfCcAba0164b97ae66B",
    "0xbFB2C43021629C87b83C97F1FAC8D5f6b1078593",
    "0x76BB80b4F1bA62eD2665f537f605C3593daCc458",
    "0x838Ed804d95044516C16473C91388AE195da0B76",
    "0x34e5EC7DA55039f332949a6d7dB506cD94594E12",
    "0xAD392F2a981bDE60B43eC988a30ce2aE2d755eD2",
    "0xBF3e5530aB7Dcba712E3A7fA99463d46eb6a0c8e",
    "0x0dCb022a9927613f1B4B23F4F893515BA196c5c5",
    "0xB1F9187d9FFCd22fE2c26FeF3E8b8F90C31Ae885",
    "0x40D1e6Fa69957f4c66461b8c8AB60108265F52b2",
       ];


//attach setup
for (i=0; i<challenges.length; i++)
{
    const setupContract = await hre.ethers.getContractAt("Setup", challenges[i]);
    console.log(challenges[i]," is solved? " ,await setupContract.isSolved() );
}
 

  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
