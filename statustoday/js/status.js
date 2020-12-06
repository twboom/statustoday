// Making function to check if the site is reachable
function status(url,file,callback) {
  // Try to load the favicon
  let timer = setTimeout(function(){
    // Timeout after 5 seconds
    callback(false);
  },5000)

  // Creating the image that will come from server
  let img = document.createElement('img');

  // Detect when the images loads (this means success)
  img.onload = function() {
    clearTimeout(timer);
    callback(true);
  }

  // Detect when image doesn't laod (this means a fail)
  img.onerror = function() {
    clearTimout(timer);
    callback(false);
  }

  img.src = url+'/'+file
}

// Implementing the function on the website
function fetch() {
status(url,file,function(found){

  // When the function returns that images is found
  if(found) {
    document.querySelector('#outputText').innerHTML = 'online';
    console.log('found');
  }

  // When the function returns that images isn't found
  else {
    // TODO: Implement some kind of error
    console.log('error')
  }
})
};

window.onload = fetch;
