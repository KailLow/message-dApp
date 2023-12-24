 
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.001");

  //const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  //const chatApp = await ChatApp.deploy();
  const chatApp = await hre.ethers.deployContract("ChatApp");

  await chatApp.waitForDeployment();

  console.log(
    `Contract address:  ${chatApp.target}`
  );

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${chatApp.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
