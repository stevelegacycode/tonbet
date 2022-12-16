import BN from 'bn.js';
import { fromNano, toNano } from 'ton';
import { createExecutorFromCode } from 'ton-nodejs';
import { BetHolder, BetHolder_init } from './output/sample_BetHolder';
import { TonBet, TonBet_init } from './output/sample_TonBet';
import { randomAddress } from './utils/randomAddress';

describe('contract', () => {
    it('should deploy and accept bets on master', async () => {

        // Create stateinit
        let owner = randomAddress(0, 'some-owner');
        let playerA = randomAddress(0, 'player-a');
        let playerB = randomAddress(0, 'player-b');
        let minBet = toNano(0.1);
        let fee = new BN(5); // 5%
        let init = await TonBet_init(owner, minBet, fee);
        let executor = await createExecutorFromCode(init);
        let contract = new TonBet(executor);

        // Send first bets
        await contract.send({ amount: toNano(10), from: playerA }, 'Bet A');
        await contract.send({ amount: toNano(10), from: playerB }, 'Bet B');

        // Check balances
        let balanceA = await contract.getBalanceA();
        let balanceB = await contract.getBalanceA();
        expect(fromNano(balanceA)).toBe('8.55');
        expect(fromNano(balanceB)).toBe('8.55');
    });

    it('should deploy and accept bets on holder', async () => {

        let master = randomAddress(0, 'master');
        let playerA = randomAddress(0, 'player-a');
        let playerB = randomAddress(0, 'player-b');
        let init = await BetHolder_init(master, playerA);
        let executor = await createExecutorFromCode(init);
        let contract = new BetHolder(executor);

        // Send first bets
        await contract.send({ amount: toNano(10), from: master }, { $$type: 'TopUp', valueA: toNano(10), valueB: toNano(0) });
        await contract.getBalanceA();
        await contract.getBalanceB();
    });
});