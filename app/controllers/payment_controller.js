const payment = require("../models/payment");

module.exports = {
  index: async (req, res) => {
    const payments = await payment.findAll();

    return res.status(200).json({
      status: 200,
      message: "Payment berhasil ditemukan.",
      payments: payments,
    });
  },
  show: async (req, res) => {
    const payment = await payment.findByPk(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "Payment berhasil ditemukan.",
      payment: payment,
    });
  },
  create: async (req, res) => {
    try {
      const { date, user_id } = req.body;

      if (date === undefined) {
        return res.status(422).json({
          status: 422,
          message: "Tanggal tidak boleh kosong.",
        });
      }

      if (user_id === undefined) {
        return res.status(422).json({
          status: 422,
          message: "User tidak boleh kosong.",
        });
      }

      const paymentt = await payment.create({
        date: date,
        user_id: user_id,
      });

      return res.status(201).json({
        status: 201,
        message: "Payment berhasil ditambahkan.",
        payment: paymentt,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      const paymentt = await payment.update(
        {
          isPayed: req.body.isPayed,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Payment berhasil diubah.",
        payment: paymentt,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      await payment.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "Payment berhasil dihapus.",
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  },
};
