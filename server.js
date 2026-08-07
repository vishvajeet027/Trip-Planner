import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to read JSON files safely
const readJsonData = (filename) => {
  try {
    const filePath = path.join(__dirname, 'public', 'data', filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: ${filename} does not exist at ${filePath}`);
      return [];
    }
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

// API Endpoints
app.get('/api/destinations', (req, res) => {
  const data = readJsonData('destinations.json');
  res.json(data);
});

app.get('/api/hotels', (req, res) => {
  const data = readJsonData('hotels.json');
  res.json(data);
});

app.get('/api/activities', (req, res) => {
  const data = readJsonData('activities.json');
  res.json(data);
});

app.get('/api/foods', (req, res) => {
  const data = readJsonData('foods.json');
  res.json(data);
});

app.get('/api/transport', (req, res) => {
  const data = readJsonData('transport.json');
  res.json(data);
});

// Single Page Application & static HTML route fallback
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  
  // Try resolving page requests
  let filePath = path.join(__dirname, 'public', req.path);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }
  
  if (fs.existsSync(`${filePath}.html`)) {
    return res.sendFile(`${filePath}.html`);
  }

  // Fallback to main index.html
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` AI SMART TRIP PLANNER SERVER RUNNING AT:`);
  console.log(` http://localhost:${PORT}`);
  console.log(`====================================================`);
});
