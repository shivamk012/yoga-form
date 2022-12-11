import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import User from "./models/user.js";
import Form from "./models/form.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/yogaDB", () =>
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

app.get("/api/user-detail", (req, res) => {
  const { username } = req.query;
  Form.findOne({ username }, (err, form) => {
    if (err) {
      return res.send(err);
    }
    if (!form) {
      res.sendStatus(410);
    } else {
      res.send(form);
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
  const { username } = req.query;
  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return res.sendStatus(404);
    }
    const { age, batch, payment } = req.body;

    Form.findOne({ username }, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        return res.send("Already Submitted");
      }
    });

    const form = new Form({
      username,
      age,
      batch,
      payment,
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

app.patch("/api/yoga-form", (req, res) => {
  const { username } = req.query;
  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.send(err);
    }
    if (!user) {
      return res.sendStatus(404);
    }

    Form.updateOne({ username }, { $set: { payment: true } }, (err) => {
      if (err) return res.send(err);
      res.sendStatus(200);
    });
  });
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
