self.addEventListener('push', event => {
    console.log(event.currentTarget.location);
    console.log(event.data);
    const text = event.data.text();
    console.log(text);
    const data = event.data.json();
    console.log(data);
    const options = {
      body: data.body,
    };
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  })