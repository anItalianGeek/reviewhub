export interface Giorno {
    id: GiornoId;
}

export interface GiornoId {
    data_inizioId: Date | string;
    data_fineId: Date | string;
    sportelloId: number;
}
