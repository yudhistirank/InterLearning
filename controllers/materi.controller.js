const Materi = require('../models/materi.model');

// Fungsi untuk GET semua materi
exports.getAllMateri = async (req, res) => {
  const materi = await Materi.find().populate('dibuatOleh', 'nama role');
  res.json(materi);
};

// Fungsi untuk GET materi berdasarkan ID
exports.getMateriById = async (req, res) => {
  const materi = await Materi.findById(req.params.id);
  if (!materi) return res.status(404).json({ message: 'Materi tidak ditemukan' });
  res.json(materi);
};

// Fungsi untuk membuat materi (POST)
exports.createMateri = async (req, res) => {
  const { judul, deskripsi, videoUrl, teksPenjelasan, quiz } = req.body;
  const materi = await Materi.create({
    judul,
    deskripsi,
    videoUrl,
    teksPenjelasan,
    quiz,
    dibuatOleh: req.user.id
  });
  res.status(201).json(materi);
};

// Fungsi untuk mengupdate materi (PUT)
exports.updateMateri = async (req, res) => {
  const materi = await Materi.findById(req.params.id);
  if (!materi) return res.status(404).json({ message: 'Materi tidak ditemukan' });

  // hanya admin atau pengajar pemilik
  if (req.user.role !== 'admin' && materi.dibuatOleh.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Tidak punya izin mengedit materi ini' });
  }

  Object.assign(materi, req.body);
  await materi.save();
  res.json(materi);
};

// Fungsi untuk menghapus materi (DELETE)
exports.deleteMateri = async (req, res) => {
  const materi = await Materi.findById(req.params.id);
  if (!materi) return res.status(404).json({ message: 'Materi tidak ditemukan' });

  if (req.user.role !== 'admin' && materi.dibuatOleh.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Tidak punya izin menghapus materi ini' });
  }

  await materi.deleteOne();
  res.json({ message: 'Materi dihapus' });
};
