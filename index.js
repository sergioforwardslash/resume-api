const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const mailer = require("./routes/Mailer");
app.use("/", mailer);

app.listen(8002, () => {
  console.log("SergioAPI Server running on port 8002");
});
