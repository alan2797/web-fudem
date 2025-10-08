export interface PatientSearchFilterDto extends Record<string, unknown>{
    expedientNumber?: string; //No. de Expediente
    name?: string;
    documentNumber?: string;
}

export interface PatientSearchDto extends Record<string, unknown>{
    expedientNumber?: string; //No. de Expediente
    patientName?: string;
    documentNumber?: string;
    birthDate ?: string;
    department ?: string;
    municipality ?: string;
    isActive?: boolean;
}