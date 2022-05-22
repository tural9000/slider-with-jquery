$(()=>{
  let arr = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"]
  let x = 0
  let slider = $("#slider")
      slider.css({
          position: "relative",
          width: "80%",
          height: "60vh",
          margin: "10vh auto",
          boxShadow: "0 0 10px #000",
          backgroundImage: `url('img/${arr[x]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: "hidden",     

      })
      .append('<div id="geden"></div>')
      .append('<div id="gelen"></div>')
      .append('<div id = "thumbs"></div>')
      .append('<div id = "line"></div>')
      .append(`<div id = "page"> <span>${x}</span> / ${arr.length - 1}</div>`)
      .click(function(e){
          e.pageX > $(window).width() / 2 ? change(1) : change(-1)
          lineF(0)
      })
      let geden = $("#geden")
      let gelen = $("#gelen")
      $("#geden, #gelen").css({
          position: "absolute",
          width: slider.width(),
          height: slider.height(),
          backgroundPosition: "center",
          backgroundSize: "cover"
      })
      let line = $('#line')
      let thumbs = $('#thumbs')
      arr.map(image => thumbs.append(`<img src = "img/${image}"/>`))
      $('#thumbs > img').click(function(e){
        e.stopPropagation()
        x = $(this).index() - 1
        change(1)
       
      })
      let liner = setTimeout(lineF)
      let timer = setTimeout(change, 3000)

      function lineF(s = 1){
        line.animate({width: s * 100 + '%'}, 3000, 'linear', function(){
           line.css({width: 0})
        });
        if( s == 0) line.stop(true, true);
        liner = setTimeout(lineF) 
        
    }

      function change(dir = 1) {
          clearTimeout(timer)
          x += dir
          if(x >= arr.length) x = 0
          if(x < 0) x = arr.length - 1
           geden
            .css({
                left: 0,
                backgroundImage: slider.css("backgroundImage") 
            })
            .animate({ left: -dir * slider.width() }, "slow")
           gelen
            .css({
                left: dir * slider.width(), 
                backgroundImage: `url('img/${arr[x]}')`
            })
            .animate({ left: 0 }, "slow")
        slider.css({ backgroundImage: `url('img/${arr[x]}')` }) 
          $('#page > span').text(`${x}`)
          $('#thumbs > img').fadeTo("fast", 0.7).css({border: '1px solid #63e6dba8', opacity: .7})
          $('#thumbs > img').eq(x).fadeTo("fast", 1).css({border: '2.5px solid #63e6dba8', opacity: 1})
          timer = setTimeout(change,3000)
      }   
     
})