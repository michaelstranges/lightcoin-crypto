//let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance(){
    let balance = 0;
    this.transactions.forEach(function(trans){
      balance += trans.value;
    });
    return balance;

  }

  addTransaction(transaction){
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account){
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.time = new Date();
    if(this.isAllowed()){
      this.account.addTransaction(this);
    } else {
      console.log("Insufficient Funds");
    }
  }
}

class Deposit extends Transaction {

  get value(){
    return this.amount;
  }

  isAllowed(){
    return true;
  }
}

class Withdrawal extends Transaction {

  get value(){
    return this.amount*(-1);
  }

  isAllowed(){
    return (this.account.balance - this.amount >= 0);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(150.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
