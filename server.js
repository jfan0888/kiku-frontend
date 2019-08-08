const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3001;

app.use('/', express.static(path.join(__dirname, 'dist')));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => console.log('Listening on Port', port));
