console.log("Admin JS Loaded");

var tokentable = document.querySelector('#tokentable');

db.collection(`fcm`).orderBy('timestamp','desc').onSnapshot(snap => {
  console.log(snap.size);
  snap.forEach(doc => {
    const data = doc.data();
    console.log(data.token);

    var html = `
    <tr>
        <td>${data.email}</td>
        <td id="userKey">
          ${data.token}
        </td>
        <td><button class="btn waves-effect waves-light blue" id=${data.token} onclick="sendtoken(this)">Send</button></td>
    </tr>
    `;
    tokentable.innerHTML+=html;
  })
})



let sendtoken = (el) => {
  console.log("Token Clicked : "+el.id);
  const destUrl = `https://us-central1-pdpu-medical-website.cloudfunctions.net/FCM?token=${el.id}`;
  fetch(destUrl).then((snap) => {

    console.log("Fetch success "+snap);

  }).catch((err) => {console.log("Error while fetching URL");});
}


