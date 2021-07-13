let count =0;
let people = document.querySelector('.count');
let intro = document.querySelector('.intro');
let male = document.getElementById("male");
let female = document.getElementById("female");
let start = document.querySelector(".container");
let local = document.querySelector("#local");

//event listeners


//functions

function clicked()
{ 
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
// Handle errors.
let handleError = function(err){
    console.log("Error: ", err);
};

// Query the container to which the remote stream belong.
let remoteContainer = document.getElementById("remote");

// Add video streams to the container.
function addVideoStream(elementId){
    // Creates a new div for every stream
    let streamDiv = document.createElement("div");
    // Assigns the elementId to the div.
  let othersContainer = document.querySelector('.others-container');
    
    streamDiv.id = elementId;
    // Takes care of the lateral inversion
    // streamDiv.style.transform = "rotateY(180deg)";
    streamDiv.style.margin = '0rem 0.8rem 0.5rem auto';
    streamDiv.style.border = "2px solid #000";
 
   othersContainer.appendChild(div);
    // Adds the div to the container.
    // remoteContainer.appendChild(streamDiv);
    
};

// Remove the video stream from the container.
function removeVideoStream(elementId) {
    let remoteDiv = document.getElementById(elementId);
    if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
};

let client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

client.init("f97d47c0e22b4232944b8d1cbfc6dd8d", function() {
    console.log("client initialized");
}, function(err) {
    console.log("client init failed ", err);
});

// Join a channel
client.join("006f97d47c0e22b4232944b8d1cbfc6dd8dIAAghE46fDDvjt7OS5P6PAW6EgsH7CN7fmMZAenaOhgWUHNyD9kAAAAAEAAHiSHUaa3uYAEAAQBore5g", "demo", null, (uid)=>{
    // Create a local stream
  }, handleError);

  let localStream = AgoraRTC.createStream({
    audio: true,
    video: true,
});
// Initialize the local stream
localStream.init(()=>{
    // Play the local stream
    localStream.play("local");
    // Publish the local stream
    client.publish(localStream, handleError);
}, handleError);

// Subscribe to the remote stream when it is published
client.on("stream-added", function(evt){
    client.subscribe(evt.stream, handleError);
});
// Play the remote stream when it is subsribed
client.on("stream-subscribed", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    addVideoStream(streamId);
    stream.play(streamId);
});

// Remove the corresponding view when a remote user unpublishes.
client.on("stream-removed", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    stream.close();
    removeVideoStream(streamId);
});
// Remove the corresponding view when a remote user leaves the channel.
client.on("peer-leave", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    stream.close();
    removeVideoStream(streamId);
});

}
function updateCount(count)
{
    people.innerHTML = `<span>${count}</span>`;
}