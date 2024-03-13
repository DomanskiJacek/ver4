// This is for getting the csrf token in localhost without a form when {% csrf_token %} does not work
const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

  const countLoad = (url, csrftoken) => {
    data = {
      url: url,
    }
    fetch("count", {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        if (!res.success) {
          console.log('Count failed')
          console.log(res.error)
        }
      })
  }
