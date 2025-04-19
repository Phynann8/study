const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1) Serve all static assets (HTML, CSS, JS, images) from /public
app.use(express.static(path.join(__dirname, 'public')));

// 2) Home, About, Contact
app.get('/',        (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/about',   (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));

// 3) C# main lesson page
app.get('/csharp-programming', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'csharp-lesson.html'))
);

// 4) Dynamic routing for each C# sub‑lesson
app.get('/csharp/:lesson', (req, res, next) => {
  const lesson = req.params.lesson;
  const file = path.join(__dirname, 'public', 'csharp', `${lesson}.html`);
  res.sendFile(file, err => {
    if (err) next(); // if file not found, fall through to 404
  });
});

// 5) Under‑development page
app.get('/underdev', (req, res) =>
  res.sendFile(path.join(__dirname, 'public','reuse', 'underdev.html'))
);

// 6) 404 Handler (any other route)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
