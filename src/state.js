class stateSingleton {
    constructor(){
        this.state = {
            duels : [],
            getCurrentDuel: (id) => {
                return this.getState().duels.filter(duel => {
                    return duel.players.some(player => player === `<@${id}>`) || duel.invited.some(player => player === `<@${id}>`);
                })[0];
            }
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