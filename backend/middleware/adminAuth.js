import jwt from 'jsonwebtoken';

// Admin authentication middleware
const adminAuth = async (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const {token} = req.headers
    
    
    
    // ('Authorization') && req.header('Authorization').split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.json({ success: false, message: "Not authorized, login again" });
    }

    // Verify and decode the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token contains the admin's email
    if (token_decode !== process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not authorized, access denied" });
    }

    // Proceed to the next middleware/handler if authorized
    next();
  } catch (error) {
    
    console.error('JWT Error: ', error); // Log the error for debugging
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;
