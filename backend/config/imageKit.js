import ImageKit from "imagekit";

let imageKitInstance = null;

const getImageKit = () => {
    if (!imageKitInstance) {
        imageKitInstance = new ImageKit({
            publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
            privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
            urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT
        });
    }
    return imageKitInstance;
};

export default getImageKit;