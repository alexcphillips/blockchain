const SHA256 = require("crypto-js/sha256");

function block(opts) {
    const result = opts;
    result.hash = generateHash(opts);
    return result;
}

function initBlockchain() {
    const blockchain = [createGenesisBlock()];
    return blockchain;
}

function generateHash(opts) {
    const { index, timestamp, data, previousHash } = opts;
    return SHA256(
        index + timestamp + previousHash + JSON.stringify(data)
    ).toString();
}

function addBlock(newBlock, chain) {
    newBlock.previousHash = getLatestBlock(chain).hash;
    newBlock.hash = generateHash(newBlock);
    chain.push(newBlock);
}

function getLatestBlock(blockchain) {
    return blockchain[blockchain.length - 1];
}

function createGenesisBlock() {
    return block({
        index: 0,
        timestamp: new Date(),
        data: "First block",
        previousHash: "0",
    });
}

function validateChainIntegrity(chain) {
    // Declare i with value of 1 to skip index of genesis block
    for (let i = 1; i < chain.length; i++) {
        const currentBlock = chain[i];
        const previousBlock = chain[i - 1];

        return currentBlock.hash !== generateHash(currentBlock) ||
            currentBlock.previousHash !== previousBlock.hash
            ? false
            : true;
    }
}

module.exports = {
    block,
    initBlockchain,
    addBlock,
    validateChainIntegrity,
};
