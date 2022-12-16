import BN from "bn.js";
import { Address, contractAddress, toNano } from "ton";
import { TonBet_init } from "./output/sample_TonBet";
import { printAddress, printDeploy, printHeader } from "./utils/print";

(async () => {

    // Parameters
    let owner = Address.parse('kQD6oPnzaaAMRW24R8F0_nlSsJQni0cGHntR027eT9_sgtwt');
    let minBet = toNano('0.1');
    let fee = new BN(5); // 5%
    let init = await TonBet_init(owner, minBet, fee);
    let address = contractAddress({ workchain: 0, initialCode: init.code, initialData: init.data });
    let deployAmount = toNano(1);
    let testnet = true;

    // Print basics
    printHeader('TonBet');
    printAddress(address);
    printDeploy(init, deployAmount, '', testnet);
})();