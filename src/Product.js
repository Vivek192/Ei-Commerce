// Product.js

class Product {
  constructor(name, price, availability = true) {
    this.id = Math.random().toString(36).substr(2, 9); // Generating a random ID
    this.name = name;
    this.price = price;
    this.availability = availability;
  }

  // Clone method for Prototype Pattern
  clone() {
    return new this.constructor(this.name, this.price, this.availability);
  }
}

class DiscountedProduct extends Product {
  constructor(name, price, availability, discountStrategy, imageUrl) {
    super(name, price, availability);
    this.discountStrategy = discountStrategy;
    this.imageUrl = imageUrl;
  }

  // Apply discount using the Strategy Pattern
  applyDiscount() {
    return this.discountStrategy.applyDiscount(this.price);
  }

  // Get the original price
  getOriginalPrice() {
    return this.price;
  }
}

// Concrete discount strategy
class PercentageOffStrategy {
  applyDiscount(price) {
    return price * 0.8; // 20% off
  }
}

class BuyOneGetOneFreeStrategy {
  applyDiscount(price) {
    return price;
  }
}

export { Product, DiscountedProduct, PercentageOffStrategy, BuyOneGetOneFreeStrategy };
