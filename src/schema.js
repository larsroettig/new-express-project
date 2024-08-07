const { buildSchema } = require("graphql");
const { ratings } = require("./db.js");

const schema = buildSchema(`
  type Review {
  review_id: ID!
  rating: Int!
  reviewer: String!
  review_date: String!
  review_text: String!
}

# Define the Product type
type ProductsReview {
  sku: String!
  name: String!
  average_rating: Float!
  reviews: [Review]!
}

type Query {
   productsReviews(sku: [String]): [ProductsReview]
}`);

const root = {
    productsReviews: ({ sku }) => {
		const data = [];
		ratings.forEach((product) => {
			if (sku.includes(product.sku)) {
				data.push(product);
			}
		});

		return data;
	},
};

module.exports = { schema, root };
