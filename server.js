const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// About page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
// C# Lesson Page
app.get('/csharp-programming', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'csharp-lesson.html'));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
