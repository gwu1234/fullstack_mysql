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

  self.addEventListener('message', event => {
    // event is an ExtendableMessageEvent object
    console.log(`The client sent me a message: ${event.data}`);
  
    event.source.postMessage("Hi client, greeting from serviveWork");
  });