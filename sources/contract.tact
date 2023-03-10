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
    balanceA: Int as coins;
    balanceB: Int as coins;
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

        // Allow only when not completed
        require(!self.completed);

        // Update balance
        self.balanceA = self.balanceA + msg.valueA;
        self.balanceB = self.balanceB + msg.valueB;

        // Keep something for storage
        nativeReserve(10000000, 0);

        // Send cashback to owner
        simpleSend(self.owner, 0, 128 + 2); // Remaining balance + ignore errors (not recoverable anyway)
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

    get fun completed(): Bool {
        return self.completed;
    }

    get fun master(): Address {
        return self.master;
    }

    get fun balanceA(): Int {
        return self.balanceA;
    }

    get fun balanceB(): Int {
        return self.balanceB;
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

        // Get context
        let ctx: Context = context();

        // Must not be stopped
        self.requireNotStopped();

        // Calculate and check bet size
        let workingValue: Int = ctx.value - 1000000000; // 1 TON
        require(workingValue > self.minBet);

        // Calculate fee
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
            mode: 2, // Remaining value + ignore errors (not recoverable anyway)
            bounce: false,
            code: holderInit.code,
            data: holderInit.data,
            body: abi.pack_cell(TopUp{
                valueA: topUpA,
                valueB: topUpB
            })
        });
    }

    fun teamWon(isA: Bool) {

        // Checks
        let ctx: Context = context();
        self.requireOwner(); // Only onwer can decide
        require(self.stopped); // Must be stopped
        require(!self.completed); // Must not be completed

        // Calculate balances
        let total: Int = self.balanceA + self.balanceB;
        let wonBalance: Int = 0;
        let lostBalance: Int = 0;
        if (isA) {
            wonBalance = self.balanceA;
            lostBalance = self.balanceB;
            self.balanceA = total;
            self.balanceB = 0;
        } else {
            wonBalance = self.balanceB;
            lostBalance = self.balanceA;
            self.balanceA = 0;
            self.balanceB = total;
        }

        // Calculate PPT
        let wonPPT: Int = 0;
        if (total > 0) {
            wonPPT = total * 1000000000000 / wonBalance;
        }
        self.wonPPT = wonPPT;

        // Update state
        self.teamAwon = isA;
        self.completed = true;

        // Send response
        simpleReply(0, 64 + 2); // Remaining value + ignore errors (not recoverable anyway)
    }

    fun resolveWonAmount(valueA: Int, valueB: Int): Int {
        let value: Int = 0;
        if (self.completed) {
            if (self.teamAwon && valueA > 0) {
                value = (valueA * self.wonPPT) / 1000000000000;
            } else if (!self.teamAwon && valueB > 0) {
                value = (valueB * self.wonPPT) / 1000000000000;
            }
        }
        return value;
    }

    //
    // Receivers
    //

    receive("Bet A") {
        self.acceptBet(true);
    }

    receive("Argentina") {
        self.acceptBet(true);
    }

    receive("Bet B") {
        self.acceptBet(false);
    }

    receive("France") {
        self.acceptBet(false);
    }

    receive("Withdraw") {

        // Must be completed
        let ctx: Context = context();
        require(self.completed);
        require(ctx.value >= 1000000000); // 1 TON

        // Request from holder
        let holderInit: StateInit = initOf BetHolder(myAddress(), ctx.sender);
        let holderAddress: Address = contractAddress(0, holderInit.code, holderInit.data);
        let mode: Int = 64;
        send(SendParameters{
            value: 0, 
            to: holderAddress, 
            mode: mode + 2, // Renaining value + ignore errors (not recoverable anyway)
            bounce: false,
            code: holderInit.code,
            data: holderInit.data,
            body: abi.pack_cell(Withdraw{
                wonA: self.teamAwon,
                wonB: !self.teamAwon
            })
        });
    }

    receive(msg: WithdrawResponse) {

        // Check source
        let ctx: Context = context();
        let holderInit: StateInit = initOf BetHolder(myAddress(), msg.owner);
        let holderAddress: Address = contractAddress(0, holderInit.code, holderInit.data);
        require(ctx.sender == holderAddress);

        // Calculate value
        let value: Int = self.resolveWonAmount(msg.valueA, msg.valueB);

        // Update balance
        if (self.teamAwon) {
            self.balanceA = self.balanceA - value;
        } else {
            self.balanceB = self.balanceB - value;
        }

        // Send value
        send(SendParameters{
            value: value, 
            to: msg.owner, 
            mode: 64 + 2, // Renaining value + ignore errors (not recoverable anyway)
            bounce: false
        });
    }

    receive("Profit") {
        
        // Only onwer
        self.requireOwner();
        
        // Detect locked values
        let locked: Int = self.balanceA + self.balanceB;
        if (locked > 0) {
            nativeReserve(locked + 1000000, 0);
        }

        // Send response
        simpleReply(0, 128 + 2); // Remaining balance + ignore errors (not recoverable anyway)
    }


    receive("Team A won") {
        self.teamWon(true);
    }

    receive("Argentina won") {
        self.teamWon(true);
    }

    receive("Team B won") {
        self.teamWon(false);
    }

    receive("France won") {
        self.teamWon(false);
    }

    receive() {
        // Deployments and just empty messages
        simpleReply(0, 64 + 2); // Remaining value + ignore errors (not recoverable anyway)
    }

    //
    // Getters
    //

    get fun completed(): Bool {
        return self.completed;
    }

    get fun teamAWon(): Bool {
        return self.teamAwon;
    }

    get fun wonPPT(): Int {
        return self.wonPPT;
    }

    get fun won(valueA: Int, valueB: Int): Int {
        require(valueA >= 0);
        require(valueB >= 0);
        return self.resolveWonAmount(valueA, valueB);
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

    get fun participantAddress(owner: Address): Address {
        let holderInit: StateInit = initOf BetHolder(myAddress(), owner);
        return contractAddress(0, holderInit.code, holderInit.data);
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