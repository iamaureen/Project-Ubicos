// A function to use as callback
function doStuffWithDom(domContent) {
    //console.log('I received the following DOM content:\n' + domContent);
    post_to_server(domContent);

}



var url = "https://brainly.com/"

  // Called when the user clicks on the browser action.
  chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log(tab.id)
    //the following statement prints "undefined"
    //if activeTab permission is not stated in json file
    console.log(tab.url)

    if (url == (tab.url)) {
         // ...if it matches, send a message specifying a callback too
         //console.log(document.all[0].outerHTML); // outputs background.html content, since this js is tied with this
         chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
     }

});

function post_to_server(domContent){
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: 'http://127.0.0.1:8000/postHTML/',
    data: JSON.stringify(domContent),
    success: function (data, textStatus, xhr) {
              console.log(data);
      },
      error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
      }

  });

}
