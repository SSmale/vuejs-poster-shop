const PRICE = 9.99

new Vue({
    el: '#app',
    data: {
        total: 0,
        searchTerm: '',
        cart: [],
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
        ]
    },
    methods: {
        onSubmit: {

        },
        addItem: function (index) {
            this.total += PRICE
            let item = this.items[index]
            let found = false
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].qty++;
                    found = true
                    break
                }
            }
            if (!found) {
                this.cart.push({
                    title: item.title,
                    qty: 1,
                    id: item.id,
                    price: PRICE
                })
            }
        },
        inc: function (item) {
            this.total += item.price
            item.qty++;
        },
        dec: function (item) {
            this.total -= item.price
            item.qty--;
            if (item.qty <= 0) {
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === item.id) {
                        this.cart.splice(i, 1)
                        break
                    }
                }
            }
        }
    },
    filters: {
        currency: function (value) {
            return `£${value.toFixed(2)}`
        }
    }
});