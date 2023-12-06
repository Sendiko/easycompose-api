const history = require("../models/history");
const materi = require("../models/materi");
const video = require("../models/video");
const roadToSafety = require("../models/road_to_safety")

module.exports = {
  index: async (req, res) => {
    const historys = await history.findAll();

    return res.status(200).json({
      status: 200,
      message: "Data berhasil terkirim.",
      history: historys,
    });
  },
  show: async (req, res) => {
    const id = req.params.id;
    const historyy = await history.findOne({
      where: {
        id: id,
      },
    });

    const materi_id = JSON.parse(historyy.materi_id);
    const video_id = JSON.parse(historyy.video_id);
    const road_id = JSON.parse(historyy.road_id);

    const materis = await materi.findAll({
      where: {
        id: materi_id,
      },
    });

    const videos = await video.findAll({
      where: {
        id: video_id,
      },
    });

    const roadd = await roadToSafety.findAll({
      where: {
        id: road_id,
      }
    })

    return res.status(200).json({
      status: 200,
      message: "Data berhasil terkirim.",
      history: historyy,
      materi: materis,
      video: videos,
      road_to_safety: roadToSafety
    });
  },
  create: async (req, res) => {
    try {
      const { user_id, road_id, materi_id, video_id } = req.body;

      if (user_id == null) {
        return res.status(422).json({
          status: 422,
          message: "user_id tidak boleh kosong",
        });
      }

      const historyy = await history.create({
        user_id: user_id,
        road_id: road_id,
        materi_id: materi_id,
        video_id: JSON.stringify(video_id),
      });

      return res.status(201).json({
        status: 201,
        message: "Data berhasil ditambahkan.",
        history: historyy,
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
      const historyy = await history.update(
        {
          user_id: req.body.user_id,
          road_id: req.body.road_id,
          materi_id: req.body.materi_id,
          video_id: req.body.video_id,
        },
        { where: { id: req.params.id } }
      );

      return res.status(200).json({
        status: 200,
        message: "Data berhasil diubah.",
        history: historyy,
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
      await history.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        status: 500,
        message: "Data berhasil di hapus.",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
};
