import instance from "./api";

// export type ContractType = {

// }

class ApiService {
    getContracts = async (pageSize: number, currentPage: number, q:string) => {
        try {
            return await instance.get("/api/staff/contracts/all", {
                params: {
                    perPage: pageSize,
                    page:currentPage,
                    search:q
                },
            });
        } catch (error) {
            throw error;
        }
    };

    addContract = async (data: any) => {
        try {
            return await instance.post("/api/staff/contracts/create", data);
        } catch (error) {
            throw error;
        }
    }


    getCourses = async () => {
        try {
            return await instance.get("/api/staff/courses");
        } catch (error) {
            throw error;
        }
    }

    uploadFile = async (files: File) => {
        try {
            const formData = new FormData();
            formData.append("files", files);
            return await instance.post("/api/staff/upload/contract/attachment", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            throw error;
        }
    }
}

export const apiService = new ApiService();
