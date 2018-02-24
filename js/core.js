var louvores = {};
var projecao = [];
var louvorAtivo = 0;
var projecaoAtiva = 0;
var windowView;
var viewSlides = "";

function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'data/data.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == 200) {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);   
}

function carregaLouvores(){
  loadJSON(function(response) {
  // Parse JSON string into object
  louvores = JSON.parse(response);

  reloadSongList();
  });
}

function reloadSongList(){
  // popula tabela com o json
  $.each(louvores, function(i, louvor) {
      if(i == 0) {
        $('#songs tbody').append('<tr data-id="'+i+'" class="active"><td>'+louvor.title+'</td><td>'+louvor.content+'</td></tr>');
      } else {
        $('#songs tbody').append('<tr data-id="'+i+'"><td>'+louvor.title+'</td><td>'+louvor.content+'</td></tr>');
      }
  });

    $('#songs > tbody > tr').click(function() {    
      $( this ).parent().find( 'tr.active' ).removeClass( 'active' );
      $( this ).addClass( 'active' );
      louvorAtivo = $(this).attr("data-id");      
      $('#title').val(louvores[louvorAtivo].title);    
      $('#content').val(louvores[louvorAtivo].content);
    });

    $('#songs > tbody > tr').dblclick(function() {
      var louvor = { id: louvorAtivo, type: "s" }
      projecao.push(louvor);
      reloadProjectionList();
    });

    $('#title').val(louvores[louvorAtivo].title);    
    $('#content').val(louvores[louvorAtivo].content);  
}


function reloadProjectionList(){
  if(projecao.length == 0){
    $("#no-projection-msg").show();
  } else {
    $("#no-projection-msg").hide();
  }
  $("#projections tbody").html("");
  $.each(projecao, function(i, louvor) {      
        $('#projections tbody').append('<tr data-id="'+i+'"><td>'+louvores[louvor.id].title+'</td><td class="btn-mini"><button class="btn btn-danger btn-x">-</button></td></tr>');      
  });  
  $(".btn-x").click(function(){
    var id = $(this).closest('tr').attr("data-id");
    projecao.splice(id, 1);
    reloadProjectionList();
  });
  generateLiveList(); 
}

$("#save").click(function(){
  // console.log($("#content").val());
  louvores[louvorAtivo].title = $("#title").val();
  louvores[louvorAtivo].content = $("#content").val();  

  $('#songs > tbody > tr[data-id="'+louvorAtivo+'"]').html("<td>"+louvores[louvorAtivo].title+"</td><td>"+louvores[louvorAtivo].content+"</td>");
  // console.log("Salvou\n\n"+louvores[louvorAtivo].content);
  $("#msgSave").show();
});

$("#export").click(function(){
  console.log("Tentou exportar");
  // downloadObjectAsJson(louvores, "data");
  $("<a />", {
    "download": "data.json",
    "href" : "data:application/json," + encodeURIComponent(JSON.stringify(louvores))
  }).appendTo("body")
  .click(function() {
     $(this).remove()
  })[0].click()  
});

$("#search").on("keyup", function() {
    var value = $(this).val();

    // Hide all table tbody rows
    $('#songs tbody tr').hide();

    // Searching text in columns and show match row
    $('#songs tbody tr td:contains("'+value+'")').each(function(){
     $(this).closest('tr').show();
    });  
});

// Case-insensitive searching (Note - remove the below script for Case sensitive search )
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
 return function( elem ) {
  return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
 };
});

// Gerar lista ao vivo
function generateLiveList(){
  $("#livesongs tbody").html("");      
  $('#livesongs tbody').append('<tr data-id="0"><td>Tela Padrão</td><td></td></tr>');
  // var telaPadrao = "<section data-background-transition=\"fade\" data-background=\"imagens/fundo.jpg\">\n<h1>Maranata</h1>\n<h3>O SENHOR JESUS VEM!</h3>\n</section>\n";
  var telaPadrao = "<section>\n<h1>Maranata</h1>\n<h3>O SENHOR JESUS VEM!</h3>\n</section>\n";
  viewSlides=telaPadrao;
  var f = 1;
  $.each(projecao, function(i, item) {        
    if(item.type == "s"){
      var parsed = louvores[item.id].content.split('\n\n');
      $.each(parsed, function(j, estrofe) {        
        var estrofeEsp = estrofe.replace(/\n/g,"<br>");
        $('#livesongs tbody').append('<tr data-id="'+f+'"><td>'+louvores[item.id].title+'</td><td>'+estrofeEsp+'</td></tr>');
        // viewSlides+="<section data-background-transition=\"fade\" data-background=\"imagens/fundo.jpg\">\n<h2>"+estrofeEsp+"</h2>\n</section>\n";
        var fimState = "";
        var fimStyle = ""
        if(j+1 == parsed.length){
          fimState = " showfim";
          fimStyle = "<style>.showfim footer{ display: block; }</style>\n"         
        }
        if(j == 0){
          if(louvores[item.id].title.length > 32){
            var titulodividido = louvores[item.id].title.split(" ");
            var nome = louvores[item.id].title.replace(titulodividido[titulodividido.length/2],titulodividido[titulodividido.length/2]+"<br>");
            viewSlides+="<section data-state=\"showtitle"+item.id+fimState+"\">\n<style>\n.showtitle"+item.id+" header.winetitle2 #titulo:before { content: \""+nome.split("<br>")[0]+"\"; }\n.showtitle"+item.id+" header.winetitle2 #titulo:after { content: \""+nome.split("<br>")[1]+"\"; }\n.showtitle"+item.id+" header.winetitle2{ display: table; }\n.showtitle"+item.id+" header.winetitle2 #titulo{ display: table; }\n.showtitle"+item.id+" header.winetitle2 #logo{ display: table; }</style>\n"+fimStyle;
          }else{
            viewSlides+="<section data-state=\"showtitle"+item.id+fimState+"\">\n<style>\n.showtitle"+item.id+" header.winetitle #titulo:after { content: \""+louvores[item.id].title+"\"; }\n.showtitle"+item.id+" header.winetitle{ display: table; }\n.showtitle"+item.id+" header.winetitle #logo{ display: table; }</style>\n"+fimStyle;
          }  
        } else {
          viewSlides+="<section data-state=\"showlogo"+fimState+"\">\n<style>\n.showlogo header.whitelogo{ display: block; }\n.showlogo header.whitelogo #logo{ display: block; }</style>\n"+fimStyle;
        }
        viewSlides+=estrofeEsp+"\n</section>\n";
        
        f++;
      });
      $('#livesongs tbody').append('<tr data-id="'+f+'"><td>Tela Padrão</td><td></td></tr>');
      f++;
      viewSlides+=telaPadrao;
    }    
  });

  $('#livesongs > tbody > tr').click(function() {    
    $( this ).parent().find( 'tr.active' ).removeClass( 'active' );
    $( this ).addClass( 'active' );
    projecaoAtiva = $(this).attr("data-id");
    if (typeof(windowView)!='undefined' && !windowView.closed) {
      windowView.changeSlide(projecaoAtiva);
    }   
  });

  projecaoAtiva = 0;
  mudaProjecaoAtiva();

  updateViewSlides();
}

function updateViewSlides(){
  if (typeof(windowView)!='undefined' && !windowView.closed) {
    windowView.postMessage(viewSlides, "*");
  }
}

function mudaProjecaoAtiva(){
  $('#livesongs > tbody > tr.active').removeClass( 'active' );
  $('#livesongs > tbody > tr[data-id="'+projecaoAtiva+'"]').addClass( 'active' );
  if (typeof(windowView)!='undefined' && !windowView.closed) {
    windowView.changeSlide(projecaoAtiva);
  }  
}

$(document).on('keypress', function(e) {
    var rows = $('#livesongs > tbody > tr');
    var tag = e.target.tagName.toLowerCase();

    if (tag != "input" && tag != "textarea"){
       console.log(e.keyCode);   

       switch(e.keyCode) {
          case 37: // left
          {
            if(projecaoAtiva > 0){
              projecaoAtiva--;
              mudaProjecaoAtiva();
            }           
            break;
          }          
          break;

          case 38: // up
          {
            if(projecaoAtiva > 0){
              projecaoAtiva--;
              mudaProjecaoAtiva();
            }           
            break;
          }
          case 39: // right
          {
            if(rows.length > 0 && rows.length > projecaoAtiva + 1){
              projecaoAtiva++;
              mudaProjecaoAtiva();
            }          
            break;  
          }          
          break;

          case 40: // down
          {
            if(rows.length > 0 && rows.length > projecaoAtiva + 1){
              projecaoAtiva++;
              mudaProjecaoAtiva();
            }          
            break;  
          }
          default: return; // exit this handler for other keys
      }

      e.preventDefault(); // prevent the default action (scroll / move caret)     
    }

});

// Inicia a projeção
function startProjection() {      
  if (typeof(windowView) =='undefined' || windowView.closed || typeof(windowView) == null) {
    windowView = window.open("view.html", "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,channelmode=yes, fullscreen=yes");
  }  
}
$('#startProjection').click(function(){
  startProjection();
});

$('#rplYI').click(function(){
  $('#content')
    .selection('insert', {text: '<font color="yellow"><i>', mode: 'before'})
    .selection('insert', {text: '</i></font>', mode: 'after'});
});

$('#rplBis').click(function(){
  $('#content')
    .selection('insert', {text: '<blockquote class="chave-bis">', mode: 'before'})
    .selection('insert', {text: '</blockquote>', mode: 'after'});
});

$('#rplBis-small').click(function(){
  $('#content')
    .selection('insert', {text: '<blockquote class="chave-bis-small">', mode: 'before'})
    .selection('insert', {text: '</blockquote>', mode: 'after'});
});

$('#rpl2x').click(function(){
  $('#content')
    .selection('insert', {text: '<blockquote class="chave-2x">', mode: 'before'})
    .selection('insert', {text: '</blockquote>', mode: 'after'});
});

$('#addNew').click(function(){
  louvores.push({title: "", content: ""});
  // reloadSongList();
  lastAdded = louvores.length - 1;
  $('#songs tbody').find( 'tr.active' ).removeClass( 'active' );
  louvorAtivo = lastAdded;      

  $('#songs tbody').append('<tr data-id="'+louvorAtivo+'" class="active"><td>&nbsp;</td><td>&nbsp;</td></tr>');

  $('#songs > tbody > tr[data-id="'+lastAdded+'"]').click(function() {    
    $( this ).parent().find( 'tr.active' ).removeClass( 'active' );
    $( this ).addClass( 'active' );
    louvorAtivo = $(this).attr("data-id");      
    $('#title').val(louvores[louvorAtivo].title);    
    $('#content').val(louvores[louvorAtivo].content);
  });

  $('#songs > tbody > tr[data-id="'+lastAdded+'"]').dblclick(function() {
    var louvor = { id: louvorAtivo, type: "s" }
    projecao.push(louvor);
    reloadProjectionList();
  });

  $('#title').val(louvores[louvorAtivo].title);    
  $('#content').val(louvores[louvorAtivo].content);
  $('#songs tbody').scrollTop(
      $('#songs > tbody > tr[data-id="'+lastAdded+'"]').offset().top - $('#songs tbody').offset().top + $('#songs tbody').scrollTop()
  );  
  $('#guias a[href="#edit"]').tab('show');
});

$('#removeSelected').click(function(){
  console.log("Tentou deletar");
  louvores.splice(louvorAtivo, 1);
  var tr = $('#songs > tbody > tr[data-id="'+louvorAtivo+'"]');
  tr.fadeOut(400, function(){
    tr.remove();
     $("#songs > tbody > tr").each(function(i){
        $(this).attr("data-id", i);;
     });
    louvorAtivo = 0;
    $('#songs > tbody > tr[data-id="'+louvorAtivo+'"]').addClass( 'active' );
    $('#songs tbody').scrollTop(
        $('#songs > tbody > tr[data-id="'+louvorAtivo+'"]').offset().top - $('#songs tbody').offset().top + $('#songs tbody').scrollTop()
    );    
    $('#title').val(louvores[louvorAtivo].title);    
    $('#content').val(louvores[louvorAtivo].content);    
  });
});

window.onload = function() {
  carregaLouvores();
  startProjection();
  reloadProjectionList();
};

$("#msgSave").hide();