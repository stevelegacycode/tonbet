import { Address, fromNano, TonClient4 } from "ton";
import { createExecutorFromRemote } from "ton-nodejs";
import { TonBet } from "./output/sample_TonBet";

(async () => {

    // Parameters
    let client = new TonClient4({ endpoint: 'https://testnet-v4.tonhubapi.com' });
    let block = (await client.getLastBlock()).last.seqno;
    let executor = await createExecutorFromRemote(client, block, Address.parse('kQCT6ax16GRuFFlGyYIZbwma5qQGbCQGIobDEliuO81rPT37'));
    let contract = new TonBet(executor);

    // Print basics
    let balanceA = await contract.getBalanceA();
    let balanceB = await contract.getBalanceB();
    let owner = await contract.getOwner();
    let minBet = await contract.getMinBet();
    let fee = await contract.getFee();
    let stopped = await contract.getStopped();
    let completed = await contract.getCompleted();
    console.log('Completed: ' + completed);
    console.log('Stopped: ' + stopped);
    console.log('Owner: ' + owner.toFriendly({ testOnly: true }));
    console.log('Fee: ' + fee.toNumber() + '%');
    console.log('Balance A: ' + fromNano(balanceA));
    console.log('Balance B: ' + fromNano(balanceB));
    console.log('Min Bet: ' + fromNano(minBet));

})();