import { NewSquad, NewSquadPlayer, Squad, SquadPlayer } from "../generated/types";


export const mapSquadToSquadInput = (squad:Squad): NewSquad => {
    return {
        color: squad.color,
        dominantNationality: squad.dominantNationality,
        captainId: squad.captain!.id,
        isJababiraSquad: squad.isJababiraSquad,
        score: squad.score,
        players: (squad.players || []).map(mapSquadPlayerToNewSquadPlayer)
    }
} 

const mapSquadPlayerToNewSquadPlayer = (squadPlayer:SquadPlayer):NewSquadPlayer => {
    return {
        playerId: squadPlayer.player.id,
        performanceRating: squadPlayer.performanceRating,
        position: squadPlayer.position
    }
}   