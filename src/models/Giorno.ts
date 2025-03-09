export interface Giorno {
    id: GiornoId;
    max_iscritti: number;
    num_iscritti: number;
}

export interface GiornoId {
    data_inizioId: Date | string;
    data_fineId: Date | string;
    sportelloId: number;
}
