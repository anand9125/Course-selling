import {v2 as cloudinary} from 'cloudinary';

import { config ,node} from '../config';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

console.log(node.nodee.NODE_ENV)
// Example function to upload an image


// Call the function
export default cloudinary