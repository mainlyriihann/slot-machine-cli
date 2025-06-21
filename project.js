//deposit money.
// number of lines to bet on
// collect bet amount. 
// spin slot machine
// check if user won
// give money back
//play again or no money left.
 const prompt = require("prompt-sync")();

 const Rows = 3;
 const cols = 3;

    const symbols_count = {A :2 , B:4, C :6,D :8}
    const symbols_val = {
        A : 5,
        B : 4,
        C : 3,
        D : 2
    }

const deposit = () => {
    while(true){
    const amount = prompt("Enter a deposit amount: ");
    const depoamount = parseFloat(amount);
    if(isNaN(depoamount) || depoamount <=0)
        console.log("invalid amount!");
    else return depoamount;
}
}

const getNumberOfLiens = ()=>{
     while(true){
    const lines = prompt("Enter no. of lines to bet on: ");
    const numberoflines = parseFloat(lines);
    if(isNaN(numberoflines) || numberoflines <=0 || numberoflines >3 )
        console.log("invalid bet !");
    else return numberoflines;
}
}
const getbet = (balance,lines) => {
    while(true){
    const bet = prompt("Enter a bet amount per line: ");
    const numberbet = parseFloat(bet);
    if(isNaN(numberbet) || numberbet <=0 || numberbet > (balance/lines))
        console.log("invalid bet!");
    else return numberbet;
}
}
const spin =()=>{
    const symbols = [];
    for(const [symbol,count] of Object.entries(symbols_count)){
        for(let i =0; i<count;i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i =0; i <cols; i++){
        reels.push([]);
        const reelsym = [...symbols];
        for(let j =0 ; j<Rows; j++){
            
            const randomind = Math.floor(Math.random()*reelsym.length);
            const selectedsym = reelsym[randomind];
            reels[i].push(selectedsym);
            reelsym.splice(randomind,1);
        }
    }
    return reels;
}
const transpose =(reels) =>{
    const rows= [];
    for(let i=0; i<Rows;i++){
        rows.push([]);
        for(let j =0; j<cols; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}
const printrows= (rows)=>{
    for(const row of rows){
        let rowstr = "";
        for(const [i,symbol] of row.entries()){
            rowstr += symbol;
            if(i != row.length -1){
                rowstr += " | ";
            }
        } console.log(rowstr);
    }
}
const getwins =(rows,bet,numberoflines) => {
    let winnings = 0; let allsame = true;
    for(let row =0; row< numberoflines; row++){
        const symbols = rows[row];
        
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allsame = false;
                break;
            }
        }
    }
    if(allsame) {
        winnings += bet*symbols_val[symbols[0]];
    }
    return winnings;
}

const game = () =>{

let balance = deposit();
while(true){
    console.log("You have a balance of $ " + balance.toString());
const numberoflines = getNumberOfLiens();
const bet = getbet(balance, numberoflines);
balance -= bet*numberoflines; 
const reels = spin();
const rows = transpose(reels);
printrows(rows);
const winnings = getwins(rows,bet,numberoflines);
balance += winnings;
console.log("You won, $ " + winnings.toString());
if(balance <= 0) console.log("you ran out of money!");
const playagain = prompt("Do yu wanna play again? (y/n)");
if(playagain != "y") break;

} 
}
game();