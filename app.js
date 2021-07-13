
//selectors
let mystream;

let count =0;
let people = document.querySelector('.count');
let intro = document.querySelector('.intro');
let male = document.getElementById("male");
let female = document.getElementById("female");
let start = document.querySelector(".container");
let local = document.querySelector("#local");
let startMeet = document.querySelector('.startmeet');


//event listeners


//functions

function clicked()
{ 
    startMeet.remove();
    if(male.checked)
    {
    callAvatar(male);
    } else{
    callAvatar(female);
    }
  intro.style.opacity = 0;
  start.classList.add('fadein');
  start.style.opacity =1;
  nowYes();
}

function callAvatar(avatar)
{
    local.classList.add('avatar');
   local.style.backgroundImage = `url(./assets/${avatar.value}.png)`;
}


function nowYes()
{
    
let mute = false;

// client creation
let client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

// initialized the client
client.init("f97d47c0e22b4232944b8d1cbfc6dd8d");
  
// creating the channel
client.join(
  "006f97d47c0e22b4232944b8d1cbfc6dd8dIAAghE46fDDvjt7OS5P6PAW6EgsH7CN7fmMZAenaOhgWUHNyD9kAAAAAEAAHiSHUaa3uYAEAAQBore5g",
  "demoo",
  null,
  (uid) => {
    // Create a local stream
    let localStream = AgoraRTC.createStream({
      audio: true,
      video: true,
      
    });
    localStream.init(() => {
    
      mystream = localStream;
      localStream.play("local");
      client.publish(localStream);
    });
  }
);

client.on("stream-added", function (evt) {
  client.subscribe(evt.stream);
});

client.on("stream-subscribed", function (evt) {
  count++;
  updateCount(count);
    // 
  let stream = evt.stream;
  let streamId = String(stream.getId());
  let othersContainer = document.querySelector('.others-container');
  let div = document.createElement("div");
   div.id = streamId;
   othersContainer.style.display = "flex";
   othersContainer.style.textAlign = "left";
   othersContainer.style.justifyContent = "space-between";
   div.style.margin = '0rem 0.8rem 0.5rem auto';
   div.style.border = "2px solid #000";

  othersContainer.appendChild(div);
  stream.play(streamId);
});


// Remove the corresponding view when a remote user unpublishes.
client.on("stream-removed", function(evt){

  let stream = evt.stream;
  let streamId = String(stream.getId());
  stream.close();
  console.log(streamId)

  removeVideoStream(streamId);
});
// Remove the corresponding view when a remote user leaves the channel.
client.on("peer-leave", function(evt){
  let stream = evt.stream;
  let streamId = String(stream.getId());
  stream.close();
  console.log(streamId)

  removeVideoStream(streamId);

});
function removeVideoStream(elementId) {

  let remoteDiv = document.querySelector("#elementId");
  remoteDiv.remove();
  
};



}

function updateCount(count)
{
    people.innerHTML = `<span>${count}</span>`;
}
function muteAudio() {
  mystream.muteAudio();
 let muted =  document.querySelector('.btn-grad-1');
 let unmuted = document.querySelector('.btn-grad-2');

 muted.classList.add('opacity50');
 muted.classList.remove('opacity100');
 muted.style.pointerEvents = "none";
 unmuted.style.pointerEvents = "all";
  unmuted.classList.add('opacity100');
  unmuted.classList.remove('opacity50');

  
}

function unmuteAudio() {
  mystream.unmuteAudio();
  let muted =  document.querySelector('.btn-grad-1');
 let unmuted = document.querySelector('.btn-grad-2');

 muted.classList.add('opacity100');
 unmuted.classList.remove('opacity100');
 unmuted.classList.remove('opacity50');
  unmuted.classList.add('opacity50');
 unmuted.style.pointerEvents = "none";
 muted.style.pointerEvents = "all";


}

function leaveMeet()
{
  document. location. reload();

}
