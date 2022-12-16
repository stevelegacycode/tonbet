import BN from 'bn.js';
import { toNano } from 'ton';
import { createExecutorFromCode } from 'ton-nodejs';
import { TonBet, TonBet_init } from './output/sample_TonBet';
import { randomAddress } from './utils/randomAddress';

describe('contract', () => {
    it('should deploy correctly', async () => {

        // Create stateinit
        let owner = randomAddress(0, 'some-owner');
        let nonOwner = randomAddress(0, 'some-non-owner');
        let minBet = toNano(10);
        let fee = new BN(5); // 5%
        let init = await TonBet_init(owner, minBet, fee);
        let executor = await createExecutorFromCode(init);
        let contract = new TonBet(executor);

        // Check counter
        // expect((await contract.getCounter()).toString()).toEqual('0');

        // // Increment counter
        // await contract.send({ amount: toNano(1), from: owner }, 'increment');

        // // Check counter
        // expect((await contract.getCounter()).toString()).toEqual('1');

        // // Non-owner
        // await expect(() => contract.send({ amount: toNano(1), from: nonOwner }, 'increment')).rejects.toThrowError('Constraints error');
    });
});