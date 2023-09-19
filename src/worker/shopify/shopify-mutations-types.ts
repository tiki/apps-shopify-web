export interface StagedUploadResponse {
    data: Data;
}

export interface Data {
    stagedUploadsCreate: StagedUploadsCreate;
}

export interface StagedUploadsCreate {
    userErrors:    any[];
    stagedTargets: StagedTarget[];
}

export interface StagedTarget {
    url:         string;
    resourceUrl: string;
    parameters: []
}

//////////////////////////////// -------------------- ///////////////////////////////

export interface FIleQueryResponse {
    data: Data;
}

export interface Data {
    fileCreate: FileCreate;
}

export interface FileCreate {
    userErrors: any[];
    files:      File[];
}

export interface File {
    createdAt:  Date;
    fileStatus: string;
    id:         string;
}