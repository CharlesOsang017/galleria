import express from 'express';
import dotenv from 'dotenv';
import connectToDb from './db/connectToDb.js';
import auhRoutes from './routes/user.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT;

// Apply middleware before routes
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", auhRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToDb();
});
