var db = firebase.firestore();

let chatNode = '';
document.getElementById("form-post-comment").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const iframe = document.getElementsByTagName("iframe")[0];
  const commentTxt = document.getElementById("text-area-comment");
  const comment = commentTxt.value;
  if(comment && iframe && iframe.src){
    commentTxt.value = "";
    const loggedInUser = getLoggedInUserFromLocalStorage();

    sendMessage({
        videoLink: iframe.getAttribute("data-link"),
        user : loggedInUser,
        comment : comment,
        date : moment().format("YYYY-MM-DD HH:mm")
    })
  }
}

function sendMessage(object){
    db.collection("video-comments").add(object).then(added => {
        console.log("message sent ",added)
    }).catch(err => {
        console.err("Error occured",err)
    })
}


const commentList = document.getElementById("comment-list");
const getCommentsByVideoLink = (video, clearComments) => {
    const videoLink = video.link;
    
    if(clearComments) commentList.innerHTML = "";

    db.collection("video-comments").where("videoLink", "==", videoLink).orderBy("date").onSnapshot(function(snapshot){

        snapshot.docChanges().forEach(function(change,ind){
            var data = change.doc.data();
            // if new message added
            if(change.type == "added"){

                const xx = document.createElement("article");
                xx.classList.add('media');
                xx.classList.add('m-6');

                const commentEl = `
                    <figure class="media-left">
                    <p class="image is-64x64">
                        <img src="${data.user.photoURL}">
                    </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                        <p>
                            <strong>${data.user.displayName}</strong>
                            <br>
                                ${data.comment}
                            <br>
                            <small><a>Like</a> · <a>Reply</a> · ${data.date}</small>
                        </p>
                        </div>
                    </div>
                `
                xx.innerHTML = commentEl;
                commentList.appendChild(xx);
                
            }
    
            if(change.type == "modified"){
    
            }
    
            if(change.type == "removed"){
    
                //$("#"+change.doc.id+"-message").html("this message has been deleted")
    
            }
    
        })  
    
    })
}
