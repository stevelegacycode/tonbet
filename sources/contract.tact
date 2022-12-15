import "@stdlib/ownable";
import "@stdlib/stoppable";

message TopUp {
    valueA: Int as coins;
    valueB: Int as coins;
}

message Withdraw {
    wonA: Bool;
    wonB: Bool;
}

message WithdrawResponse {
    owner: Address;
    valueA: Int as coins;
    valueB: Int as coins;
}

contract BetHolder with Ownable {
    owner: Address;
    master: Address;
    balanceA: Int;
    balanceB: Int;
    completed: Bool;

    init(master: Address, owner: Address) {
        self.owner = owner;
        self.master = master;
        self.balanceA = 0;
        self.balanceB = 0;
        self.completed = false;
    }

    receive(msg: TopUp) {

        // Allow only master
        let ctx: Context = context();
        require(ctx.sender == self.master);

        // Allow only once
        require(!self.completed);

        // Update balance
        self.balanceA = self.balanceA + msg.valueA;
        self.balanceB = self.balanceB + msg.valueB;

        // Keep something for storage
        nativeReserve(10000000, 0);

        // Send cashback to owner
        simpleSend(self.owner, 0, 64 + 2); // Remaining value + ignore errors (not recoverable anyway)
    }

    receive(msg: Withdraw) {

        // Allow only master
        let ctx: Context = context();
        require(ctx.sender == self.master);

        // Update state
        let balanceA: Int = 0;
        let balanceB: Int = 0;
        if (!self.completed) {
            balanceA = self.balanceA;
            balanceB = self.balanceB;
            self.completed = true;
        }

        // Send response to master
        send(SendParameters{
            value: 0, 
            to: self.master, 
            mode: 128 + 2, // Remaining BALANCE + ignore errors (not recoverable anyway)
            bounce: false,
            body: abi.pack_cell(WithdrawResponse{
                valueA: balanceA,
                valueB: balanceB,
                owner: self.owner
            })
        });
    }

    get fun master(): Address {
        return self.master;
    }

    get fun balanceA(): Int {
        return self.balanceA;
    }

    get fun balanceB(): Int {
        return self.balanceA;
    }
}

contract TonBet with OwnableTransferable, Stoppable {

    owner: Address;
    balanceA: Int as coins;
    balanceB: Int as coins;
    minBet: Int as coins;
    fee: Int as uint8;
    stopped: Bool;
    completed: Bool;
    teamAwon: Bool;
    wonPPT: Int;

    init(owner: Address, minBet: Int, fee: Int) {
        self.owner = owner;
        self.balanceA = 0;
        self.balanceB = 0;
        self.minBet = minBet;
        self.fee = fee;
        self.stopped = false;
        self.completed = false;
        self.teamAwon = false;
        self.wonPPT = 0;
    }

    fun acceptBet(isA: Bool) {

        // Must not be stopped
        self.requireNotStopped();

        // Check mininum bet
        let ctx: Context = context();
        require(ctx.value > self.minBet);

        // Calculate value
        let workingValue: Int = ctx.value - 1000000000; // 1 TON
        let value: Int = workingValue - (workingValue * self.fee / 100);

        // Update balances
        let topUpA: Int = 0;
        let topUpB: Int = 0;
        if (isA) {
            self.balanceA = self.balanceA + value;
            topUpA = value;
        } else {
            self.balanceB = self.balanceB + value;
            topUpB = value;
        }

        // Request balances from holder
        let holderInit: StateInit = initOf BetHolder(myAddress(), ctx.sender);
        let holderAddress: Address = contractAddress(0, holderInit.code, holderInit.data);
        send(SendParameters{
            value: 1000000000, // 1 TON 
            to: holderAddress, 
            mode: 64 + 2, // Remaining value + ignore errors (not recoverable anyway)
            bounce: false,
            body: abi.pack_cell(TopUp{
                valueA: topUpA,
                valueB: topUpB
            })
        });
    }

    fun teamWon(isA: Bool) {

        // Checks
        let ctx: Context = context();
        self.requireOwner();
        require(!self.completed);

        // Calculate balances
        let total: Int = self.balanceA + self.balanceB;
        let wonBalance: Int = 0;
        let lostBalance: Int = 0;
        if (isA) {
            wonBalance = self.balanceA;
            lostBalance = self.balanceB;
        } else {
            wonBalance = self.balanceB;
            lostBalance = self.balanceA;
        }

        // Calculate PPT
        let wonPPT: Int = 0;
        if (total > 0) {
            wonPPT = total * 1000000000000 / wonBalance;
        }
        self.wonPPT = wonPPT;

        // Send response
        simpleReply(0, 64 + 2); // Remaining value + ignore errors (not recoverable anyway)
    }

    //
    // Receivers
    //

    receive("Bet A") {
        self.acceptBet(true);
    }

    receive("Bet B") {
        self.acceptBet(false);
    }

    receive("Withdraw") {

        // Must be completed
        let ctx: Context = context();
        require(self.completed);
        require(ctx.value > 1000000000); // 1 TON

        // Request from holder
        let holderInit: StateInit = initOf BetHolder(myAddress(), ctx.sender);
        let holderAddress: Address = contractAddress(0, holderInit.code, holderInit.data);
        send(SendParameters{
            value: 0, 
            to: holderAddress, 
            mode: 64 + 2, // Renaining value + ignore errors (not recoverable anyway)
            bounce: false,
            body: abi.pack_cell(Withdraw{
                wonA: self.teamAwon,
                wonB: !self.teamAwon
            })
        });
    }

    receive("Profit") {
        
        // Only onwer
        self.requireOwner();
        
        // Detect locked values
        let locked: Int = self.balanceA + self.balanceB;
        if (locked > 0) {
            nativeReserve(locked, 0);
        }

        // Send response
        simpleReply(0, 128 + 2); // Remaining balance + ignore errors (not recoverable anyway)
    }

    receive(msg: WithdrawResponse) {

        // Check source
        let ctx: Context = context();
        let holderInit: StateInit = initOf BetHolder(myAddress(), msg.owner);
        let holderAddress: Address = contractAddress(0, holderInit.code, holderInit.data);
        require(ctx.sender == holderAddress);

        // Calculate value
        let value: Int = 0;
        if (self.teamAwon && msg.valueA > 0) {
            value = (msg.valueA * self.wonPPT) / 1000000000000;
        } else if (!self.teamAwon && msg.valueB > 0) {
            value = (msg.valueB * self.wonPPT) / 1000000000000;
        }

        // Send value
        send(SendParameters{
            value: 0, 
            to: msg.owner, 
            mode: 64 + 2, // Renaining value + ignore errors (not recoverable anyway)
            bounce: false
        });
    }

    receive("Team A won") {
        self.teamWon(true);
    }

    receive("Team B won") {
        self.teamWon(false);
    }

    //
    // Getters
    //

    get fun completed(): Bool {
        return self.completed;
    }

    get fun minBet(): Int {
        return self.minBet;
    }

    get fun fee(): Int {
        return self.fee;
    }

    get fun balanceA(): Int {
        return self.balanceA;
    }

    get fun balanceB(): Int {
        return self.balanceB;
    }
}

fun simpleReply(value: Int, mode: Int) {
    let ctx: Context = context();
    simpleSend(ctx.sender, value, mode);
}

fun simpleSend(to: Address, value: Int, mode: Int) {
    send(SendParameters{
        value: value, 
        to: to, 
        mode: mode,
        bounce: false
    });
}