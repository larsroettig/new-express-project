const { buildSchema } = require("graphql");
const { ratings } = require("./db.js");

const schema = buildSchema(`
  type Review {
    review_id: String
    rating: Int
    reviewer: String
    review_date: String
    review_text: String
  }

  type Reviews {
    sku: String
    average_rating: Float
    reviews: [Review]
  }

  type Query {
    reviews(sku: [String]): Reviews
  }
`);

const root = {
	reviews: ({ sku }) => {
		const data = ratings.find((product) => sku.includes(product.sku));
	    return data;
    },
};

module.exports = { schema, root };
