export const CHECKOUT_CATEGORIES = {
    PIZZA: 'pizzas',
    OWN_PIZZA: 'ownPizzas',
    DRINK: 'drinks',
    SAUCE: 'sauces',
};

export const CHECKOUT_CATEGORIES_NAMES = {
    pizzas: 'Pizze',
    ownPiazzas: 'Własne pizze',
    drinks: 'Napoje',
    sauces: 'Sosy',
};

export const PAYMENT_METHODS = {
    CASH: 'gotówka',
    CARD: 'karta',
};

export const PAYMENT_TYPES = {
    IN_ADVANCE: 'z góry',
    ON_DELIVERY: 'przy odbiorze',
};

const INITIAL_CHECKOUT = {
    pizzas: [],
    ownPizzas: [],
    drinks: [],
    sauces: [],
    paymentMethod: PAYMENT_METHODS.CARD,
    paymentType: PAYMENT_TYPES.IN_ADVANCE,
};

class Checkout {
    constructor() {
        this.checkoutItems =
            parseInt(sessionStorage.getItem('checkoutItems')) || 0;
        this.checkout =
            JSON.parse(sessionStorage.getItem('checkout')) || INITIAL_CHECKOUT;
    }

    saveCheckoutToSessionStorage = () => {
        sessionStorage.setItem('checkout', JSON.stringify(this.checkout));
        sessionStorage.setItem('checkoutItems', `${this.checkoutItems}`);
    };

    addItem = (item, category) => {
        let isItemInCheckout = false;
        this.checkout[category].forEach((product, i) => {
            if (item._id === product._id) {
                isItemInCheckout = true;
                this.checkout[category][i].count++;
            }
        });
        if (!isItemInCheckout) {
            this.checkout[category].push({
                ...item,
                count: 1,
            });
        }
        this.checkoutItems++;
        this.saveCheckoutToSessionStorage();
    };

    removeItem = (id, category) => {
        let index = null;
        let count = 0;
        this.checkout[category].forEach((item, i) => {
            if (item._id === id) {
                index = i;
                count = item.count;
            }
        });
        if (count > 1) {
            this.checkout[category][index].count--;
        } else {
            this.checkout[category].splice(index, 1);
        }
        this.checkoutItems--;
        this.saveCheckoutToSessionStorage();
    };

    clearItem = (id, category) => {
        let index = null;
        let count = 0;
        this.checkout[category].forEach((item, i) => {
            if (item._id === id) {
                index = i;
                count = item.count;
            }
        });
        if (index >= 0 && count > 0) {
            this.checkout[category].splice(index, 1);
            this.checkoutItems -= count;
            this.saveCheckoutToSessionStorage();
        }
    };

    clearCheckout = () => {
        this.checkout = INITIAL_CHECKOUT;
        this.checkoutItems = 0;
        this.saveCheckoutToSessionStorage();
    };

    setPaymentType = (paymentType) => {
        this.checkout.paymentType = paymentType;
        this.saveCheckoutToSessionStorage();
    };

    setPaymentMethod = (paymentMethod) => {
        this.checkout.paymentMethod = paymentMethod;
        this.saveCheckoutToSessionStorage();
    };

    getCheckoutValue = () => {
        let value = 0;
        let c = Object.values(CHECKOUT_CATEGORIES);
        for (let i = 0; i < c.length; i++) {
            if (!this.checkout[c[i]]) {
                continue;
            }
            for (let j = 0; j < this.checkout[c[i]].length; j++) {
                const { count, price } = this.checkout[c[i]][j];
                value += count * price;
            }
        }

        return value;
    };

    createBooking = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            return null;
        }
        const booking = {
            pizzas: [],
            products: [],
            templates: [],
            user: currentUser.id,
            paymentMethod: this.checkout.paymentMethod,
            paymentType: this.checkout.paymentType,
        };
        this.checkout.pizzas.forEach((pizza) => {
            for (let i = 0; i < pizza.count; i++) {
                booking.pizzas.push(pizza.id);
                booking.templates.push(pizza.template.id);
            }
        });
        this.checkout.ownPiazzas.forEach((pizza) => {
            for (let i = 0; i < pizza.count; i++) {
                booking.pizzas.push(pizza.id);
            }
        });
        this.checkout.drinks.forEach((drink) => {
            for (let i = 0; i < drink.count; i++) {
                booking.products.push(drink.id);
            }
        });
        this.checkout.sauces.forEach((sauce) => {
            for (let i = 0; i < sauce.count; i++) {
                booking.products.push(sauce.id);
            }
        });

        return booking;
    };
}

export default Checkout;
