export const existsOrError = (value: unknown, msg: string) => {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length == 0) throw msg;
    if (typeof value == 'string' && !value.trim()) throw msg;
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
