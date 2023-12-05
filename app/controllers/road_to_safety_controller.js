const materi = require("../models/materi");
const roadToSafety = require("../models/road_to_safety");
const video = require("../models/video");

module.exports = {
  index: async (req, res) => {
    try {
      const roadd = await roadToSafety.findAll();

      return res.status(200).json({
        status: 200,
        message: "Data berhasil terkirim.",
        roads: roadd,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  show: async (req, res) => {
    const id = req.params.id;
    const road = await roadToSafety.findOne({
      where: {
        id: id,
      },
    });

    if (road == null) {
      return res.status(404).json({
        status: 404,
        message: "Data tidak ditemukan.",
      });
    }

    const materis = await materi.findAll({
      where: {
        road_id: id,
      },
    });

    const videos = await video.findAll({
      where: {
        road_id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Data berhasil terkirim.",
      road: road,
      materi: materis,
      videos: videos,
    });
  },
  create: async (req, res) => {
    try {
      const { judul } = req.body;

      const roadd = await roadToSafety.create({
        judul: judul,
      });

      return res.status(201).json({
        status: 201,
        message: "Data berhasil tersimpan.",
        road: roadd,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    try {

      const roadd = await roadToSafety.update(
        {
          judul: req.body.judul,
        },
        { where: { id: req.params.id } }
      );
      
      return res.status(200).json({
        status: 200,
        message: "Data berhasil diupdate",
        road: roadd
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try{
      await roadToSafety.destroy({
        where: {
          id: req.params.id
        }
      })

      return res.status(200).json({
        status: 500,
        message: "Data berhasil di hapus."
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
};
