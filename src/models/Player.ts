import { Player } from "../generated/types";


export const fullName = (player:Player | null | undefined) => (!player) ? '' :  player.firstName + ' ' + player.lastName  