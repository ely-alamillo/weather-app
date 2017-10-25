const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3030, '0.0.0.0', () => {
  console.log('server running yo');
});
