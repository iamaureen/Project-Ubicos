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
console.log("page url :: ", document.location.href)



//$(window).bind("load", function() { //works the first time page loads. since it is already loaded next time,
                                    //only content changes does not fire this function

  // code here
  setTimeout(function(){

    console.log("line 28 :: im done loading!");

    var username = $(".nicknameDisplay_1i9m8bl").html();
    console.log("name :: ", username)
    //console.log('line 29 :: ',$('a.show-answer-form'));
    //show the entire discussion thread on this page
    console.log('line 30 :: discussion thread',$("div.default_olfzxm-o_O-container_k9kem1"));
    //total number of visible questions in this page - without pressing the show more button
    console.log('line 33 :: total questions posted ', $(".post_b12blo").length)
    console.log('line 33 :: ', $("ul.listWrapper_17u7rry li").length)
    //div class for both question post and answer post
    console.log('line 35 :: ', $("div.default_olfzxm-o_O-everythingButTheAvatar_py3uvl").length);
    //div class for button classes
    console.log('line 37 :: any button event div?', $("div.default_olfzxm-o_O-postFooter_16ru1fn").length);
    //capture button classes for this page <reply, comment buttons>
    console.log('line 39 :: any button class to log?', $("div.default_olfzxm-o_O-postFooter_16ru1fn button.linkStyledButton_ycurob").length);


    //detect click 'answer this question'
    $("div.default_olfzxm-o_O-postFooter_16ru1fn button.linkStyledButton_ycurob").off().click(function(e){
      var action = "";
      var type = "";
      var input = "";
      var pagenumber = "";
      data = {};

      //clicked item
      var clicked = $(e.target);
      console.log(clicked);
      //ancestor of clicked item with class name = thread
      //https://api.jquery.com/closest/
      var thread = clicked.closest("div.default_olfzxm-o_O-everythingButTheAvatar_py3uvl");
      console.log(thread);
      //console.log('action: click, action_type: answer question')
      data['username'] = thread[0].children[0].children[0].children[0].children[0].children[0].innerText;
      console.log('username who posted: ',thread[0].children[0].children[0].children[0].children[0].children[0].innerText);
      //console.log(thread[0].children[2].childElementCount)
      //check if question comment is clicked or answer comment - both has the same classname, so identifying using number of children
      if(thread[0].children[2].childElementCount>3){
        console.log('type :: question reply/comment')
        action = 'question reply/comment'
        data['votes'] = thread[0].children[2].children[4].children[0].innerHTM;
        console.log('number of votes for this post: ',thread[0].children[2].children[4].children[0].innerHTML);
      }else{
        action = 'answer comment'
        data['votes'] = thread[0].children[2].children[0].children[0].innerText;
        console.log('type :: question reply/answer comment')
        console.log('number of votes for this post: ',thread[0].children[2].children[0].children[0].innerText);
      }

      data['content'] = thread[0].children[1].children[0].children[0].innerText;
      console.log('question content: ',thread[0].children[1].children[0].children[0].innerText);

      console.log(JSON.stringify({
              'action': action,
              'type': type,
              'input': data,
              'pagenumber': 121212//in case of extension pagenumber is current link
            }))

      $.ajax({

         type: 'POST',
         url: 'http://127.0.0.1:8000/extensionlog/', //this works
         //url: 'https://hcilabasu.pythonanywhere.com/extensionlog/',
         data: JSON.stringify({
                 'username':username,
                 'action': action,
                 'type': type,
                 'input': data,
                 'pagenumber': 121212//in case of extension pagenumber is current link
               }),
         success: function (sdata, textStatus, xhr) {
                   console.log(sdata);
           },
           error: function (xhr, textStatus, errorThrown) {
                     console.log(xhr);
                     alert(xhr);
       }

      }); //end of ajax call

    });
    //detect student attempt to write answer
    // $('textarea').click(function(e){
    //   console.log($('textarea').length);
    // })
    $('textarea').off().on('change', function(e){
      console.log('user attemped to answer :: ', $(this).val()); //TODO: save input
      data['input'] = $(this).val()
      $.ajax({

         type: 'POST',
         //url: 'http://127.0.0.1:8000/extensionlog/', //this works
         url: 'https://hcilabasu.pythonanywhere.com/extensionlog/',
         data: JSON.stringify({
                 'username':username,
                 'action': 'user attemped to answer',
                 'type': 'user input',
                 'input': data,
                 'pagenumber': 121212//in case of extension pagenumber is current link
               }),
         success: function (sdata, textStatus, xhr) {
                   console.log(sdata);
           },
           error: function (xhr, textStatus, errorThrown) {
                     console.log(xhr);
                     alert(xhr);
       }

      }); //end of ajax call


    })
    //detect user click on 'more' that loads additional questions in the page
    $('button.button_1eqj1ga-o_O-shared_1gi2itp-o_O-default_9fm203-o_O-button_1ktyqnj').on('click',function(e){
      console.log($('ul.listWrapper_17u7rry li').length)

    });
    // button.button_1eqj1ga-o_O-shared_1gi2itp-o_O-disabled_e07bai-o_O-default_9fm203-o_O-disabled_h5jnhu-o_O-button_1ktyqnj
    //
    // button.button_1eqj1ga-o_O-shared_1gi2itp-o_O-default_9fm203-o_O-button_1ktyqnj

    console.log('line 83 :: ',$("button.button_1eqj1ga-o_O-shared_1gi2itp-o_O-default_9fm203-o_O-button_1ktyqnj").length)



  }, 5000);





//});
