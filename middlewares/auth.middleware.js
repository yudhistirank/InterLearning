const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token JWT
exports.verifyToken = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  const token = bearer.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

// Middleware untuk memeriksa apakah user adalah admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Hanya admin yang diizinkan' });
  }
  next();
};

// Middleware untuk memeriksa apakah user adalah pengajar
exports.isPengajar = (req, res, next) => {
  if (req.user.role !== 'pengajar' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Hanya pengajar atau admin yang diizinkan' });
  }
  next();
};
