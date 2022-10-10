const {
    block,
    initBlockchain,
    addBlock,
    validateChainIntegrity,
} = require("./blockchain");

const blockchain = {};
blockchain.chain = initBlockchain();
const chain = blockchain.chain;

addBlock(
    block({
        index: 1,
        timestamp: "010/06/2022",
        data: {
            sender: "Foo",
            recipient: "Bar",
            quantity: 10,
        },
    }),
    chain
);

console.log("chain", chain);
const valid = validateChainIntegrity(chain);
if (!valid) {
    throw new Error("Not valid chain");
} else {
    console.log("Valid chain");
}
