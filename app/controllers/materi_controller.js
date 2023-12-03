const { where } = require("sequelize");
const materi = require("../models/materi");
const submateri = require("../models/submateri");

module.exports = {
  getMateri: async (req, res) => {
    const materyy = await materi.findAll();

    return res.status(200).json({
      status: 200,
      message: "Data berhasil terkirim",
      materi: materyy,
    });
  },
  getDetailedMateri: async (req, res) => {
    try {
      const id = req.params.id;
      const materyy = await materi.findOne({
        where: {
          id: id,
        },
      });
      const submateris = await submateri.findAll({
        where: {
          belongsTo: id,
        },
      });
      if (materyy == null) {
        return res.status(404).json({
          status: 404,
          message: "Materi tidak ditemukan",
        });
      }
      return res.status(200).json({
        status: 200,
        materi: materyy,
        submateri: submateris,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  postMateri: async (req, res) => {
    try {
      if (req.body.judul == null) {
        return res.status(422).json({
          status: 422,
          message: "Judul tidak boleh kosong.",
        });
      }
      if (req.body.deskripsi == null) {
        return res.status(422).json({
          status: 422,
          message: "Deskripsi tidak boleh kosong.",
        });
      }

      const materyy = await materi.create({
        judul: req.body.judul,
        deskripsi: req.body.deskripsi,
      });

      return res.status(201).json({
        status: 201,
        message: "Materi berhasil dibuat.",
        materi: materyy,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  postSubMateri: async (req, res) => {
    try {
      const { belongsTo, judul, isi } = req.body;
      if (belongsTo == null) {
        return res.status(422).json({
          status: 422,
          message: "ID Materi tidak boleh kosong.",
        });
      }
      if (judul == null) {
        return res.status(422).json({
          status: 422,
          message: "Judul tidak boleh kosong.",
        });
      }
      if (isi == null) {
        return res.status(422).json({
          status: 422,
          message: "Isi materi tidak boleh kosong.",
        });
      }

      const submateryy = await submateri.create({
        judul: judul,
        isi: isi,
        belongsTo: belongsTo,
      });

      return res.status(201).json({
        status: 201,
        message: "Submateri berhasil dibuat.",
        submateri: submateryy,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  updateMateri: async (req, res) => {
    try {
      const { judul, deskripsi } = req.body;
      const materyy = await materi.update(
        {
          judul: judul,
          deskripsi: deskripsi,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return res.status(200).json({
        status: 200,
        message: "Materi berhasil di update.",
        materi: materyy,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  updateSubMateri: async (req, res) => {
    try {
      const { judul, isi } = req.body;

      const submateryy = await submateri.update(
        {
          judul: judul,
          isi: isi,
        },
        { where: { id: req.params.id } }
      );
      
      return res.status(200).json({
        status: 200,
        message: "Submateri berhasil diupdate.",
        submateri: submateryy
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
};
