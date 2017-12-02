const PRICE = 9.99

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [{
                title: 'item1'
            },
            {
                title: 'item2'
            },
            {
                title: 'item3'
            }
        ],
        cart: []
    },
    methods: {
        addItem: function (index) {
            this.total += PRICE
            this.cart.push(this.items[index])
        }
    }
});