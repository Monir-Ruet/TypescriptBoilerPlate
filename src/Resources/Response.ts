export default class RESPONSE extends Error {
    constructor(public status: number, public message: string, public data: object) {
        super();
    }
}