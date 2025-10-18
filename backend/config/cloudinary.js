import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async () => {
     cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        // timeout: 60000
    });
    console.log('Cloudinary Connected...');
}
export default connectCloudinary;


// import { v2 as cloudinary } from 'cloudinary';

// const connectCloudinary = async () => {
//     try {
//         cloudinary.config({
//             cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//             api_key: process.env.CLOUDINARY_API_KEY,
//             api_secret: process.env.CLOUDINARY_API_SECRET,
//             timeout: 60000,
//         });
//         console.log('Cloudinary Connected...');
//     } catch (error) {
//         console.error('Cloudinary connection failed:', error.message);
//     }
// }

// export default connectCloudinary;
