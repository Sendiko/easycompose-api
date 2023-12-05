const video = require("../models/video");

module.exports = {
  index: async (req, res) => {
    const videos = await video.findAll();

    return res.status(200).json({
      status: 200,
      message: "Data berhasil terkirim.",
      videos: videos,
    });
  },
  create: async (req, res) => {
    try {
      const { judul, url, road_id } = req.body;

      if (judul == null) {
        return res.status(422).json({
          status: 422,
          message: "Judul video tidak boleh kosong.",
        });
      }
      if (url == null) {
        return res.status(422).json({
          status: 422,
          message: "Url video tidak boleh kosong.",
        });
      }

      const videoo = await video.create({
        judul: judul,
        url: url,
        road_id: road_id
      });

      return res.status(201).json({
        status: 201,
        message: "Video berhasil disimpan",
        video: videoo,
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
      const { judul, url, road_id } = req.body;

      const videoo = await video.update(
        {
          judul: judul,
          url: url,
          road_id: road_id
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Video berhasil diupdate.",
        video: videoo,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      await video.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "Video berhasil dihapus.",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
};
