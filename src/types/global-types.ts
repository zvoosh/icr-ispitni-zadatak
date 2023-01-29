enum RESPONSE_MESSAGE {
    CREATED = 'Created',
    OK = 'OK'
}

interface IDefault {
    errors: [];
    message: `${RESPONSE_MESSAGE}`;
}

export interface IResponse<T> extends IDefault {
    data: T[];
}

export enum TAG_COLORS {
    CYAN = 'cyan',
    GREEN = 'green',
    LIME = 'lime',
    RED = 'red',
    GOLD = 'gold',
    BLUE = 'blue',
    MAGENTA = 'magenta',
    ORANGE = 'orange',
    PURPLE = 'purple',
    VIOLET = 'violet',
    TEAL = 'teal',
    PASTEL_BLUE = '#5D9B9B',
    BROWN = 'brown',
    ROSE = 'rose',
    NAVY = 'navy'
}

export const DATE_FORMAT = {
    yyyy_MM_dd: 'yyyy-MM-dd',
    ddMMyyyy: 'dd.MM.yyyy.',
    DDMMyyyy: 'DD.MM.yyyy.',
};

export const TIME_FORMAT = {
    HH_mm: 'HH:mm',
    HH_mm_ss: 'HH:mm:ss',
};