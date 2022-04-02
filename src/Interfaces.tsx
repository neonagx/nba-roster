export interface Player {
    firstName: string,
    lastName: string,
    pos: string,
    personId: string
}

export interface PlayerRow {
    id: string,
    firstName: string,
    lastName: string,
    position: string
}

export type NbaGridProps = {
    roster: Player[];
    setRoster: React.Dispatch<React.SetStateAction<Player[]>>;
}