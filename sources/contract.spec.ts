import BN from 'bn.js';
import { fromNano, toNano } from 'ton';
import { createExecutorFromCode } from 'ton-nodejs';
import { TonBet, TonBet_init } from './output/sample_TonBet';
import { randomAddress } from './utils/randomAddress';

describe('contract', () => {
    it('should deploy correctly', async () => {

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
        await contract.send({ amount: toNano(10), from: playerB  }, 'Bet B');

        // Check balances
        let balanceA = await contract.getBalanceA();
        let balanceB = await contract.getBalanceA();
        expect(fromNano(balanceA)).toBe('8.55');
        expect(fromNano(balanceB)).toBe('8.55');

        // expect((await contract.getCounter()).toString()).toEqual('0');

        // // Increment counter
        // await contract.send({ amount: toNano(1), from: owner }, 'increment');

        // // Check counter
        // expect((await contract.getCounter()).toString()).toEqual('1');

        // // Non-owner
        // await expect(() => contract.send({ amount: toNano(1), from: nonOwner }, 'increment')).rejects.toThrowError('Constraints error');
    });
});