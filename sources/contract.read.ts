import { Address, fromNano, TonClient4 } from "ton";
import { createExecutorFromRemote } from "ton-nodejs";
import { BetHolder } from "./output/sample_BetHolder";
import { TonBet } from "./output/sample_TonBet";

(async () => {

    // Parameters
    console.log('Preparing...');
    let client = new TonClient4({ endpoint: 'https://testnet-v4.tonhubapi.com' });
    let block = (await client.getLastBlock()).last.seqno;

    console.log('Loading contract data...');
    let executor = await createExecutorFromRemote(client, block, Address.parse('kQBpZr0qXIsKuGdv91Nq9u5WEtSxqg_Oq7tX1WqWlm0g_G6S'));
    let contract = new TonBet(executor);
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

    console.log('Loading participatns data...');
    let participans: Address[] = [];
    participans.push(Address.parse('kQD6oPnzaaAMRW24R8F0_nlSsJQni0cGHntR027eT9_sgtwt'));
    participans.push(Address.parse('EQB74ererQXuWClKBzI-LUHYxBtFbxHlwRb_k67I7TEdmYPL'));
    for (let a of participans) {
        let target = await contract.getParticipantAddress(a);
        console.log('For ' + a.toFriendly({ testOnly: true }));
        console.log('Contract ' + target.toFriendly({ testOnly: true }));
        let holderExecutor = await createExecutorFromRemote(client, block, target);
        let holder = new BetHolder(holderExecutor);
        let ba = await holder.getBalanceA();
        let bb = await holder.getBalanceB();
        console.log('Balance A: ' + fromNano(ba));
        console.log('Balance B: ' + fromNano(bb));
    }

})();