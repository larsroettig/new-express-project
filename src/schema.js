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
type Product {
  sku: String!
  name: String!
  average_rating: Float!
  reviews: [Review]!
}

type Query {
   reviews(sku: [String]): [Product]
}`);

const root = {
	reviews: ({ sku }) => {
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
