const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3306;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// cargar y resscribir rutas
const userRoutes = require("./routes/user-routes");
app.use("/api", userRoutes);

const apiRoutes = require("./routes/apiRoutes");
app.use('/api', apiRoutes);

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`listening on https://localhost:${PORT}`);
	});
});