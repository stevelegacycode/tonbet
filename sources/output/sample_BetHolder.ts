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
export async function BetHolder_init(master: Address, owner: Address) {
    const __code = 'te6ccgECFwEAA48AART/APSkE/S88sgLAQIBYgIDAgLPBAUCASANDgLxHAh10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QDBUQRVvA/hhApFb4CCCEKvMyT66jrYw7UTQ1AH4YvpAAQH6QAEB+gD6ANIAVUBsFQXTHwGCEKvMyT668uCB+gD6AFkyEFYQRRA0QwDgghBMqD3IuuMCMPLAgoAYHAAsIG7y0ICAC5PhBbyMwMSbHBfLggyKz8uCDUESgUCOgggiYloBw+wIkcIBCcFUgbW1tyHEBygEXygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsZ8zMwFwlH8BygCUcAHKAOLjDSFus5l/AcoAAfABAcyUcDLKAOLJAfsAAQsIAaDtRNDUAfhi+kABAfpAAQH6APoA0gBVQGwVBdMfAYIQTKg9yLry4IHSANIAWTIQVhBFEDRDANs8yPhCAcxVQFBUzxZYzxYB+gJY+gLKAMntVAkAMsj4QgHMVUBQVM8WWM8WAfoCWPoCygDJ7VQBfFv4QW8jMDEkxwXy4INwUwGzlV8DXH9Z3nBwgQCCVElUyFUgghDPttd2UATLH1jPFgH6AgH6AslUEwdVIG1tCgGQyHEBygEXygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsZ8zMwFwlH8BygCUcAHKAOLjDSFus5l/AcoAAfABAcyUcDLKAOLJAfsACwHuf5R/AcoAlHABygDiyHCUfwHKAJRwAcoA4nCUfwHKAJRwAcoA4iRus55/lH8BygCUcAHKAOIUzJ40A3CUfwHKAJRwAcoA4uIkbrOef5R/AcoAlHABygDiFMyeNANwlH8BygCUcAHKAOLicJR/AcoAlHABygDiAn8MAB6UfwHKAJRwAcoA4gLJWMwCAVgPEAIBIBMUAgFIERIAP7dzXaiaGoA/DF9IACA/SAAgP0AfQBpACqgNgqIEi+CQADuujvaiaGoA/DF9IACA/SAAgP0AfQBpACqgNgqvgkAAP6389qJoagD8MX0gAID9IACA/QB9AGkAKqA2CogSL4JAAHG7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnBAznVp5xX50lCwHWFuJkeygCAWYVFgA/rt72omhqAPwxfSAAgP0gAID9AH0AaQAqoDYKiBovgkAAN66HuBA4AuRmAogaKCpniyxniwD9ASx9AWUAZMA=';
    const depends = new Map<string, Cell>();
    let systemCell = beginCell().storeDict(null).endCell();
    let __stack: StackItem[] = [];
    __stack.push({ type: 'cell', cell: systemCell });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(master).endCell() });
    __stack.push({ type: 'slice', cell: beginCell().storeAddress(owner).endCell() });
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let executor = await createExecutorFromCode({ code: codeCell, data: new Cell() });
    let res = await executor.get('init_BetHolder', __stack, { debug: true });
    if (res.debugLogs.length > 0) { console.warn(res.debugLogs); }
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

export const BetHolder_errors: { [key: string]: string } = {
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

export class BetHolder {
    readonly executor: ContractExecutor; 
    constructor(executor: ContractExecutor) { this.executor = executor; } 
    
    async send(args: { amount: BN, from?: Address, debug?: boolean }, message: TopUp | Withdraw) {
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TopUp') {
            body = packTopUp(message);
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = packWithdraw(message);
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
                if (BetHolder_errors[e.exitCode.toString()]) {
                    throw new Error(BetHolder_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
    async getMaster() {
        try {
            let __stack: StackItem[] = [];
            let result = await this.executor.get('master', __stack, { debug: true });
            if (result.debugLogs.length > 0) { console.warn(result.debugLogs); }
            return result.stack.readAddress();
        } catch (e) {
            if (e instanceof ExecuteError) {
                if (e.debugLogs.length > 0) { console.warn(e.debugLogs); }
                if (BetHolder_errors[e.exitCode.toString()]) {
                    throw new Error(BetHolder_errors[e.exitCode.toString()]);
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
                if (BetHolder_errors[e.exitCode.toString()]) {
                    throw new Error(BetHolder_errors[e.exitCode.toString()]);
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
                if (BetHolder_errors[e.exitCode.toString()]) {
                    throw new Error(BetHolder_errors[e.exitCode.toString()]);
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
                if (BetHolder_errors[e.exitCode.toString()]) {
                    throw new Error(BetHolder_errors[e.exitCode.toString()]);
                }
            }
            throw e;
        }
    }
}