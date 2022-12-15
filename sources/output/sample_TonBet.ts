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
    depends.set('63785', Cell.fromBoc(Buffer.from('te6ccgECJwEAA7kAART/APSkE/S88sgLAQIBYgIDAgLLBAUCASAdHgIBIAYHAgEgDg8CAdQICQIB9AwNAoMcCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAMFRBFW8D+GECkVvgIIIQq8zJPrrjAoIQTKg9yLrjAjDywIKAKCwALCBu8tCAgANAw7UTQ1AH4YvpAAQH6QAEBgQEB1wDUAdCBAQHXANIAMBAlECQQI2wVBdMfAYIQq8zJPrry4IH6APoAWTIQVhBFEDRDAPAXyPhCAcxVQFBUzxZYzxaBAQHPAALIgQEBzwDKAMkBzMntVADO7UTQ1AH4YvpAAQH6QAEBgQEB1wDUAdCBAQHXANIAMBAlECQQI2wVBdMfAYIQTKg9yLry4IHSANIAWTIQVhBFEDRDAPAYyPhCAcxVQFBUzxZYzxaBAQHPAALIgQEBzwDKAMkBzMntVAAVJR/AcoA4HABygCAABzy4IOACASAQEQB/2t/CC3kZgYkmOC+Ae4KYDZyq+Brj+s7zg4QIBBKiSqZCqQQQhn22u7KAJlj6xniwD9AQD9AWSqCYOqkDa2+AhAIBIBITAgEgGBkCASAUFQIBIBYXAOsyHEBygEXygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY41f/AOyHDwDnDwDiRus5V/8A4UzJU0A3DwDuIkbrOVf/AOFMyVNANw8A7icPAOAn/wDgLJWMyWMzMBcPAO4iFus5l/AcoAAfABAcyUcDLKAOLJAfsAgABEcFUgbW1t8BCAARRwIHAFyMwFEDRQVM8WWM8WgQEBzwACyIEBAc8AygDJAczJgAAkEDRfBIAIBIBoaAgEgGxwACQQJF8EgAAUXwSAAST4QW8jMDEmxwXwDyKz8A9QRKBQI6CCCJiWgHD7AiRwgELwEQGACAVgfIAIBICMkAgFIISIAV7dzXaiaGoA/DF9IACA/SAAgMCAgOuAagDoQICA64BpABgIEogSCBG2CvgKQAFeujvaiaGoA/DF9IACA/SAAgMCAgOuAagDoQICA64BpABgIEogSCBG2CvgLQABXrfz2omhqAPwxfSAAgP0gAIDAgIDrgGoA6ECAgOuAaQAYCBKIEggRtgr4CsAAcbu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcEDOdWnnFfnSULAdYW4mR7KAIBZiUmAFeu3vaiaGoA/DF9IACA/SAAgMCAgOuAagDoQICA64BpABgIEogSCBG2CvgJwAAJrof4CUA=', 'base64'))[0]);
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
    
    async send(args: { amount: BN, from?: Address, debug?: boolean }, message: 'Bet A' | 'Bet B' | 'Withdraw' | 'Profit' | WithdrawResponse | 'Team A won' | 'Team B won' | ChangeOwner | 'stop') {
        let body: Cell | null = null;
        if (message === 'Bet A') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Bet B') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Withdraw') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Profit') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawResponse') {
            body = packWithdrawResponse(message);
        }
        if (message === 'Team A won') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Team B won') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
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