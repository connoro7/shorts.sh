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

window.onload = function () {
  // Get the modal
  let modal = document.getElementById('output-modal')

  // Get the button that opens the modal
  let btn = document.getElementById('btn')

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName('close')[0]

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = 'block'
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none'
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }
}

/*
var copyEmailBtn = document.querySelector('.js-emailcopybtn')
copyEmailBtn.addEventListener('click', function (event) {
  // Select the email link anchor text
  var emailLink = document.querySelector('.js-emaillink')
  var range = document.createRange()
  range.selectNode(emailLink)
  window.getSelection().addRange(range)

  try {
    // Now that we've selected the anchor text, execute the copy command
    var successful = document.execCommand('copy')
    var msg = successful ? 'successful' : 'unsuccessful'
    console.log('Copy email command was ' + msg)
  } catch (err) {
    console.log('Oops, unable to copy')
  }

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported
  window.getSelection().removeAllRanges()
})
*/
