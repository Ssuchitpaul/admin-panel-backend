const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 8000 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.post("/sendOTP", (req, res) => {
  const { email, otp } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "suchitpaul.se@gmail.com",
      pass: "jnxh hjcx pmrg izfn",
    },
  });

  const mailOptions = {
    from: "suchitpaul.se@gmail.com",
    to: "suchitpaul.ipaul@gmail.com",
    subject: "OTP Verification",
    text: `Your OTP is: ${otp} from Admin Panel`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to send OTP" });
    } else {
      res.status(200).json({ message: "OTP sent successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
