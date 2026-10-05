import express from 'express'
import path from 'path'
import dotenv from 'dotenv';
import cors from 'cors';
import placesRouter from './routes/places.js';
import { fileURLToPath } from 'url';

// import the router from your routes file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

// serve static files from the public directory
app.use(express.static(path.join(__dirname, "..", "public")));

// specify the api path for the server to use
app.use('/api/places', placesRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})