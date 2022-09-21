import { RouterError } from '@errors';

export const existsOrError = (value: unknown, msg: string) => {
    if (!value) throw new RouterError({ message: msg }).Error400;

    if (Array.isArray(value) && value.length == 0)
        throw new RouterError({ message: msg }).Error400;

    if (typeof value == 'string' && !value.trim())
        throw new RouterError({ message: msg }).Error400;
};

export const notExistsOrError = (value: unknown, msg: string) => {
    try {
        existsOrError(value, msg);
    } catch (err) {
        return;
    }
    throw msg;
};

export const equalsOrError = (
    valueA: unknown,
    valueB: unknown,
    msg: string,
) => {
    if (valueA !== valueB) throw msg;
};
