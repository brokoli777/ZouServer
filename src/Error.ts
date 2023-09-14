interface Error {
    status?: number;
    message?:any;
}

export const createError = (Status:any, Message:any) => {
    const err:Error = new Error();
    err.status = Status;
    err.message = Message;
    return err;
}


