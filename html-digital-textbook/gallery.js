
    function showGallery(){

      $.ajax({
      type: 'GET',
      dataType: 'json',
      url: 'http://127.0.0.1:8000/getImage/',
      success: function (data, textStatus, xhr) {
                console.log('success:',data);
        },
        error: function (error, textStatus) {
                  console.log('error:', error);
        }

    }); //end of ajax call
      // var display = document.getElementById("gallery1").style.display;
      //
      // if(display == 'none'){
      //   document.getElementById("gallery1").style.display = "inline";
      //   document.getElementById("bigimages").style.display = "block";
      // }
      // else{
      //   document.getElementById("gallery1").style.display = "none";
      //   document.getElementById("bigimages").style.display = "none";
      // }
    }

    function changeImage(current) {
      var imagesNumber = 5;

      for (i=1; i<=imagesNumber; i++) {
        if (i == current) {
          document.getElementById("normal" + current).style.display = "block";
        } else {
          document.getElementById("normal" + i).style.display = "none";
        }
      }
    }
