class MenuItem {
    constructor(title, price, description, imageUrl, category) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.like = like;
        this.reviews = [];
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            description: this.description,
            imageUrl: this.imageUrl,
            category: this.category,
            like: this.like,
            reviews: this.reviews
        };
    }
}

export default MenuItem;