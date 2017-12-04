const PRICE = 9.99
const LOAD_NUM = 10

new Vue({
    el: '#app',
    data: {
        loading: false,
        total: 0,
        price: PRICE,
        searchTerm: 'programming',
        lastSearchTerm: '',
        cartItems: [],
        results: [], // all items returned
        items: [] // shown items
    },
    methods: {
        appendItems: function () {
            if (this.items.length < this.results.length) {
                let append = this.results.splice(this.items.length, this.items.length + LOAD_NUM)
                this.items = this.items.concat(append)
            }
        },
        onSubmit: function () {
            this.items = [];
            this.loading = true;
            this.$http
                .get(`/search/${this.searchTerm}`)
                .then(function (r) {
                    this.results = r.data;
                    this.lastSearchTerm = this.searchTerm;
                    this.appendItems()
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

        let thisAlias = this
        let elem = document.getElementById('product-list-bottom')
        let watcher = scrollMonitor.create(elem)
        watcher.enterViewport(function () {
            thisAlias.appendItems()
        })
    },
    computed: {
        allResultsDisplayed: function () {
            return this.items.length === this.results.length && this.results.length > 0
        }
    }
});