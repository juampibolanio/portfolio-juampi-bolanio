export class CloudinaryException extends Error {
    constructor(message: string = "Cloudinary operation failed") {
        super(message);
        this.name = "CloudinaryException";
    }
}
