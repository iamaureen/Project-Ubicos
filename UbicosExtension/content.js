  var username_id
  var username
  var userID
  //data structure for sending to server
  var data = {}
  var array = []


$(document).ready(function(){

  console.log("page loaded successfully")

  //get if user is logged in or not
  var body_class = $('body').attr('class');
  if(body_class.includes("logged-in")){
    console.log("User is logged in")
    //since logged in, get user name
    username_id = $('div.game-box__user-info').find('a').attr('href').split("/")[2]
    username = username_id.split("-")[0]
    userID = username_id.split("-")[1]
    console.log(username)

    data['username'] = username

  }else{
    console.log("User is logged out")
  }

  //get the website url
  base_url = document.location.href
  console.log("website url ::", base_url)
  data['url'] = base_url

  //if user visits a question page, get the question id
  if(base_url.includes("question")){
    var res = base_url.split("/");
    data['questionID'] = res[4]
    console.log("question ID :: ",res[4])
    array.push("User viewed question " + res[4])
  }

  //if user searches, get the search content
  if(base_url.includes("app/ask")){
    //sample url: https://brainly.com/app/ask?entry=top&q=fraction%20ratio
    var query = base_url.split("&")[1].split("=")[1].replace("%20", " ")
    console.log(query)
    data['queryByUser'] = query
  }

  //detects the time when the page is loaded
  data['time'] = new Date().toLocaleTimeString()

  //detects whether user clicks on search textbox -
  //when user is not logged in
  $('div.sg-search').click(function() {
    // array.push("user attempted to search")
    // data['activity'] = array
    array.push("user attempted search")
    console.log("user attempted search")

    });

    //for a specific div class, find its specfic child with class
    //detects whether user clicks on search textbox -
    //when user is logged in
    $('div.sg-header__middle').find('form.sg-search').click(function(){
      console.log("user attemped to search")
      array.push("user attempted to search")
    });


    //when user is logged in - detect if user wants to ask a question
    //in case of class name with space, put . in the place of space
    $('a.add-task.sg-button-primary.sg-button-primary--alt.js-ask-question-button').click(function(){
      array.push("Add question button clicked")
      console.log("Add question button clicked")
    });

    //whether user attempted to answer any question
    $('a.js-trigger-add-answer.sg-textarea.sg-textarea--full-width.sg-textarea--tall.sg-textarea--simple').click(function(){
      console.log("User attempted to answer question ", data['questionID'] )
      array.push("User attempted to answer question " + data['questionID'] )
    });

    //whether user clicked "Add your answer" button
    $('button.sg-button-primary.js-add-answer-button').click(function(){
      console.log("User clicked Add your answer button")
      array.push("User clicked Add your answer button")
    });




 }); //end of window.ready()


//save log in the database
//https://stackoverflow.com/questions/28627111/how-to-call-a-function-before-leaving-page-with-javascript
//https://stackoverflow.com/questions/9973816/why-is-jquery-unload-not-working-in-chrome-and-safari
 $(window).bind("beforeunload",function(){
    console.log("leaving")
    data['activity'] = array

    //save in the local storage
    chrome.storage.sync.set({ "log": data }, function(){
      //  A data saved callback
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });

    //get all the item from chrome local storage
    chrome.storage.sync.get("log", function(items) { // null implies all items
       // Convert object to a string.
       var result = JSON.stringify(items);
       console.log(result)
       $.ajax({
         type: 'POST',
         contentType: 'application/json',
         url: 'http://127.0.0.1:8000/postLOG/',
         data: result,
         success: function (data, textStatus, xhr) {
                   console.log(data);
           },
           error: function (xhr, textStatus, errorThrown) {
                     console.log('Error in Operation');
           }

       }); //end of ajax call
   });
});
