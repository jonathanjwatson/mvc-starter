const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const router = express.Router();
const db = require("../models");

// /api/alerts/
router.post("/", (req, res) => {
  console.log(req.body);
  axios
    .get(req.body.url)
    .then(({ data }) => {
      console.log("======================");
      //   console.log(data);
      //   console.log(result);
      const $ = cheerio.load(data);
      //   console.log($);
      const name = $("#productTitle").text().trim();
      const dealPriceEl = $("#priceblock_dealprice");
      const ourPriceEl = $("#priceblock_ourprice");
      let price;
      if (dealPriceEl.text()) {
        price = dealPriceEl.text().trim();
      } else if (ourPriceEl.text()) {
        price = ourPriceEl.text().trim();
      } else {
        console.log("Neither of those matched");
      }
      //   const landingImage = $("#landingImage").attr("src");
      //   console.log(name);
      //   console.log(price);
      //   console.log("======================");
      //   console.log(landingImage);
      console.log("======================");
      console.log(req.body.url);
      db.Alert.create({
        url: req.body.url,
        title: name,
        price: price,
        UserId: req.body.UserId,
      })
        .then((result) => {
          res.json({
            error: false,
            data: result,
            message: "Successfully created new alert",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: true,
            data: null,
            message: "Unable to create new alert.",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        data: null,
        message: "An error occurred creating your alert.",
      });
    });
});

// /api/alerts/:id
router.put("/:id", (req, res) => {
  res.json({
    message: "Put route",
  });
});

// /api/alerts/:id
router.delete("/:id", (req, res) => {
  res.json({
    message: "Delete route",
  });
});

module.exports = router;
