import {
    faUserCircle,
    faShoppingBasket,
    faPizzaSlice,
    faMapMarked,
    faKey,
} from '@fortawesome/free-solid-svg-icons';

const list = [
    {
        name: 'Konto',
        link: '/myAccount',
        icon: faUserCircle,
    },
    {
        name: 'Zamówienia',
        link: '/myAccount/orders',
        icon: faShoppingBasket,
    },
    {
        name: 'Moje Pizze',
        link: '/myAccount/pizzas',
        icon: faPizzaSlice,
    },
    {
        name: 'Adresy dostawy',
        link: '/myAccount/adresses',
        icon: faMapMarked,
    },
    {
        name: 'Zmiana hasła',
        link: '/myAccount/changePassword',
        icon: faKey,
    },
];

export default list;
