import express from "express";
import path from "path";
import routes from "./routes.js";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();
const staticPathPublic = path.resolve("public");

app.set("view engine", "ejs");
app.use(express.static(staticPathPublic));

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: false
	})
);
app.use("/", routes);

app.listen(5000, () => {
	console.log(`>> Server is running on http://localhost:${5000}`);
});

