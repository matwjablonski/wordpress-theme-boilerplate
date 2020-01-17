const dotenv = require('dotenv');

dotenv.config();

const paths = {
  theme: './src/theme',
  public: `./public/wp-content/themes/${process.env.THEME_NAME}-theme`,
};

module.exports = { paths };
