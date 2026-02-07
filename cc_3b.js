let inventory = [
    { sku: "SKU-001", name: "Eco Bottle", price: 19.99, stock:42 },
    { sku: "SKU-002", name: "Canvas Tote", price: 14.5, stock:10 },
    { sku: "SKU-003", name: "Bamboo Cutlery", price: 9.99, stock: 5 },
    { sku: "SKU-004", name: "Reusable Straws", price: 7.25, stock: 20}
];

inventory.forEach(product => {
    console.log(
        `${product.sku} | ${product.name} | $${product.price.toFixed(2)} | Stock: ${product.stock}`
    );
});

inventory.push({
    sku: "SKU-005",
    name: "All Cotten Towel",
    price: 24.99,
    stock: 8
});
console.log("Added new product.");

let removedProduct = inventory.pop();
console.log(`Removed product: ${removedProduct.name}`);

inventory[2].stock += 15;
console.log(`Restocked ${inventory[2].name}`);

let orders = [
    {
        orderId: "ORD-1001",
        items: [
            { sku: "SKU-001", qty: 2 },
            { sku: "SKU-003", qty: 1 }
        ]
    },
    {
        orderId: "ORD-1002",
        items: [
            { sku: "SKU-002", qty: 12 }
        ]
    }
];

orders.forEach(order => {
    let orderTotal = 0;
    let canFulfill = true;
    let shortageMessage = "";

    order.items.forEach(item => {
        let product = inventory.find(p => p.sku === item.sku);

        if (!product || product.stock < item.qty) {
            canFulfill = false;
            shortageMessage = `Insufficient stock for SKU ${item.sku}`;
        }
    });
    if (canFulfill) {
        order.items.forEach(item => {
            let product = inventory.find(p => p.sku === item.sku);
            product.stock -= item.qty;
            orderTotal += product.price * item.qty;
        });

        console.log(
            `Order ${order.orderId} processed. Total: $${orderTotal.toFixed(2)}`
        );
    } else{
        console.log(`Order${order.orderId} failed: ${shortageMessage}`);
    }
})

let totalInventoryValue = inventory.reduce((total, product) => {
    return total + product.price * product.stock;
}, 0);

console.log(`Total inventory value: $${totalInventoryValue.toFixed(2)}`);

let lowStockItems = inventory.filter(product => product.stock <= 5);

console.log("Low stock items");
lowStockItems.forEach(item => {
    console.log(`${item.name} (Stock: ${item.stock})`);
});

let priceList = inventory.map(product => {
    return `${product.sku} - $${product.price.toFixed(2)}`;
});

console.log("Price List:");
priceList.forEach(line => console.log(line));
