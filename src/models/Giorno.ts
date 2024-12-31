export interface Giorno {
    id: GiornoId;
}

export interface GiornoId {
    data_inizio: Date;
    data_fine: Date;
    sportelloId: number;
}
