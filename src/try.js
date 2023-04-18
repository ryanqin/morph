const ethers = require("ethers");

const abi = require("../src/utils/zk/autoabi.json");

const watchEvent = () =>{
    let provider = new ethers.providers.WebSocketProvider("wss://sepolia.infura.io/ws/v3/66bdab690554486092111f634a9e891c");
    let contractAddress = "0xd0F723c6b2226dF56Fe41E63b9eAA66Eb540BcB8";
    let contract = new ethers.Contract(contractAddress, abi, provider);

    contract.on("Auto", (srcBlockNum, target, payload, isTriggered, event) => {

        console.log(srcBlockNum);

        console.log(target);

        console.log(payload);

        console.log(isTriggered);

        console.log(event)

    });
}

watchEvent();