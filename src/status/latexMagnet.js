const Status = require('./status');

class LatexMagnet extends Status{
    constructor(binding){
        super();
        this.name = "Latex Magnet";
        this.effect = "Passive : +1 to all hit rolls per piece of latex bondage on the target";
        this.time = 0;
        this.binding = binding;
    }

    toHit(target){
        let latexBinding = ["Latex Muzzle", "Latex Mittens", "Latex Corset", "Latex Heels"];
        let filtered = target.restraints.filter(r => latexBinding.includes(r.name));
        return filtered.length;
    }

}

module.exports = LatexMagnet;