import conn from "../database.js";

// UNTUK MELIHAT SEMUA DATA SURAT MASUK
export async function getAllSuratMasuk(_req, res) {
  const rows = await conn.query(`SELECT * FROM SuratIn`);
  res.send(rows);
}

// UNTUK MELIHAT SURAT SECARA DETAIL SESUAI NOMOR SURAT PADA SURAT MASUK
export async function getAllSuratMasukByNomorSurat(req, res) {
  const rows = await conn.query(
    `SELECT * FROM SuratIn WHERE nomor_surat = '${req.params.nomor_surat}'`
  );
  res.send(rows[0]);
}

// UNTUK MENAMBAH DATA PADA SURAT MASUK
export async function addSuratMasuk(req, res) {
  await conn.query(
    `INSERT INTO SuratIn VALUES ('${req.body.nomor_surat}','${req.body.judul_surat}',
      '${req.body.asal_surat}','${req.body.tanggal_masuk}',
      '${req.body.tanggal_terima}','${req.body.jenis_surat}',
      '${req.body.sifat_surat}','${req.file.filename}')`
  );

  res.send("Surat Telah Masuk.");
}

// UNTUK MENGHAPUS SURAT MASUK
export async function deleteSuratMasukByNomorSurat(req, res) {
  await conn.query(
    `DELETE FROM SuratIn WHERE nomor_surat = '${req.params.nomor_surat}'`
  );
  res.send("Surat Telah Dihapus.");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////


// UNTUK MENAMBAH DATA PADA SURAT KELUAR
export async function addSuratKeluar(req, res) {
  await conn.query(
    `INSERT INTO SuratEx VALUES ('${req.body.nomor_suratEx}',
  '${req.body.judul_suratEx}','${req.body.tujuanEx}','${req.body.tanggal_keluarEx}',
  '${req.body.jenis_suratEx}','${req.body.sifat_suratEx}','${req.file.filename}')`
  );

  res.send("Surat Keluar Telah Terkirim");
}

// UNTUK MELIHAT DATA SURAT KELUAR
export async function getAllSuratKeluar(_req, res) {
  const rows = await conn.query(`SELECT * FROM SuratEx`);
  res.send(rows);
}

// UNTUK MELIHAT SECARA DETAIL SESUAI NOMOR SURAT PADA SURAT KELUAR
export async function getAllSuratKeluarByNomorSurat(req, res) {
  const rows = await conn.query(
    `SELECT * FROM SuratEx WHERE nomor_suratEx = '${req.params.nomor_suratEx}'`);
  res.send(rows[0]);
}




// UNTUK MENGEDIT DATA PADA SURAT KELUAR
export async function editSuratKeluarByNomorSurat(req, res) {
  await conn.query(
    `UPDATE SuratEx SET nomor_suratEx = '${req.body.nomor_suratEx}',judul_suratEx = '${req.body.judul_suratEx}',tujuanEx = '${req.body.tujuanEx}',tanggal_keluarEx = '${req.body.tanggal_keluarEx}',
    jenis_suratEx = '${req.body.jenis_suratEx}',sifat_suratEx = '${req.body.sifat_suratEx}' WHERE nomor_suratEx = '${req.params.nomor_suratEx}'`);
    
  res.send("Surat Keluar Telah Diedit");
}

// UNTUK MENGHAPUS SURAT KELUAR
export async function deleteSuratKeluarByNomorSurat(req, res) {
  await conn.query(
    `DELETE FROM SuratEx WHERE nomor_suratEx = '${req.params.nomor_suratEx}'`
  );
  res.send("Surat Telah Dihapus");
}
