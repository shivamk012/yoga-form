import cron from "node-cron";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import User from "./models/user.js";
import Form from "./models/form.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8000;


mongoose.connect(process.env.MONGODB_CONNECTION_URL, () =>
  console.log("Succefully Connected")
);

app.get("/api/users", (req, res) => {
  User.find((err, users) => {
    res.send(users);
  });
});

app.get("/api/forms", (req, res) => {
  Form.find((err, forms) => {
    res.send(forms);
  });
});

cron.schedule("* * 1 * *", () => {
  Form.remove({}, () => {
    console.log("refreshed all forms.");
  });
});

app.get("/api/user-detail", (req, res) => {
  const { username } = req.query;
  Form.findOne({ username }, (err, form) => {
    if (err) {
      return res.send(err);
    }
    if (!form) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

app.post("/api/login", (req, res) => {
  const { username } = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return res.status(404).send("User not found!");
    }

    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.send(username);
      } else {
        res.status(401).send("Password invalid!");
      }
    } catch (error) {
      res.sendStatus(500);
    }
  });
});

app.post("/api/signup", async (req, res) => {
  const { username } = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (user) {
      return res.send("User already exist!");
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 5);
      const user = new User({
        username,
        password: hashedPassword,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send(username);
        }
      });
    } catch (e) {
      res.send(e);
    }
  });
});

app.post("/api/yoga-form", (req, res) => {
  User.findOne({ username: req.body.username } , (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return res.sendStatus(404);
    }
    const { username,name, phone, age, batch } = req.body;

    const form = new Form({
      username,
      name,
      phone,
      age,
      batch,
    });

    form.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Form.findOne({ username }, (err, u) => {
//   if (err) {
//     check = false;
//     res.send(err);
//   }
//   if (u) {
//     check = false;
//     res.send("Already Submitted");
//   }
// });
// console.log(check);
// if(!check)return;

// Form.findOne({ username, payment: true }, (err, u) => {
//   if (u) {
//     check = false;
//     return res.send("Already made payment!");
//   }
// });
// if (!check) return;
