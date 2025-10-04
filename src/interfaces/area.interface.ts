  
export interface AreaDto {
  id: number;
  name: string;
  code: string;
}

export interface ResponseAreaDto {
  id: number;
  name: string;
  code: string;
}

export interface SelectAreaResponse {
  area: {
    id: number;
    name: string;
    positionId: number | null;
    areaId: number;
  };
  success: boolean;
  token: string;
}