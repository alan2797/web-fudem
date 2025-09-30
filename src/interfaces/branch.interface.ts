export interface BranchDto {
    id: number;
    name: string
}

export interface SelectBranchResponse {
    areaId: number;
    positionId: number;
    success: boolean;
    token?: string;
}

export interface SelectBranchDto {
    branchId: number;
}