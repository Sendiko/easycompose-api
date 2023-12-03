module.exports = {
  confession: (req, res) => {
    if (req.body.love_sendiko == "false") {
      return res.status(405).json({
        status: 405,
        message: "noooooo, you cannot not love sendikooo",
      });
    }
    if (req.body.love_sendiko == "true") {
      return res.status(200).json({
        status: 200,
        message: "yeaaaaaaaaayyyyyyyyyyyyyyyyy, i love you tooooooooooo💖💖",
      });
    }
  },
};
