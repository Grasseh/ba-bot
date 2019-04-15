class Dice{
    xDy(x, y){
        let sum = 0;
        let dice = [];
        for(let i of range(0, x - 1)){
            let val = Math.floor(Math.random() * y + 1);
            sum += val;
            dice.push(val);
        }
        return {dice, sum};
    }

    d20(){
        return this.xDy(1, 20);
    }

    d4(){
        return this.xDy(1, 4);
    }


}

module.exports = Dice;

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}