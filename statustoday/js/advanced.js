// Implementing the function on the website
function fetch(url,file) {
status(url,file,function(found){

  // When the function returns that images is found
  if(found) {
    document.querySelector('#sixteen').innerHTML = 'found';
    console.log('found');
  }

  // When the function returns that images isn't found
  else {
    // TODO: Implement some kind of error
    console.log('error')
  }
})
};
