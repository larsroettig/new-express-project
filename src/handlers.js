const { http } = require("msw");
const { graphql } = require("msw");
const { HttpResponse } = require("msw");
const { ratings } = require("./db.js");

const handlers = [
	http.get("/reviews", (req, res, ctx) => {
		return HttpResponse.json(ratings);
	}),
	http.get("/reviews/:sku", (req, res, ctx) => {
		const { sku } = req.params;
		const product = ratings.find((product) => product.sku === sku);
		if (product) {
			return HttpResponse.json(ratings);
		} else {
			return HttpResponse.error("Product not found");
		}
	}),

	graphql.query("GetReviews", (req, res, ctx) => {
		const { sku } = req.variables;
		const product = reviews.find((product) => product.sku === sku);
		if (product) {
			return res(ctx.data({ product }));
		} else {
			return res(ctx.errors([{ message: "Product not found" }]));
		}
	}),
];

module.exports = handlers;
