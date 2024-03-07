require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

/* NEW FOR SOCKET IO */


require('./config/mongoose.config');

app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"]
    })
)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const sessionRoutes = require('./routes/session.routes');
app.use("/api/session", sessionRoutes);

const userRoutes = require('./routes/user.routes');
app.use("/api/user", userRoutes);

const listRoutes = require('./routes/list.routes');
app.use("/api/list", listRoutes);

const scheduleRoutes = require('./routes/schedule.routes');
app.use("/api/schedule", scheduleRoutes);

app.listen(port, () => console.log(`Listening on port: ${port}`));