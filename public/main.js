const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
  //Here we send our PUT request
  fetch('/quotes', {
    //options here!
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: 'Darth Vader',
      quote: 'I find your lack of faith disturbing.',
    })
  })
    .then(res => {
      if (!res.ok) throw new Error(`Error with a status code of ${res.status}`);
      return res.json();
    })
    .then(res => {
      window.location.reload(true);
    });
})
const messageDiv = document.querySelector('#message');

const deleteButton = document.querySelector('#delete-button');

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader',
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete this resource...')
      return res.json();
    })
    .then(res => {
      console.log(res)
      if (res === 'No quote to delete!') {
        messageDiv.textContent = 'No Darth Vader quote to delete';
      } else {
        window.location.reload(); 
      }
    });
});
