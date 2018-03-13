// content.js
// //with each click on the browser icon, it will print the following
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "clicked_browser_action" ) {
//       //gets the first external link on the page
//       var firstHref = $("a[href^='http']").eq(0).attr("href");
//
//       console.log(firstHref);
//
//       // This line is new!
//       //chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
//     }
//   }
// );
console.clear();
//code starts from here: IA
//everytime the page loads, it will print the following, only once.
console.log("page url ::", document.location.href)

//works in developers tool
//var question_text = document.getElementsByClassName("question discussion-item")[0].children[0].innerText;
//https://www.w3schools.com/jsref/dom_obj_event.asp
$(window).bind("load", function() {
  // code here
  setTimeout(function(){
    console.log("im done loading!");
    console.log($('a.show-answer-form'));
    $('.show-answer-form').click(function(e){

      //clicked item
      var clicked = $(e.target);
      console.log(clicked);

      //ancestor of clicked item with class name = thread
      //https://api.jquery.com/closest/
      var thread = clicked.closest('.thread');
      console.log(thread);
      console.log('action: click, action_type: answer question')
      console.log('question_content: ',thread[0].children[0].children[0].innerText);

    });

    var answer_btn = $('input.simple-button.primary.discussion-submit');
    answer_btn.on('click', function(e){
      var clicked = $(e.target).closest('.discussion-meta').siblings('.discussion-content') //returns div discussion-meta
      console.log(clicked)
      console.log('action: click, action_type: submit answer')
      var input = $('textarea.discussion-text.open')
      console.log('you entered',input.val().trim());
    });

    $('a.toggle-replies.show-replies').click(function(e){
      //var clicked = $(e.target.parentElement); //returns div discussion-meta-controls
      //var clicked = $(e.target).closest('.answers') //returns div answers
      var clicked = $(e.target).closest('.discussion-meta').siblings('.discussion-content') //returns div discussion-meta
      console.log(clicked)

      console.log('action: click, action_type: check comment')
      console.log('content:', clicked[0].innerText);

    });




  }, 5000);





});
