import { format, parseISO } from 'date-fns';
import { DATE_FORMAT } from '../types';

const useDate = () => {
    const dateFormat = (date: Date | string, dateFormat = DATE_FORMAT.ddMMyyyy) => {
        return format(new Date(date), dateFormat);
    };

    const parseIso = (date: string) => parseISO(date);

    const dateFormatFromIso = (date: string, dateFormat = DATE_FORMAT.ddMMyyyy) => {
        const parsedDate = parseIso(date);
        return format(new Date(parsedDate), dateFormat);
    };

    return {
        dateFormat,
        parseIso,
        dateFormatFromIso,
    };
};

export { useDate };