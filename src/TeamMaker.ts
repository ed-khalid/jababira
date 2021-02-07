import { Player } from "./generated/types";

type Squad = {
    color: 'black'|'white'
    players:Array<Player>
}


export class TeamMaker {

    public makeTeams(players:Array<Player>) : void {

        // find gks
        const black:Squad = { color: 'black', players:[]}   
        const white:Squad = { color: 'white', players:[]} 
        const gks = players.filter( it => it.attributes.position === 'GK' )
        if (gks && gks.length == 2) {
            black.players.push(gks[0])
            white.players.push(gks[1])
        }
        // find def
        const def = players.filter( it => it.attributes.position === 'DEF').sort((a,b) => a.attributes.defense ) 



   }
}  