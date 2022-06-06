// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_id',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsTo(Tag, {
  through: {
    model: ProductTag,
    foreignKey: 'product_id'
  },
  as: 'product_tag'
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsTo(Tag, {
  trough: {
    model: ProductTag,
    foreignKey: 'product_id'
  },
  as: 'product_tag'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
