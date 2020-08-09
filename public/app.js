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
      // console.log(`URL: ${this.url}, Slug: ${this.slug}, Output: http://ezl.ink/${this.slug}`)
      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug,
          output: `http://ezl.ink/${this.slug}`,
        }),
      })
      // Feeds into output in index.html
      this.created = await response.json()
    },
  },
})

// output.addEventListener('click', {})
