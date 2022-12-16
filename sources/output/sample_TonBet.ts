import { Cell, Slice, StackItem, Address, Builder, InternalMessage, CommonMessageInfo, CellMessage, beginCell, serializeDict, TupleSlice4 } from 'ton';
import { ContractExecutor, createExecutorFromCode, ExecuteError } from 'ton-nodejs';
import BN from 'bn.js';

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: BN;
    mode: BN;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function packSendParameters(src: SendParameters): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounce);
    b_0 = b_0.storeAddress(src.to);
    b_0 = b_0.storeInt(src.value, 257);
    b_0 = b_0.storeInt(src.mode, 257);
    if (src.body !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.body);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.code !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.code);
    } else {
        b_0 = b_0.storeBit(false);
    }
    if (src.data !== null) {
        b_0 = b_0.storeBit(true);
        b_0 = b_0.storeRef(src.data);
    } else {
        b_0 = b_0.storeBit(false);
    }
    return b_0.endCell();
}

export function packStackSendParameters(src: SendParameters, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.bounce ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.to).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'int', value: src.mode });
    if (src.body !== null) {
        __stack.push({ type: 'cell', cell: src.body });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.code !== null) {
        __stack.push({ type: 'cell', cell: src.code });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.data !== null) {
        __stack.push({ type: 'cell', cell: src.data });
    } else {
        __stack.push({ type: 'null' });
    }
}

export function packTupleSendParameters(src: SendParameters): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.bounce ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.to).endCell() });
    __stack.push({ type: 'int', value: src.value });
    __stack.push({ type: 'int', value: src.mode });
    if (src.body !== null) {
        __stack.push({ type: 'cell', cell: src.body });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.code !== null) {
        __stack.push({ type: 'cell', cell: src.code });
    } else {
        __stack.push({ type: 'null' });
    }
    if (src.data !== null) {
        __stack.push({ type: 'cell', cell: src.data });
    } else {
        __stack.push({ type: 'null' });
    }
    return __stack;
}

export function unpackStackSendParameters(slice: TupleSlice4): SendParameters {
    const bounce = slice.readBoolean();
    const to = slice.readAddress();
    const value = slice.readBigNumber();
    const mode = slice.readBigNumber();
    const body = slice.readCellOpt();
    const code = slice.readCellOpt();
    const data = slice.readCellOpt();
    return { $$type: 'SendParameters', bounce: bounce, to: to, value: value, mode: mode, body: body, code: code, data: data };
}
export function unpackTupleSendParameters(slice: TupleSlice4): SendParameters {
    const bounce = slice.readBoolean();
    const to = slice.readAddress();
    const value = slice.readBigNumber();
    const mode = slice.readBigNumber();
    const body = slice.readCellOpt();
    const code = slice.readCellOpt();
    const data = slice.readCellOpt();
    return { $$type: 'SendParameters', bounce: bounce, to: to, value: value, mode: mode, body: body, code: code, data: data };
}
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: BN;
}

export function packContext(src: Context): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeBit(src.bounced);
    b_0 = b_0.storeAddress(src.sender);
    b_0 = b_0.storeInt(src.value, 257);
    return b_0.endCell();
}

export function packStackContext(src: Context, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.bounced ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.sender).endCell() });
    __stack.push({ type: 'int', value: src.value });
}

export function packTupleContext(src: Context): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.bounced ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.sender).endCell() });
    __stack.push({ type: 'int', value: src.value });
    return __stack;
}

export function unpackStackContext(slice: TupleSlice4): Context {
    const bounced = slice.readBoolean();
    const sender = slice.readAddress();
    const value = slice.readBigNumber();
    return { $$type: 'Context', bounced: bounced, sender: sender, value: value };
}
export function unpackTupleContext(slice: TupleSlice4): Context {
    const bounced = slice.readBoolean();
    const sender = slice.readAddress();
    const value = slice.readBigNumber();
    return { $$type: 'Context', bounced: bounced, sender: sender, value: value };
}
export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function packStateInit(src: StateInit): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeRef(src.code);
    b_0 = b_0.storeRef(src.data);
    return b_0.endCell();
}

export function packStackStateInit(src: StateInit, __stack: StackItem[]) {
    __stack.push({ type: 'cell', cell: src.code });
    __stack.push({ type: 'cell', cell: src.data });
}

export function packTupleStateInit(src: StateInit): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'cell', cell: src.code });
    __stack.push({ type: 'cell', cell: src.data });
    return __stack;
}

export function unpackStackStateInit(slice: TupleSlice4): StateInit {
    const code = slice.readCell();
    const data = slice.readCell();
    return { $$type: 'StateInit', code: code, data: data };
}
export function unpackTupleStateInit(slice: TupleSlice4): StateInit {
    const code = slice.readCell();
    const data = slice.readCell();
    return { $$type: 'StateInit', code: code, data: data };
}
export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function packChangeOwner(src: ChangeOwner): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(3067051791, 32);
    b_0 = b_0.storeAddress(src.newOwner);
    return b_0.endCell();
}

export function packStackChangeOwner(src: ChangeOwner, __stack: StackItem[]) {
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.newOwner).endCell() });
}

export function packTupleChangeOwner(src: ChangeOwner): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.newOwner).endCell() });
    return __stack;
}

export function unpackStackChangeOwner(slice: TupleSlice4): ChangeOwner {
    const newOwner = slice.readAddress();
    return { $$type: 'ChangeOwner', newOwner: newOwner };
}
export function unpackTupleChangeOwner(slice: TupleSlice4): ChangeOwner {
    const newOwner = slice.readAddress();
    return { $$type: 'ChangeOwner', newOwner: newOwner };
}
export type TopUp = {
    $$type: 'TopUp';
    valueA: BN;
    valueB: BN;
}

export function packTopUp(src: TopUp): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(2882324798, 32);
    b_0 = b_0.storeCoins(src.valueA);
    b_0 = b_0.storeCoins(src.valueB);
    return b_0.endCell();
}

export function packStackTopUp(src: TopUp, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.valueA });
    __stack.push({ type: 'int', value: src.valueB });
}

export function packTupleTopUp(src: TopUp): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.valueA });
    __stack.push({ type: 'int', value: src.valueB });
    return __stack;
}

export function unpackStackTopUp(slice: TupleSlice4): TopUp {
    const valueA = slice.readBigNumber();
    const valueB = slice.readBigNumber();
    return { $$type: 'TopUp', valueA: valueA, valueB: valueB };
}
export function unpackTupleTopUp(slice: TupleSlice4): TopUp {
    const valueA = slice.readBigNumber();
    const valueB = slice.readBigNumber();
    return { $$type: 'TopUp', valueA: valueA, valueB: valueB };
}
export type Withdraw = {
    $$type: 'Withdraw';
    wonA: boolean;
    wonB: boolean;
}

export function packWithdraw(src: Withdraw): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(1286094280, 32);
    b_0 = b_0.storeBit(src.wonA);
    b_0 = b_0.storeBit(src.wonB);
    return b_0.endCell();
}

export function packStackWithdraw(src: Withdraw, __stack: StackItem[]) {
    __stack.push({ type: 'int', value: src.wonA ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'int', value: src.wonB ? new BN(-1) : new BN(0) });
}

export function packTupleWithdraw(src: Withdraw): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'int', value: src.wonA ? new BN(-1) : new BN(0) });
    __stack.push({ type: 'int', value: src.wonB ? new BN(-1) : new BN(0) });
    return __stack;
}

export function unpackStackWithdraw(slice: TupleSlice4): Withdraw {
    const wonA = slice.readBoolean();
    const wonB = slice.readBoolean();
    return { $$type: 'Withdraw', wonA: wonA, wonB: wonB };
}
export function unpackTupleWithdraw(slice: TupleSlice4): Withdraw {
    const wonA = slice.readBoolean();
    const wonB = slice.readBoolean();
    return { $$type: 'Withdraw', wonA: wonA, wonB: wonB };
}
export type WithdrawResponse = {
    $$type: 'WithdrawResponse';
    owner: Address;
    valueA: BN;
    valueB: BN;
}

export function packWithdrawResponse(src: WithdrawResponse): Cell {
    let b_0 = new Builder();
    b_0 = b_0.storeUint(3484866422, 32);
    b_0 = b_0.storeAddress(src.owner);
    b_0 = b_0.storeCoins(src.valueA);
    b_0 = b_0.storeCoins(src.valueB);
    return b_0.endCell();
}

export function packStackWithdrawResponse(src: WithdrawResponse, __stack: StackItem[]) {
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.owner).endCell() });
    __stack.push({ type: 'int', value: src.valueA });
    __stack.push({ type: 'int', value: src.valueB });
}

export function packTupleWithdrawResponse(src: WithdrawResponse): StackItem[] {
    let __stack: StackItem[] = [];
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(src.owner).endCell() });
    __stack.push({ type: 'int', value: src.valueA });
    __stack.push({ type: 'int', value: src.valueB });
    return __stack;
}

export function unpackStackWithdrawResponse(slice: TupleSlice4): WithdrawResponse {
    const owner = slice.readAddress();
    const valueA = slice.readBigNumber();
    const valueB = slice.readBigNumber();
    return { $$type: 'WithdrawResponse', owner: owner, valueA: valueA, valueB: valueB };
}
export function unpackTupleWithdrawResponse(slice: TupleSlice4): WithdrawResponse {
    const owner = slice.readAddress();
    const valueA = slice.readBigNumber();
    const valueB = slice.readBigNumber();
    return { $$type: 'WithdrawResponse', owner: owner, valueA: valueA, valueB: valueB };
}
export async function TonBet_init(owner: Address, minBet: BN, fee: BN) {
    const __code = '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';
    const depends = new Map<string, Cell>();
    depends.set('63785', Cell.fromBoc(Buffer.from('te6ccgECGQEAA7QAART/APSkE/S88sgLAQIBYgIDAgLPBAUCASANDgLxHAh10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QDBUQRVvA/hhApFb4CCCEKvMyT66jrYw7UTQ1AH4YvpAAQH6QAEB+gD6ANIAVUBsFQXTHwGCEKvMyT668uCB+gD6AFkyEFYQRRA0QwDgghBMqD3IuuMCMPLAgoAYHAAsIG7y0ICAC5vhBbyMwMSbHBfLggyKz8uCDUESgUCOgggiYloBw+wIkcIEAgnBVIG1tbchxAcoBF8oAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GfMzMBcJR/AcoAlHABygDi4w0hbrOZfwHKAAHwAQHMlHAyygDiyQH7AAELCAGg7UTQ1AH4YvpAAQH6QAEB+gD6ANIAVUBsFQXTHwGCEEyoPci68uCB0gDSAFkyEFYQRRA0QwDbPMj4QgHMVUBQVM8WWM8WAfoCWPoCygDJ7VQJADLI+EIBzFVAUFTPFljPFgH6Alj6AsoAye1UAXxb+EFvIzAxJMcF8uCDcFMBs5VfA1x/Wd5wcIEAglRJVMhVIIIQz7bXdlAEyx9YzxYB+gIB+gLJVBMHVSBtbQoBkMhxAcoBF8oAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GfMzMBcJR/AcoAlHABygDi4w0hbrOZfwHKAAHwAQHMlHAyygDiyQH7AAsB7n+UfwHKAJRwAcoA4shwlH8BygCUcAHKAOJwlH8BygCUcAHKAOIkbrOef5R/AcoAlHABygDiFMyeNANwlH8BygCUcAHKAOLiJG6znn+UfwHKAJRwAcoA4hTMnjQDcJR/AcoAlHABygDi4nCUfwHKAJRwAcoA4gJ/DAAelH8BygCUcAHKAOICyVjMAgEgDxACASAVFgA7u2wu1E0NQB+GL6QAEB+kABAfoA+gDSAFVAbBVsQYAgEgERICAUgTFAA/t3NdqJoagD8MX0gAID9IACA/QB9AGkAKqA2CogSL4JAAO66O9qJoagD8MX0gAID9IACA/QB9AGkAKqA2Cq+CQAA9rfz2omhqAPwxfSAAgP0gAID9AH0AaQAqoDYKii+CQABxu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwQM51aecV+dJQsB1hbiZHsoAgFmFxgAP67e9qJoagD8MX0gAID9IACA/QB9AGkAKqA2CogaL4JAADeuh7gQOALkZgKIGigqZ4ssZ4sA/QEsfQFlAGTA', 'base64'))[0]);
    let systemCell = beginCell().storeDict(serializeDict(depends, 16, (src, v) => v.refs.push(src))).endCell();
    let __stack: StackItem[] = [];
    __stack.push({ type: 'cell', cell: systemCell });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(owner).endCell() });
    __stack.push({ type: 'int', value: minBet });
    __stack.push({ type: 'int', value: fee });
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let executor = await createExecutorFromCode({ code: codeCell, data: new Cell() });
    let res = await executor.get('init_TonBet', __stack, { debug: true });
    if (res.debugLogs.length > 0) { console.warn(res.debugLogs); }
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

export const TonBet_errors: { [key: string]: string } = {
    '2': `Stack undeflow`,
    '3': `Stack overflow`,
    '4': `Integer overflow`,
    '5': `Integer out of expected range`,
    '6': `Invalid opcode`,
    '7': `Type check error`,
    '8': `Cell overflow`,
    '9': `Cell underflow`,
    '10': `Dictionary error`,
    '13': `Out of gas error`,
    '32': `Method ID not found`,
    '34': `Action is invalid or not supported`,
    '37': `Not enough TON`,
    '38': `Not enough extra-currencies`,
    '128': `Null reference exception`,
    '129': `Invalid serialization prefix`,
    '130': `Invalid incoming message`,
    '131': `Constraints error`,
    '132': `Access denied`,
    '133': `Contract stopped`,
}

export class TonBet {
    readonly executor: ContractExecutor; 
    constructor(executor: ContractExecutor) { this.executor = executor; } 
    
    async send(args: { amount: BN, from?: Address, debug?: boolean }, message: 'Bet A' | 'Argentina' | 'Bet B' | 'France' | 'Withdraw' | WithdrawResponse | 'Profit' | 'Team A won' | 'Argentina won' | 'Team B won' | 'France won' | null | ChangeOwner | 'stop') {
        let body: Cell | null = null;
        if (message === 'Bet A') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Argentina') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Bet B') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'France') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Withdraw') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawResponse') {
            body = packWithdrawResponse(message);
        }
        if (message === 'Profit') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Team A won') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Argentina won') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Team B won') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'France won') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = packChangeOwner(message);
        }
        if (message === 'stop') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        try {
            let r = await this.executor.internal(new InternalMessage({
                to: this.executor.address,
                from: args.from || this.executor.address,
                bounce: false,
                value: args.amount,
                body: new CommonMessageInfo({
                    body: new CellMessage(body!)
                })
            }), { debug: args.debug });
            if (r.debugLogs.length > 0) { console.warn(r.debugLogs); }
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getCompleted() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('completed', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBoolean();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getTeamAWon() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('teamAWon', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBoolean();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getWonPpt() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('wonPPT', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBigNumber();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getWon(valueA: BN, valueB: BN) {
        try {
            let __stack: StackItem[] = [];
            __stack.push({ type: 'int', value: valueA });
            __stack.push({ type: 'int', value: valueB });
            let result = await this.executor.get('won', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBigNumber();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getMinBet() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('minBet', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBigNumber();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getFee() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('fee', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBigNumber();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getBalanceA() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('balanceA', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBigNumber();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getBalanceB() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('balanceB', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBigNumber();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getParticipantAddress(owner: Address) {
        try {
            let __stack: StackItem[] = [];
            __stack.push({ type: 'slice', cell: beginCell().storeAddress(owner).endCell() });
            let result = await this.executor.get('participantAddress', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readAddress();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getOwner() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('owner', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readAddress();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getStopped() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('stopped', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readBoolean();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (TonBet_errors[e.exitCode.toString()]) {
                    throw new Error(TonBet_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
}