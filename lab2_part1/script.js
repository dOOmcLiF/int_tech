const products = [
    { name: "apple", count: 5, price: 70 },
    { name: "orange", count: 10, price: 90 }
];

let totalCost = 0;
products.forEach(product => {
    totalCost += product.count * product.price;
});

console.log("Общая стоимость товаров:", totalCost);

const bill = {
    bill: products,
    result: totalCost
};

console.log(JSON.stringify(bill));

const currentDate = new Date();
console.log("Текущая дата и время:", currentDate.toString());
