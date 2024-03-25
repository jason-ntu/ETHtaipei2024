async function main() {
    const CCR = await ethers.getContractFactory("ccr");
    const ccr = await CCR.deploy();
    await ccr.deployed();
    console.log("CCR contract deployed to address:", ccr.address);

    const CCM = await ethers.getContractFactory("ccm");
    const ccm = await CCM.deploy();
    await ccm.deployed();
    console.log("CCM contract deployed to address:", ccm.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });