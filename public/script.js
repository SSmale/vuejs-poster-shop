const PRICE = 9.99

new Vue({
    el: '#app',
    data: {
        loading: false,
        total: 0,
        searchTerm: 'lol',
        lastSearchTerm: '',
        cartItems: [],
        results: [],
        items: []
    },
    methods: {
        onSubmit: function () {
            this.results = [];
            this.loading = true;
            this.$http
                .get(`/search/${this.searchTerm}`)
                .then(function (r) {
                    this.results = r.data;
                    this.lastSearchTerm = this.searchTerm;
                    this.loading = false;
                })
        },
        addItem: function (index) {
            this.total += PRICE
            let item = this.results[index]
            let found = false
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].id === item.id) {
                    this.cartItems[i].qty++;
                    found = true
                    break
                }
            }
            if (!found) {
                this.cartItems.push({
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
                for (let i = 0; i < this.cartItems.length; i++) {
                    if (this.cartItems[i].id === item.id) {
                        this.cartItems.splice(i, 1)
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
    },
    mounted: function () {
        this.onSubmit()
    }
});