class stateSingleton {
    constructor(){
        this.state = {
            duels : []
        };
    }

    getState(){
        if(this.state){
            return this.state;
        }
        console.error('State should have been set before this call');
    }
}

module.exports = new stateSingleton();