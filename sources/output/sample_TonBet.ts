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
    const __code = 'te6ccgECOgEADPIAART/APSkE/S88sgLAQIBYgIDAgLNHB0CASAEBQIBIAYHAgEgFBUCASAICQIBIAwNAE+0WR2omhqAPwxfSAAgP0AfQB9AGmD6QBpAGkAQICA64AqwDYMjC+EQAgEgCgsAUbBe+1E0NQB+GL6QAEB+gD6APoA0wfSANIA0gCBAQHXAFWAbBkQOF8IgAFGxsLtRNDUAfhi+kABAfoA+gD6ANMH0gDSANIAgQEB1wBVgGwZEChfCIAIBSA4PAFG3c12omhqAPwxfSAAgP0AfQB9AGmD6QBpAGkAQICA64AqwDYMiDwvhEAIBIBARAgOd/BITAEyocO1E0NQB+GL6QAEB+gD6APoA0wfSANIA0gCBAQHXAFWAbBlsgQBMqR3tRNDUAfhi+kABAfoA+gD6ANMH0gDSANIAgQEB1wBVgGwZXwgAWbjgQODg4EYTkZgSIK4gjKExniygDfQEoAn0BLH0BZYPlAGUACWUAQICA54BkwBNs9qJoagD8MX0gAID9AH0AfQBpg+kAaQBpAECAgOuAKsA2DIg0L4RAgEgFhcCASAYGQDJt6PdqJoagD8MX0gAID9AH0AfQBpg+kAaQBpAECAgOuAKsA2DKqENkj8IXwULAFoegIYQQB8lIDACHoHt9D5cDI25HoAZKABuBA4AuRmAogaKCpniyxniwD9ASx9AWUAZLgs+ALAAubd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4UAse6EyiXNrVVIVhSwAWA0E4IGc6tPOK/OkoWA6wtxMj2UE4SJg0M1N0Uhs/cCPfAqjHxMADTtXydqJoagD8MX0gAID9AH0AfQBpg+kAaQBpAECAgOuAKsA2DKqMEOF/+XBBkGF/+XBBuBLHFpFhACkoWE4tkNRBDHRqUogAVIJHC5kR2ZDhAFhOGJDUQQx0alKIAFSCSJhxcUk2EPE2SMAIBxxobAE+mL9qJoagD8MX0gAID9AH0AfQBpg+kAaQBpAECAgOuAKsA2DIgkL4RAE+k5dqJoagD8MX0gAID9AH0AfQBpg+kAaQBpAECAgOuAKsA2DIgsL4RAgFIHh8AR2chwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQgSbO37cCHXScIflTAg1wsf3gLQ0wMBcbDAAZF/kXDiAfpAMFRBFW8D+GECkVvgIIIQz7bXdrrjAiDAACLXScEhsOMCIIIQts9/D7rjAsAAgICEiIwALCBu8tCAgAeww7UTQ1AH4YvpAAQH6APoA+gDTB9IA0gDSAIEBAdcAVYBsGQnTHwGCEM+213a68uCB+kABAfoA+gBVIDMQqxCaEIkQeBBnEFYQRRA0WNs8yPhCAcxVgFCYzxZQBvoCUAT6Alj6AssHygDKABLKAIEBAc8Aye1UJAL2W+1E0NQB+GL6QAEB+gD6APoA0wfSANIA0gCBAQHXAFWAbBlwgEL4QW8jMDFZcFUgbW1tyHEBygEXygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsZ8zMwFwlH8BygCUcAHKAOLjDSFus5l/AcoAAfABAcyUcDLKAOLJAfsANycA9DDtRNDUAfhi+kABAfoA+gD6ANMH0gDSANIAgQEB1wBVgGwZCdMfAYIQts9/D7ry4IH6QAExEIkQeBBnEFYQRRA0QTBVgPhBbyMwMSnHBfLghGwYyPhCAcxVgFCYzxZQBvoCUAT6Alj6AssHygDKABLKAIEBAc8Aye1UA/yPefkBIILw9CGAYW5n9U8TTRTfz5zgmkoMRLdz9sRE0WIpbfZXWbW6js8w7UTQ1AH4YvpAAQH6APoA+gDTB9IA0gDSAIEBAdcAVYBsGX/bPMj4QgHMVYBQmM8WUAb6AlAE+gJY+gLLB8oAygASygCBAQHPAMntVNsx4CCRMOIqKCkBsvhBbyMwMfhC+CglAtD0BDCCAPkpAYAQ9A9vofLgZG3I9ADJQANwIHAFyMwFEDRQVM8WWM8WAfoCWPoCygDJcFnwBccF8uCDEKsQmxCLEHsQaxBbEEsQOxArJQF6cCWOLSLCAFJQsJxbIaiCGOjUpRAAqQSOFzIjsyHCALCcMSGoghjo1KUQAKkEkTDi4pJsIeJwQLuAQm1tbSYBlMhxAcoBF8oAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GfMzMBcJR/AcoAlHABygDi4w0hbrOZfwHKAAHwAQHMlHAyygDiyQH7AFUHNwBOyPhCAcxVgFCYzxZQBvoCUAT6Alj6AssHygDKABLKAIEBAc8Aye1UAuyC8LOH4P27yw1eQ6NZpn3fKYmYmVboZAYoTjrVrqLYW61nuo7PMO1E0NQB+GL6QAEB+gD6APoA0wfSANIA0gCBAQHXAFWAbBlw2zzI+EIBzFWAUJjPFlAG+gJQBPoCWPoCywfKAMoAEsoAgQEBzwDJ7VTbMeAgKisABvLAggH0+EFvIzJVgiOz8uCDCoIQO5rKAKFTBbzy4INTBKiAZKkEoXBSDZQwUXeglzxRZqAGCwfi+EL4KEELAtD0BDCCAPkpAYAQ9A9vofLgZG3I9ADJQANwIHAFyMwFEDRQVM8WWM8WAfoCWPoCygDJcFMh8AVwghA7msoAC3IsAuqC8CULduK5V2/GtMRRKUgwBrAAOgw5tveuQT0Xf040edvKuo7OMO1E0NQB+GL6QAEB+gD6APoA0wfSANIA0gCBAQHXAFWAbBnbPMj4QgHMVYBQmM8WUAb6AlAE+gJY+gLLB8oAygASygCBAQHPAMntVNsx4CAtLgHYERDIWYIQq8zJPlADyx8B+gIB+gLJRWAQSxA/QL/IcQHKARfKAHABygJQBc8WUAP6AnABymgjbrMlbrOxnzMzAXCUfwHKAJRwAcoA4uMNIW6zmX8BygAB8AEBzJRwMsoA4skB+wBeJRA2VSISNwHc+EFvIzIk8uCDAYIQO5rKALzy4IP4QvgoWALQ9AQwggD5KQGAEPQPb6Hy4GRtyPQAyUADcCBwBcjMBRA0UFTPFljPFgH6Alj6AsoAyXBTIfAFcHCAQiezUoDIWYIQTKg9yFADyx/KAMoAyV4jQDQvA+CC8M3GGGE+eCu94risNikHMoBr9pYhzrufxQawRbpNC0Rmuo6jMO1E0NQB+GL6QAEB+gD6APoA0wfSANIA0gCBAQHXAFWAbBngIILwVxSLAb44HiFdxYdyTPOUw50EkY9pFg0I9IwMxYYMmp+64wIgMDEyAZDIcQHKARfKAHABygJQBc8WUAP6AnABymgjbrMlbrOxnzMzAXCUfwHKAJRwAcoA4uMNIW6zmX8BygAB8AEBzJRwMsoA4skB+wA3AuT4QW8jMDEpxwXy4IRTdqAgwgCTcPsCkTDicIEAgvhBbyMwMVlwVSBtbW3IcQHKARfKAHABygJQBc8WUAP6AnABymgjbrMlbrOxnzMzAXCUfwHKAJRwAcoA4uMNIW6zmX8BygAB8AEBzJRwMsoA4skB+wA3MwGeMO1E0NQB+GL6QAEB+gD6APoA0wfSANIA0gCBAQHXAFWAbBl/2zzI+EIBzFWAUJjPFlAG+gJQBPoCWPoCywfKAMoAEsoAgQEBzwDJ7VTbMTQC6oLwBdr4E7WPugebC6oI41OAMROt1HbrLfX1IrcPry//sxC6js8w7UTQ1AH4YvpAAQH6APoA+gDTB9IA0gDSAIEBAdcAVYBsGXDbPMj4QgHMVYBQmM8WUAb6AlAE+gJY+gLLB8oAygASygCBAQHPAMntVNsx4DQ1AFLI+EIBzFWAUJjPFlAG+gJQBPoCWPoCywfKAMoAEsoAgQEBzwDJ7VTbMQF0VYD4QW8jMDEpxwXy4IRbIfLgg7Py4INTQ6AnkSWRJOJwIsIAnTABghjo1KUQAKgBqQSSbCHif3CAQjYBSoLwbzV1rB/2gcjLxQpMwcpvRof52ncCEtbfjP6Ewi2GHZ+64wI5AcL4QW8jMDFZcFUgbW1tyHEBygEXygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsZ8zMwFwlH8BygCUcAHKAOLjDSFus5l/AcoAAfABAcyUcDLKAOLJAfsAEHgQZxBWEEUQNEAzNwHuf5R/AcoAlHABygDiyHCUfwHKAJRwAcoA4nCUfwHKAJRwAcoA4iRus55/lH8BygCUcAHKAOIUzJ40A3CUfwHKAJRwAcoA4uIkbrOef5R/AcoAlHABygDiFMyeNANwlH8BygCUcAHKAOLicJR/AcoAlHABygDiAn84AB6UfwHKAJRwAcoA4gLJWMwAvO1E0NQB+GL6QAEB+gD6APoA0wfSANIA0gCBAQHXAFWAbBn4QW8jMDEpxwXy4IQjs/Lgg380yPhCAcxVgFCYzxZQBvoCUAT6Alj6AssHygDKABLKAIEBAc8Aye1U2zE=';
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
    
    async send(args: { amount: BN, from?: Address, debug?: boolean }, message: 'Bet A' | 'Bet B' | 'Withdraw' | WithdrawResponse | 'Profit' | 'Team A won' | 'Team B won' | null | ChangeOwner | 'stop') {
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawResponse') {
            body = packWithdrawResponse(message);
        }
        if (message === 'Profit') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Team A won') {
            body = beginCell().storeUint(0, 32).storeBuffer(Buffer.from(message)).endCell();
        }
        if (message === 'Team B won') {
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