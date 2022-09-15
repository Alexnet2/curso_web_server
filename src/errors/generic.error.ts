export default class GenericError {
    private internalErr: string;
    private message: string;
    private status: number;
    public Error400: ErrorCustom;
    public Error500: ErrorCustom;

    constructor({ internalErr, message, status }: ErrorCustom) {
        this.internalErr = internalErr || 'Error interno';
        this.status = status || 400;
        this.message = message || 'Houve um error';

        this.Error400 = {
            status: 400,
            message: this.message,
            internalErr: this.internalErr,
        };

        this.Error500 = {
            status: 500,
            message: this.message,
            internalErr: this.internalErr,
        };
    }
}
