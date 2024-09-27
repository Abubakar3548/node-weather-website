
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
// messageOne.textContent = 'From Javascript'
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
     if (data.error) {
      messageOne.textContent = data.error
      //  console.log(data.error)
     } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
      
     }
    })
 })
 
})
 
// CHALLENGE
//1. Select the second message p from javascript
//2. Just before fetch, render loading message and empty p
//3. If error, render  error
//4. If no error, render locatio and forecast
//5. Test your work! Search for error and for valid locations



