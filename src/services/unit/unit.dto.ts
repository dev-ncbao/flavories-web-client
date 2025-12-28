export interface UnitDto {
    unitId: number;
    name: string;
    abbreviation: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateUnitRequest {
    name: string;
    abbreviation: string;
}

