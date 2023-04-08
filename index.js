import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import cors from "cors";
import { login } from "./routes/auth-routes.js";
import {
  getAllSuratMasuk,
  getAllSuratMasukByNomorSurat,
  addSuratMasuk,
  deleteSuratMasukByNomorSurat,
  getAllSuratKeluar,
  getAllSuratKeluarByNomorSurat,
  addSuratKeluar,
  editSuratKeluarByNomorSurat,
  deleteSuratKeluarByNomorSurat,
} from "./routes/surat-routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

function auth(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "rahasia", async (err, _decoded) => {
      if (!err) {
        next();
      } else {
        res.status(401).send("Token salah.");
      }
    });
  } else {
    res.status(401).send("Token belum ada.");
  }
}

const upload = multer({ dest: "public/photos" });

// BAGIAN UNTUK LOGIN
app.post("/api/login", login);

// BAGIAN UNTUK MENAMPILKAN DATA SURAT MASUK
app.get("/api/surat/keluar", getAllSuratKeluar);

// BAGIAN UNTUK MENAMBAH SURAT KELUAR DAN FOTO
app.post("/api/surat/keluar", upload.single("photoEx"), addSuratKeluar);

// BAGIAN UNTUK MELIHAT DETAIL DATA SURAT KELUAR SESUAI NOMOR SURAT
app.get("/api/surat/keluar:nomor_suratEx", getAllSuratKeluarByNomorSurat);

// BAGIAN UNTUK MENGUPDATE SURAT
app.put("/api/surat/keluar:nomor_suratEx", editSuratKeluarByNomorSurat);

// BAGIAN UNTUK MENGHAPUS SURAT KELUAR
app.delete("/api/surat/keluar:nomor_suratEx", deleteSuratKeluarByNomorSurat);

app.use(auth);

// BAGIAN UNTUK MENAMPILKAN DATA
app.get("/api/surat", getAllSuratMasuk);

// BAGIAN UNTUK MELIHAT DETAIL DATA SURAT MASUK SESUAI NOMOR SURAT
app.get("/api/surat/:nomor_surat", getAllSuratMasukByNomorSurat);

// BAGIAN UNTUK MENAMBAH SURAT MASUK DAN FOTO
app.post("/api/surat", upload.single("photo"), addSuratMasuk);

// BAGIAN UNTUK MENGHAPUS SURAT MASUK
app.delete("/api/surat/:nomor_surat", deleteSuratMasukByNomorSurat);

app.listen(3000, () => console.log("server sedang berjalan"));
