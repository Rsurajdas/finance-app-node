/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createClient } from 'redis';

import app from './app.js';

dotenv.config({ path: './.env', override: true });

async function main() {
  // eslint-disable-next-line no-undef
  await mongoose.connect(process.env.MONGODB_URI);
}

main()
  .then(() => console.log('DB connected successfully...'))
  .catch((err) => console.log(err));

// const client = createClient({
//   // eslint-disable-next-line no-undef
//   username: process.env.REDIS_USERNAME,
//   // eslint-disable-next-line no-undef
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//     host: 'redis-10354.crce217.ap-south-1-1.ec2.cloud.redislabs.com',
//     port: 10354,
//   },
// });
//
// client.on('error', (err) => console.log('Redis Client Error', err));
//
// await client.connect();

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening to ${port}`);
});
