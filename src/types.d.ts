export interface Ward {
    id: string;
    name: string;
    abbreviation: string;
    local_government_id: string;
    units: [];
}

export interface ONDOLGA {
    id: string;
    name: string;
    abbreviation: string;
    state_id: string;
    wards: Ward[];
}