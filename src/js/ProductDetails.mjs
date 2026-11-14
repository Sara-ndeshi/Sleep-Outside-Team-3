import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // get the details for the current product (findProductById returns a promise)
        this.product = await this.dataSource.findProductById(this.productId);

        // show the details on the page
        this.renderProductDetails();

        // listen for clicks on the Add to Cart button
        // .bind(this) keeps "this" pointing at this class
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        document.title = `Sleep Outside | ${this.product.Name}`;

        document.querySelector(".product-detail h3").textContent =
            this.product.Brand.Name;
        document.querySelector(".product-detail h2").textContent =
            this.product.NameWithoutBrand;

        const image = document.querySelector(".product-detail img");
        image.src = this.product.Image;
        image.alt = this.product.NameWithoutBrand;

        document.querySelector(".product-card__price").textContent =
            `$${this.product.FinalPrice}`;
        document.querySelector(".product__color").textContent =
            this.product.Colors[0].ColorName;
        document.querySelector(".product__description").innerHTML =
            this.product.DescriptionHtmlSimple;

        document.getElementById("addToCart").dataset.id = this.product.Id;
    }
}