const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

const apiRoutes = require("./routes/apiRoutes");
app.use('/api', apiRoutes);

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`listening on https://localhost:${PORT}`);
	});
});