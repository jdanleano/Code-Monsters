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
        videoLink: iframe.src,
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

const getCommentsByVideoLink = (videoLink) => {
    // const snapshot = await db.collection('video-comments').get()
    // const collection = {};
    // snapshot.forEach(doc => {
    //     collection[doc.id] = doc.data();
    // });
    // console.log(collection)
    // return collection;
    db.collection("video-comments").where("videoLink", "==", videoLink).orderBy("date").onSnapshot(function(snapshot){

        snapshot.docChanges().forEach(function(change,ind){
            var data = change.doc.data();
            // if new message added
    
            const embedContainer = document.getElementById("embed-container");
            console.log(embedContainer.hasChildNodes());
    
            if(change.type == "added"){
                console.log(data);
                // if(data.senderName == name){ //Which message i sent 
    
                //     var html = `<li class="left clearfix">
                //         <span class="chat-img pull-left">
                //             <img src="http://placehold.it/50/55C1E7/fff&text=${data.senderName}" alt="User Avatar" class="img-circle" />
                //         </span>
                //         <div class="chat-body clearfix">
                //             <div class="header">
                //                 <strong class="primary-font">${data.senderName}</strong> <small class="pull-right text-muted">
                //                     <span class="glyphicon glyphicon-time"></span>${data.date}</small>
                //             </div>
                //             <p id="${change.doc.id}-message">
                //                 ${data.message}
                //             </p>
                //             <span onclick="deleteMessage('${change.doc.id}')" class="glyphicon glyphicon-trash"></span> 
                //         </div>
                //     </li>`;
    
                //     $('.chat').append(html);
    
                // }else{
    
                //     var html = `<li class="right clearfix">
                //         <span class="chat-img pull-right">
                //             <img src="http://placehold.it/50/FA6F57/fff&text=${data.senderName}" alt="User Avatar" class="img-circle" />
                //         </span>
                //         <div class="chat-body clearfix">
                //             <div class="header">
                //                 <small class=" text-muted">
                //                     <span class="glyphicon glyphicon-time"></span>${data.date}</small>
                //                 <strong class="pull-right primary-font">${data.senderName}</strong>
                //             </div>
                //             <p id="${change.doc.id}-message">
                //                 ${data.message}
                //             </p>
                //             <span onclick="deleteMessage('${change.doc.id}')" class="glyphicon glyphicon-trash"></span> 
                //         </div>
                //     </li>`;
    
                //     $('.chat').append(html);
    
                // }
                // if(snapshot.docChanges().length - 1 == ind){ // we will scoll down on last message
                //     // auto scroll
                //     $(".panel-body").animate({ scrollTop: $('.panel-body').prop("scrollHeight")}, 1000);
                // }
            }
    
            if(change.type == "modified"){
    
            }
    
            if(change.type == "removed"){
    
                //$("#"+change.doc.id+"-message").html("this message has been deleted")
    
            }
    
        })  
    
    })
}
