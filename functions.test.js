const functions = require('./functions');
const handleSubmit = require('./src/client/js/formHandler');
'use strict';

/*test('anything', () => {
  expect.assertions(1);
  return functions.fetchUser().then(data =>{
      expect(data.name).toEqual('Leanne Graham');
    })
})*/
test('formHandler testing',() => {
  // Set up our document body
  var $ = require("jquery");
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';
  $('#button').click();
  //expect.assertions(1); 
  return handleSubmit().then(data =>{
      expect(data.polarity).Not.toEqual('');    
})
})