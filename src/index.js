import express from "express";
import path from "path";
import routes from "./routes.js";

const app = express();
const staticPathPublic = path.resolve("public");

app.set("view engine", "ejs");
app.use(express.static(staticPathPublic));
app.use("/", routes);

app.listen(5000, () => {
	console.log(`>> Server is running on http://localhost:${5000}`);
});
