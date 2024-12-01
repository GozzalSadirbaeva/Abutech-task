export interface InputContractType {
    kurs: string;
    nomi: string;
    file: FileType;  // File field
}

export interface FileUploadResponse {
    url: string;
}

export type FileType = {
    file: File;
    files: File[];
}

export type ContractType = {
    id: string;
    title: string;
    course: {
        id: string;
        name: string;
    };
};

export type CourseType = {
    id:number;
    name: string;
    disciplineName:number;
    disciplineId:number;
    attachment: {
        "size": number;
        url: string;
        originalName: string;
    }
};
