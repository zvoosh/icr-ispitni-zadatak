enum RESPONSE_MESSAGE {
    CREATED = 'Created',
    OK = 'OK'
}

interface IDefault {
    errors: [];
    message : `${RESPONSE_MESSAGE}`;
}

export interface IResponse<T> extends IDefault {
    data: T[];
}