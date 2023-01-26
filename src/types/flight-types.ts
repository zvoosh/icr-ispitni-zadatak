import { TAG_COLORS } from "./global-types";

export interface IFlight {
    _id: string;
    title: string;
    starting: string;
    destination: string;
    description: string;
    takeoffDate: string;
    landingDate: string;
    image: string;
    class: string;
    price: number;
    takesoff: string,
    lands: string,
    rating: number[],
    status: string,
    filled: string[],
    total: number,
    comments: string[],
    wroteComment: string[],
}

export interface IQueryObj {
    title?: string,
    class?: `${CLASS}`,
    starting?: string,
    destination?: string
}

export enum STATUS {
    PREDSTOJECI = 'predstojeci',
    OBAVLJEN = 'obavljen',
    OTKAZAN = 'otkazan'
}

export const STATUS_LABEL: {
    [key in `${STATUS}`]: {
        label: string;
        tagColor: `${TAG_COLORS}`;
    }
} = {
    [STATUS.PREDSTOJECI]: {
        label: "Upcoming",
        tagColor: TAG_COLORS.BLUE,
    },
    [STATUS.OBAVLJEN]: {
        label: 'Done',
        tagColor: TAG_COLORS.LIME
    },
    [STATUS.OTKAZAN]: {
        label: 'Cancelled',
        tagColor: TAG_COLORS.RED
    }
}

export enum CLASS {
    ECONOMY = 'economy',
    BUSINESS = 'business',
    FIRST_CLASS = 'first class'
}

export const CLASS_LABEL: {
    [key in `${CLASS}`]: {
        label: string;
        tagColor: `${TAG_COLORS}`;
    }
} = {
    [CLASS.ECONOMY]: {
        label: "Economy",
        tagColor: TAG_COLORS.BLUE,
    },
    [CLASS.BUSINESS]: {
        label: 'Business',
        tagColor: TAG_COLORS.LIME
    },
    [CLASS.FIRST_CLASS]: {
        label: 'First class',
        tagColor: TAG_COLORS.RED
    }
}