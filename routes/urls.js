var express = require("express");
var router = express.Router();
const shortid = require("shortid");
const allUrlsArray = require("../demo/urls");

const UrlsArray = [];

/* GET users listing. */
router.post("/", async function (req, res, next) {
  if (!req.body.link) return res.json({ redirectUrl: null, error: true });

  const urlData = {
    redirectUrl: req.body.link,
    urlId: shortid.generate(),
  };

  allUrlsArray.push(urlData);
  return res.json(urlData);
});

module.exports = router;
