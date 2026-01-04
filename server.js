/* eslint-disable no-console */
import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./app.js";

dotenv.config({ path: "./.env", override: true });

async function main() {
  // eslint-disable-next-line no-undef
  await mongoose.connect(process.env.MONGODB_URI);
}

main()
  .then(() => console.log("DB connected successfully..."))
  .catch((err) => console.log(err));

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening to ${port}`);
});
