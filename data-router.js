const expressRouter = require("express").Router();
let integerList = [];
class DataRouter {
  dataRouter;
  constructor() {
    this.dataRouter = expressRouter;
    this.dataRouter.get("/", (req, res) => res.send(this.integerList));

    this.dataRouter.post("/", (req, res) => {
      let list = req.body.integerList;
      if (list.length < 10000) {
        this.integerList = list.filter(
          (number) =>
            typeof number === "number" &&
            isFinite(number) &&
            Math.round(number) === number
        );
        res.status(200).send(this.integerList);
      }
    });

    //fromPosition is n and nthLargetnumber is k specified in the assessment
    this.dataRouter.get("/:fromPosition/:nthLargetnumber", (req, res) => {
      const list = this.integerList;
      const filteredArray = list.splice(req.params.fromPosition - 1);
      filteredArray.sort(function (a, b) {
        return b - a;
      });
      let resultValue;
      if (filteredArray[req.params.nthLargetnumber - 1] === undefined)
        resultValue = -1;
      else resultValue = filteredArray[req.params.nthLargetnumber - 1];
      res.send({ result: resultValue });
    });
  }
}
module.exports = DataRouter;
