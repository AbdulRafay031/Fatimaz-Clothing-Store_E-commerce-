// pages/api/cloudnary/upload.js

import cloudinary from '../../../lib/cloudinary';
import { upload } from '../../../lib/multer';

export const config = {
  api: {
    bodyParser: false, // Important for handling file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Use multer to handle the file
    await new Promise((resolve, reject) => {
      upload.single('file')(req, {}, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

  const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
const result = await cloudinary.uploader.upload(fileStr, {
  folder: 'uploads',
});

    console.log('Cloudinary Upload Result:', result);

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
