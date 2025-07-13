// import connectMongoDB from "@/lib/connectmongodb";
import Seller from "@/models/seller"; 
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        console.error('Authorization header is missing or malformed');
        return res.status(401).json({ error: 'Token is required or malformed' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await connectMongoDB();

        const sellerData = await Seller.findById(decoded.sellerId);
        if (!sellerData) {
            console.error('Seller not found');
            return res.status(404).json({ error: 'Seller not found' });
        }

        return res.status(200).json({ message: 'Success', data: sellerData });
    } catch (error) {
        console.error('Error:', error);
        return res.status(401).json({ error: 'Invalid token or error fetching data' });
    }
}

