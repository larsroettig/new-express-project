const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");

const { ruruHTML } = require("ruru/server");

const { createMiddleware } = require("@mswjs/http-middleware");

const handlers = require("../src/handlers");
const { schema, root } = require("../src/schema");

const app = express();
app.use(bodyParser.json());

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	}),
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
	res.type("html");
	res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.use(createMiddleware(...handlers));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
