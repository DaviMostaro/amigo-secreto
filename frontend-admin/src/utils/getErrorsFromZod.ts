import { ZodError } from "zod";

export type ErrorItem = { field: string; message: string };

export const getErrorsFromZod = (error: ZodError): ErrorItem[] => {
    const errorList: ErrorItem[] = [];
    for (const issue of error.errors) {
        errorList.push({
            field: issue.path[0]?.toString() || "unknown",
            message: issue.message,
        });
    }

    return errorList;
};