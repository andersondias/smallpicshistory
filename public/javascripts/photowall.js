$(function() {
  /* this is the index of the last clicked picture */
  var current = -1;

  /* number of pictures */
  var totalpictures = $('#thumbs img').size();

  /* speed to animate the panel and the thumbs wrapper */
  var speed = 500;

  /* show the thumbs */
  $('#thumbs').show();

  /*
     when the user resizes the browser window,
     the size of the picture being viewed is recalculated;
  */
  $(window).bind('resize', function() {
    var $picture = $('#wrapper').find('img');
    resize($picture);
  });

  /*
     when hovering a thumb, animate it's opacity
     for a cool effect;
     when clicking on it, we load the corresponding large image;
     the source of the large image is stored as 
     the "alt" attribute of the thumb image
  */
  $('#thumbs > img').hover(function () {
      var $this   = $(this);
      $this.stop().animate({'opacity':'1.0'},200);
   }, function () {
      var $this   = $(this);
      $this.stop().animate({'opacity':'0.4'},200);
   }).bind('click',function(){
      var $this   = $(this);

      /* shows the loading icon */
      $('#loading').show();

      $('<img/>').load(function(){
        $('#loading').hide();

        current 	= $this.index();
        var $theImage   = $(this);
       /*
          After it's loaded we hide the loading icon
          and resize the image, given the window size;
          then we append the image to the wrapper
          */

       resize($theImage);

       //$('#wrapper').append($theImage);
       $('img#sample-image').replaceWith($theImage);

       /* make its opacity animate */
       $theImage.fadeIn(800);

       /* and finally slide up the panel */
       $('#photo-panel').fadeIn(speed, function(){
         /*
            if the picture has a description,
            it's stored in the title attribute of the thumb;
            show it if it's not empty
            */
         var title = $this.attr('title');
         if(title != '') 
         $('#description').html(title).show();
         else 
         $('#description').empty().hide();

         /*
            if our picture is the first one,
            don't show the "previous button"
            for the slideshow navigation;
            if our picture is the last one,
            don't show the "next button"
            for the slideshow navigation
            */
         if(current==0)
           $('#prev').hide();
         else
           $('#prev').fadeIn();
         if(current==parseInt(totalpictures-1))
           $('#next').hide();
         else
           $('#next').fadeIn();
         /*
            we set the z-index and height of the thumbs wrapper 
            to 0, because we want to slide it up afterwards,
            when the user clicks the large image
            */
         $('#thumbs-list').css({'z-index':'0'});
       });
     }).attr('src', $this.attr('alt'));
  });

  /*
     when hovering a large image,
     we want to slide up the thumbs wrapper again,
     and reset the panel (like it was initially);
     this includes removing the large image element
  */
  $('#wrapper > img').live('click',function(){
    $this = $(this);
    $('#description').empty().hide();

    $('#thumbs-list').css('z-index','10')
      .stop()
      .fadeIn(speed, function(){
        var $theWrapper = $(this);
        $theWrapper.css('z-index','0');
        $('#photo-panel').fadeOut(speed);
      });
  });

  /*
     when we are viewing a large image,
     if we navigate to the right/left we need to know
     which image is the corresponding neighbour.
     we know the index of the current picture (current),
     so we can easily get to the neighbour:
     */
  $('#next').bind('click',function(){
    var $this           = $(this);
    var $nextimage 		= $('#thumbs img:nth-child('+parseInt(current+2)+')');
    navigate($nextimage,'right');
  });

  $('#prev').bind('click',function(){
    var $this           = $(this);
    var $previmage 		= $('#thumbs img:nth-child('+parseInt(current)+')');
    navigate($previmage,'left');
  });

  /*
     given the next or previous image to show,
     and the direction, it loads a new image in the panel.
  */
  function navigate($nextimage,dir){
  /*
     if we are at the end/beginning
     then there's no next/previous
  */
    if(dir=='left' && current==0)
      return;
    if(dir=='right' && current==parseInt(totalpictures-1))
      return;
    $('#loading').show();
    $('<img/>').load(function(){
       var $theImage = $(this);
       $('#loading').hide();
       $('#description').empty().fadeOut();

       $('#wrapper img').stop().fadeOut(500,function(){
         var $this = $(this);

         $this.remove();
         resize($theImage);

         $('#wrapper').append($theImage.show());
         $theImage.stop().fadeIn(800);

         var title = $nextimage.attr('title');
         if(title != ''){
           $('#description').html(title).show();
         } else {
            $('#description').empty().hide();
         }

         if(current==0)
            $('#prev').hide();
         else
            $('#prev').show();

         if(current==parseInt(totalpictures-1))
            $('#next').hide();
         else
            $('#next').show();
       });

          /*
             increase or decrease the current variable
             */
          if(dir=='right')
            ++current;
          else if(dir=='left')
            --current;
        }).attr('src', $nextimage.attr('alt'));
  }

  /*
     resizes an image given the window size,
     considering the margin values
  */
  function resize($image){
    var windowH      = $(window).height()-100;
    var windowW      = $(window).width()-80;
    var theImage     = new Image();
    theImage.src     = $image.attr("src");
    var imgwidth     = theImage.width;
    var imgheight    = theImage.height;

    if((imgwidth > windowW)||(imgheight > windowH)){
      if(imgwidth > imgheight){
        var newwidth = windowW;
        var ratio = imgwidth / windowW;
        var newheight = imgheight / ratio;
        theImage.height = newheight;
        theImage.width= newwidth;
        if(newheight>windowH){
          var newnewheight = windowH;
          var newratio = newheight/windowH;
          var newnewwidth =newwidth/newratio;
          theImage.width = newnewwidth;
          theImage.height= newnewheight;
        }
      }
      else{
        var newheight = windowH;
        var ratio = imgheight / windowH;
        var newwidth = imgwidth / ratio;
        theImage.height = newheight;
        theImage.width= newwidth;
        if(newwidth>windowW){
          var newnewwidth = windowW;
          var newratio = newwidth/windowW;
          var newnewheight =newheight/newratio;
          theImage.height = newnewheight;
          theImage.width= newnewwidth;
        }
      }
    }
    $image.css({'width':theImage.width+'px','height':theImage.height+'px'});
  }
});

