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