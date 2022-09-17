let postArr = []
function renderPost() {
  let html = ''
  for (let post of postArr) {
    html += `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr />
      `
    document.getElementById('blog-list').innerHTML = html
  }
}
fetch('https://apis.scrimba.com/jsonplaceholder/posts')
  .then((response) => response.json())
  .then((data) => {
    postArr = data.slice(0, 5)
    renderPost()
  })

document
  .getElementById('new-post')
  .addEventListener('submit', function (event) {
    event.preventDefault()
    const postTitle = document.getElementById('post-title').value
    const postBody = document.getElementById('post-body').value
    const data = {
      title: postTitle,
      body: postBody,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(data), //body always need to be string.
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
      .then((response) => response.json())
      .then((post) => {
        postArr.unshift(post)
        renderPost()
        document.getElementById('new-post').reset()
      })
  })
