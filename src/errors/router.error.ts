import GenericError from './generic.error';

export default class RouterError extends GenericError {
    constructor(properties: ErrorCustom) {
        super(properties);
    }
}
