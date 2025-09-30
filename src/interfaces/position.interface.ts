export interface ResponsePositionDto {
    id: number;
    name: string;
    code: string;
}

export interface SelectPositionDto {
    areaId: number;
    positionId: number;
}

export interface SelectPositionResponse {
    areaId: number;
    positionId: number;
    success: boolean;
}

export interface PositionDto {
    id: number;
    name: string;
    code: string;
  }