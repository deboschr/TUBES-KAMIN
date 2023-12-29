import express from "express";
import fileUpload from "express-fileupload";
import session from "express-session";
import path from "path";
import routes from "./routes.js";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";

const app = express();
const staticPathPublic = path.resolve("public");

app.set("view engine", "ejs");

app.use(express.static(staticPathPublic));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: false,
	})
);
app.use("/", routes);

app.listen(5000, () => {
	console.log(`>> Server is running on http://localhost:${5000}`);
});
