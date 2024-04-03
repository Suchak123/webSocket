let socket = io();
let btn = document.querySelector('#btn')
let sidebar = document.querySelector('.sidebar');
function myfunction() {
       sidebar.classList.toggle('active');
}

function scrollToButton(){
       let messages = document.querySelector('#messages').lastElementChild;
       messages.scrollIntoView();
}


socket.on('connect', function() {

       let searchQuery = window.location.search.substring(1);
       let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, '" "').replace(/=/g, '":"') + '"}');

       socket.emit('join', params, function(err) {
              if(err){
                     alert(err);
                     window.location.href = '/';
              }else{
                     console.log('No error');
              }
       })

});
       
       socket.on('disconnect', function() {
        console.log('disconnected from server');
       });

       socket.on('newMessage', function(message) {
              const formattedTime = moment(message.createdAt).format('LT')
              const template = document.querySelector('#message-template').innerHTML;
              const html = Mustache.render(template, {
                     from: message.from,
                     text: message.text,
                     createdAt: formattedTime
              });

              const div = document.createElement('div');
              div.innerHTML = html
              // document.querySelector('#form-message').appendChild(div);
              document.querySelector('.container-1').append(div);
              scrollToButton();

       //        const formattedTime = moment(message.createdAt).format('LT')
       //        let li = document.createElement('li');
       //        li.innerText = `${message.from} ${formattedTime} :${message.text}`

       //  document.querySelector('.container-1').appendChild(li);
       });

       socket.on('newLocationMessage', function(message) {
              const formattedTime = moment(message.createdAt).format('LT')
              const template = document.querySelector('#location-message-template').innerHTML;
              const html = Mustache.render(template, {
                     from: message.from,
                     url: message.url,
                     createdAt: formattedTime
              });

              const div = document.createElement('div');
              div.innerHTML = html
              document.querySelector('.container-1').append(div);
              scrollToButton();

       //        let li = document.createElement('li');
       //        let a = document.createElement('a');
       //        li.innerText = `${message.from} ${formattedTime}:`
       //        a.setAttribute('target', '_blank');
       //        a.setAttribute('href', message.url);
       //        a.innerHTML = ('My current location');
       //        li.appendChild(a);

       //  document.querySelector('.container-1').appendChild(li);
       });

       document.querySelector('#submit-btn').addEventListener('click', function(e) {
              e.preventDefault();

              socket.emit("createMessage", {
                     from: "User",
                     text: document.querySelector('input[name="message"]').value
              }, function () {

              });
       });
       document.querySelector('#send-location').addEventListener('click', function(e) {
              if(!navigator.geolocation){
                     return alert('Geolocation not supported by your browser')
              }

              navigator.geolocation.getCurrentPosition(function (position){
                     socket.emit('createLocationMessage', {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                     })
              }, function() {
                     alert('Unable to fetch location')
              }
              )
       });