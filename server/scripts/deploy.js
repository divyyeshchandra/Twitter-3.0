const hre = require("hardhat");

async function main(){

  const TwiterContract = await hre.ethers.getContractFactory("TwiterContract");
  const twitercontract = await TwiterContract.deploy();
  console.log("ContractAddress:", twitercontract.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0xCc377107b2fe774FA5c799A8481B0b01F7B3f789
