const app = new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
    created: null,
    output: '',
  },
  methods: {
    async createUrl() {
      console.log(`URL: ${this.url}, Slug: ${this.slug}, Output: ${this.output}`)
      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug,
          output: `${this.url}/${this.slug}`,
        }),
      })
      this.created = await response.json()
    },
  },
})

output.addEventListener('click', {})
