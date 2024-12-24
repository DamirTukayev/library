const express = require('express');
const db = require('./database');

const app = express();
app.use(express.json());

// Получить все книги
app.get('/books', (req, res) => {
  const query = `
    SELECT id, title, author, available, borrowed_by AS borrowedBy
    FROM books
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(rows);
    }
  });
});

// Добавить книгу
app.post('/books', (req, res) => {
  const { title, author, borrowedBy } = req.body;
  const query = 'INSERT INTO books (title, author, borrowed_by) VALUES (?, ?, ?)';
  db.run(query, [title, author, borrowedBy || null], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: this.lastID, title, author, borrowedBy });
    }
  });
});

// Обновить информацию о книге
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, available, borrowedBy } = req.body;
  const query = 'UPDATE books SET title = ?, author = ?, available = ?, borrowed_by = ? WHERE id = ?';
  db.run(query, [title, author, available, borrowedBy || null, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Книга не найдена' });
    } else {
      res.status(200).json({ id, title, author, available, borrowedBy });
    }
  });
});

// Удалить книгу
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM books WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Книга не найдена' });
    } else {
      res.status(204).send();
    }
  });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
