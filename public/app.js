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
      document.getElementById('output-link').innerHTML = this.created.output
    },
  },
})

/**
 * Modal Controller
 * @description Sets modal dynamic functionality
 */
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
    // console.log('btn event triggered, showing modal')
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none'
    // console.log('span close event triggered')
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    // console.log('user clicked away from modal, closing modal')
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }
}

/**
 * Copy to Clipboard Controller
 */
function copyToClipboard() {
  // console.log('copyToClipboard init')

  /* Get the text field */
  let copyText = document.getElementById('output-link')

  /* Select the text field */
  copyText.select()
  copyText.setSelectionRange(0, 99999) /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand('copy')

  /* Log the copied text */
  // console.log(`Copied the text: ${copyText.value}`)
}

// Logging to ensure proper event bubbling
let outputModal = document.querySelector('#output-modal')
outputModal.addEventListener('click', function () {
  // console.log(`#output-modal clicked`)
})

// Logging to ensure proper event bubbling
let modalContent = document.querySelector('.modal-content')
modalContent.addEventListener('click', function () {
  // console.log(`.modal-content clicked`)
})

// Grabs content from generated #output-link text field and copies it to clipboard
let outputLink = document.querySelector('#output-link')
outputLink.addEventListener('click', function () {
  // console.log(`#output-link clicked`)
  copyToClipboard()
  document.getElementById('modal-footer-text').innerHTML = 'Link copied!'
  document.getElementById('modal-footer').style.backgroundColor = '#8cda26'
})
