const INITIAL_CHECKOUT = {
    pizzas: [],
    ownPiazzas: [],
    drinks: [],
    sauces: [],
    paymentMethod: '',
    paymentType: '',
};

export const CHECKOUT_CATEGORIES = {
    PIZZA: 'pizzas',
    OWN_PIZZA: 'ownPizza',
    DRINK: 'drinks',
    SAUCE: 'sauces',
};

export const PAYMENT_METHODS = {
    CASH: 'gotówka',
    CARD: 'karta',
};

export const PAYMENT_TYPES = {
    IN_ADVANCE: 'z góry',
    ON_DELIVERY: 'przy odbiorze',
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
        this.checkout[category].push(item);
        this.checkoutItems++;
        this.saveCheckoutToSessionStorage();
    };

    removeItem = (id, category) => {
        let index = null;
        this.checkout[category].forEach((item, i) => {
            if (item.id === id) {
                index = i;
            }
        });
        this.checkout[category].splice(index, 1);
        this.checkoutItems--;
        this.saveCheckoutToSessionStorage();
    };

    clearCheckout = () => {
        this.checkout = INITIAL_CHECKOUT;
        this.checkoutItems = 0;
        this.checkoutValue = 0;
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
        this.checkout.pizzas.forEach((pizza) => (value += pizza.price));
        this.checkout.ownPiazzas.forEach((pizza) => (value += pizza.price));
        this.checkout.sauces.forEach((sauce) => (value += sauce.price));
        this.checkout.drinks.forEach((drink) => (value += drink.price));

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
            booking.pizzas.push(pizza.id);
            booking.templates.push(pizza.template.id);
        });
        this.checkout.ownPiazzas.forEach((pizza) => {
            booking.pizzas.push(pizza.id);
        });
        this.checkout.drinks.forEach((drink) => {
            booking.products.push(drink.id);
        });
        this.checkout.sauces.forEach((sauce) => {
            booking.products.push(sauce.id);
        });

        return booking;
    };
}

export default Checkout;
