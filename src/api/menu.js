const menuItems = [
    {
        id: 1,
        name: 'Traditional Lemonade &amp; Mint',
        price: 2.39
    },
    {
        id: 2,
        name: 'Mojo Juice, Apple',
        price: 2.39
    },
    {
        id: 3,
        name: 'Mojo Juice, Mango',
        price: 2.39
    },
    {
        id: 4,
        name: 'Mojo Juice, Orange',
        price: 2.39
    },
    {
        id: 5,
        name: 'Tropical Lightning, Apple',
        price: 2.39
    }
];

const getItems = () => new Promise(resolve => {
    setTimeout(() => {
        resolve(menuItems);
    }, 1000);
});

export default {
    getItems
};
