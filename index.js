import app from "./app.js";
import cors from "cors";
import express from "express";

const port = process.env.PORT || 8080;

app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "/https://?[-a-zA-Z0-9@:%._+~#=]{1,256}.netlify.app/",
//     ],
//   })
// );

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
