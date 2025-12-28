import axiosClient from '../../api/axiosClient';
import type { UnitDto, CreateUnitRequest } from './unit.dto';

export const unitService = {
    getUnits: () => {
        return axiosClient.get<UnitDto[]>('/units');
    },
    createUnit: (data: CreateUnitRequest) => {
        return axiosClient.post<UnitDto>('/units', data);
    }
};

