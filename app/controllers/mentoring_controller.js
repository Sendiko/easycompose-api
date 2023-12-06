const mentoring = require("../models/mentoring");

module.exports = {
  show: async (req, res) => {
    const mentors = await mentoring.findAll({
      where: {
        user_id: req.params.id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Data berhasil ditemukan.",
      mentors: mentors,
    });
  },
  create: async (req, res) => {
    try {
      const { time, date, user_id } = req.body;

      if (time === undefined) {
        return res.status(422).json({
          status: 422,
          message: "Waktu tidak boleh kosong.",
        });
      }

      if (date === undefined) {
        return res.status(422).json({
          status: 422,
          message: "Tanggal tidak boleh kosong.",
        })
      }

      if (user_id === undefined) {
        return res.status(422).json({
          status: 422,
          message: "User tidak boleh kosong.",
        })
      }

      const mentor = await mentoring.create({
        time: time,
        date: date,
        user_id: user_id,
      });

      return res.status(201).json({
        status: 201,
        message: "Mentor berhasil ditambahkan.",
        mentor: mentor,
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
      const { time, date } = req.body;

      const mentor = await mentoring.update(
        {
          time: time,
          date: date,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Mentor berhasil diubah.",
        mentor: mentor,
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
      const mentor = await mentoring.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "Mentor berhasil dihapus.",
        mentor: mentor,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },
};
