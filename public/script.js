const PRICE = 9.99

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [{
                id: 1,
                title: 'item1'
            },
            {
                id: 2,
                title: 'item2'
            },
            {
                id: 3,
                title: 'item3'
            }
        ],
        cart: []
    },
    methods: {
        addItem: function (index) {
            this.total += PRICE
            let item = this.items[index]
            let found = false
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].qty++;
                    found = true
                }
            }
            if (!found) {
                this.cart.push({
                    title: item.title,
                    qty: 1,
                    id: item.id
                })
            }
        }
    }
});