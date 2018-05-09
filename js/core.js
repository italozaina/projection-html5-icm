var dados = [];
var projecao = [];
var imagens = [];
var pastaAtiva = 0;
var louvorAtivo = 0;
var projecaoAtiva = 0;
var windowView;
var iframeView = document.getElementById("iframeProjection").contentWindow;
var viewSlides = "";
var ref_selected = "0_0";

var isFirefox = typeof InstallTrigger !== 'undefined';

function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'data/data.json', true); 
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == 200) {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);   
}

function carregaLouvores(){
  // Testa se já possui armazenado no navegador
  if(localStorage.getItem("data") === null){
    if(isFirefox){
      loadJSON(function(response) {        
        atualizaListaArquivos(response);  
      });    
    } else {
      $('#carregarModal').modal('toggle')
    }    
  } else {
    var dadosstring = localStorage.getItem("data");    
    atualizaListaArquivos(dadosstring);
  }  
}

$("#filedata").change(function() {
    var file = this.files[0];

    var reader = new FileReader();

    reader.onload = function(event) {
      var contents = event.target.result;
      atualizaListaArquivos(contents);
    }

    // when the file is read it triggers the onload event above.
    reader.readAsText(file);    
    $('#carregarModal').modal('toggle')
});

function returnFlag(lang_code){
  var htmlflag = '&nbsp;<img src="imagens/';
  switch(lang_code){
    case "pt": {
      htmlflag+='brazil';
      break;
    }
    case "en": {
      htmlflag+='united-states';
      break;
    }
    case "it": {
      htmlflag+='italy';
      break;
    }    
  }
  return htmlflag+='.svg" class="flag-sm">';
}

function atualizaListaArquivos(newData){
    dados = JSON.parse(newData);
    
    localStorage.setItem('data', JSON.stringify(dados));

    var songList = [];

    // Teste inicio de utilização de imagens na lista
    if(localStorage.getItem("images") === null){
      images = JSON.parse(localStorage.getItem("images"));
      if(imagens.length > 0){
        songList.push({id: "images",text:"Imagens",state:{opened: true},children:[]});
        $.each(imagens, function(i, imagem) {
          songList[i].children.push({id: "image_"+i, text:imagem.name, type:"image", data:imagem});
        });
      }
    }

    $('#listaDePastas').html("");

    $.each(dados, function(i, dado) {
      if(imagens.length > 0){
        i++;
      }
      if(dado.type == "s"){
        songList.push({id: ""+i,text:dado.name+returnFlag(dado.lang),state:{opened: true},children:[]});
        $.each(dado.songs, function(f, louvor) {
            songList[i].children.push({id: i+"_"+f, text:louvor.title, type:"song", data:louvor});
        });        
      }

      $('#listaDePastas').append('<a class="dropdown-item" data-id="'+i+'">'+dado.name+'</a>');

    });

    $('#songList').jstree(true).settings.core.data = songList;
    $('#songList').jstree(true).refresh();

    $('#title').val(dados[0].songs[0].title);    
    $('#content').val(dados[0].songs[0].content);

    $('#listaDePastas > a').click(function(){
      console.log("Tentou criar música");

      var pastaSelecionada = parseInt($(this).attr("data-id"));

      if(imagens.length > 0){
        pastaSelecionada--;
      }

      dados[pastaSelecionada].songs.push({title: "", content: ""});

      lastAdded = dados[pastaSelecionada].songs.length - 1;
       
      atualizaListasFromJSON(dados);

      if(imagens.length > 0){
        pastaSelecionada++;
      }

      ref_selected = pastaSelecionada+"_"+lastAdded;     

      $('#guias a[href="#edit"]').tab('show');

    });

}

function atualizaListasFromJSON(newData){
    dados = newData;

    var songList = [];

    // Teste inicio de utilização de imagens na lista
    if(imagens.length > 0){
      songList.push({id: "0",text:"Imagens",state:{opened: true},children:[]});
      $.each(imagens, function(i, imagem) {
        songList[0].children.push({id: "0_"+i, text:imagem.name, type:"image", data:imagem});
      });
    }

    $('#listaDePastas').html("");

    $.each(dados, function(i, dado) {
      if(imagens.length > 0){
        i++;
      }
      if(dado.type == "s"){
        songList.push({id: ""+i,text:dado.name+returnFlag(dado.lang),state:{opened: true},children:[]});
        $.each(dado.songs, function(f, louvor) {
            var newSong = { id: i+"_"+f, text:louvor.title, type:"song", data:louvor };
            if(ref_selected == i+"_"+f){
              newSong.state = {selected: true};
            } 
            songList[i].children.push(newSong);
        });        
      }

      $('#listaDePastas').append('<a class="dropdown-item" data-id="'+i+'">'+dado.name+'</a>');
    });

    console.log(songList);

    $('#songList').jstree(true).settings.core.data = songList;
    $('#songList').jstree(true).refresh();

    $('#listaDePastas > a').click(function(){
      console.log("Tentou criar música");

      var pastaSelecionada = parseInt($(this).attr("data-id"));

      if(imagens.length > 0){
        pastaSelecionada--;
      }

      dados[pastaSelecionada].songs.push({title: "", content: ""});
      
      lastAdded = dados[pastaSelecionada].songs.length - 1;  

      if(imagens.length > 0){
        pastaSelecionada++;
      }

      ref_selected = pastaSelecionada+"_"+lastAdded;

      atualizaListasFromJSON(dados);

      $('#guias a[href="#edit"]').tab('show');     

    });

    reloadProjectionList();
}

function reloadProjectionList(){
  if(projecao.length == 0){
    $("#no-projection-msg").show();
  } else {
    $("#no-projection-msg").hide();
  }
  $("#projections tbody").html("");
  $.each(projecao, function(i, item) {     
    if(item.type == "s") $('#projections tbody').append('<tr data-id="'+i+'"><td>'+dados[item.folderId].songs[item.id].title+'</td><td class="btn-mini"><button class="btn btn-danger btn-x">-</button></td></tr>');
    if(item.type == "b") {
      var label = bible[item.b].name+" "+(item.c+1)+":"+(item.from+1);
      if(item.from < item.to) label += "-" + (item.to+1);
      $('#projections tbody').append('<tr data-id="'+i+'"><td>'+label+'</td><td class="btn-mini"><button class="btn btn-danger btn-x">-</button></td></tr>');           
    }
    if(item.type == "i") {
      var imagem = imagens[item.id];
      $('#projections tbody').append('<tr data-id="'+i+'"><td><i class="fas fa-image"></i>&nbsp;'+imagem.name+'</td><td class="btn-mini"><button class="btn btn-danger btn-x">-</button></td></tr>');           
    }
  });  
  $(".btn-x").click(function(){
    var id = $(this).closest('tr').attr("data-id");
    projecao.splice(id, 1);
    reloadProjectionList();
  });
  generateLiveList(); 
}

$("#btnAlterarBg").click(function(){   
    $('#bgModal').modal('toggle');
});

$("#filebg").change(function() {
    var file = this.files[0];
    var fileURL = URL.createObjectURL(file);
    if (typeof(windowView)!='undefined' && !windowView.closed) {
      windowView.postMessage(JSON.stringify( {
            host: 'projection-html5',
            function: 'changeBg',
            url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
            data: fileURL
          } ), "*"); 
    }
    iframeView.postMessage(JSON.stringify( {
          host: 'projection-html5',
          function: 'changeBg',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
          data: fileURL
        } ), "*");

    $('#bgModal').modal('toggle')
});


$("#deleteFromTree").click(function(){
  var selecionado = $.jstree.reference('#songList').get_node($.jstree.reference('#songList').get_selected());
    if(selecionado.parent == "#"){
      $('#excluirModal').find('.modal-body p').html(TRANSLATIONS[config.lang]['delFolder_msg_start']+"<strong>"+selecionado.text+"</strong>"+TRANSLATIONS[config.lang]['delFolder_msg_end']);
    } else {
      $('#excluirModal').find('.modal-body p').html(TRANSLATIONS[config.lang]['delSong_msg_start']+"<strong>"+selecionado.text+"</strong> ?");
    }    
    $('#excluirModal').modal('toggle');
});

$("#newFolder").click(function(){   
    $('#makeFolderModal').modal('toggle');
    $('#folderName').val("");
});


$("#confirmMakeFolder").click(function(){   
    var name = $('#folderName').val();
    var lang = $('#selectLangFolder').val();
    console.log("tentou criar pasta com o nome: "+name+"na lingua: "+lang);
    dados.push({name: name, type: "s", lang: lang, songs: []});
    atualizaListasFromJSON(dados);
    $('#makeFolderModal').modal('toggle');
});


$("#confirmDeleteFromTree").click(function(){
  var selecionado = $.jstree.reference('#songList').get_node($.jstree.reference('#songList').get_selected());
    if(selecionado.parent == "#"){
      dados.splice(selecionado.id, 1);
    } else {
      console.log(selecionado);
      if(selecionado.type == "song"){
        dados[pastaAtiva].songs.splice(louvorAtivo, 1);
      }      
      if(selecionado.type == "image"){
        var idImage = selecionado.id.split("_")[1];
        imagens.splice(idImage, 1);
      }
      ref_selected = "0_0";
    }
    atualizaListasFromJSON(dados);
    localStorage.setItem('data', JSON.stringify(dados));
    $('#title').val(dados[0].songs[0].title);    
    $('#content').val(dados[0].songs[0].content);
    $('#excluirModal').modal('toggle');   
});

$("#save").click(function(){
  dados[pastaAtiva].songs[louvorAtivo].title = $("#title").val();
  dados[pastaAtiva].songs[louvorAtivo].content = $("#content").val();
  ref_selected = pastaAtiva+"_"+louvorAtivo;
  atualizaListasFromJSON(dados);
  localStorage.setItem('data', JSON.stringify(dados));  
  $("#msgSave").show();
});

$("#export").click(function(){
  console.log("Tentou exportar");
  // downloadObjectAsJson(louvores, "data");
  $("<a />", {
    "download": "data.json",
    "href" : "data:application/json," + encodeURIComponent(JSON.stringify(dados))
  }).appendTo("body")
  .click(function() {
     $(this).remove()
  })[0].click()  
});

$("#import").click(function(){
  console.log("Tentou importar");  
  $('#modalNotImplemented').modal('toggle');
});

$("#btnCreateWarn").click(function(){
  console.log("Tentou criar aviso");  
  $('#modalNotImplemented').modal('toggle');
});

$("#btnLaunchView").click(function(){
  console.log("Tentou abrir tela de projeção");  
  startProjection();  
});

$("#newImage").click(function(){
  console.log("Tentou criar nova imagem");  
  $('#newImageModal').modal('toggle');
});

$("#confirmCreateImage").click(function(){   
    var name = $('#imageName').val();
    var file = $("#fileimage").prop('files')[0];
    if (file) {
      var reader = new FileReader();

      reader.onload = function(e) {
        var base64 = e.target.result;
        imagens.push({name: name, image: base64});
        atualizaListasFromJSON(dados);
      }

      reader.readAsDataURL(file);
    }
    
    $('#newImageModal').modal('toggle');
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
  $('#livesongs tbody').append('<tr data-id="0"><td>'+TRANSLATIONS[config.lang]['default_screen']+'</td><td></td></tr>');
  var telaPadrao = "<section>\n<h1>"+TRANSLATIONS[config.lang]['maranata_title']+"</h1>\n<h3>"+TRANSLATIONS[config.lang]['maranata_slogan']+"</h3>\n</section>\n";
  viewSlides=telaPadrao;
  var f = 1;
  $.each(projecao, function(i, item) { 
    if(item.type == "s"){
      var lang = "-"+dados[item.folderId].lang;
      if(lang == '-pt'){
        lang = "";
      }
      var parsed = dados[item.folderId].songs[item.id].content.split('\n\n');
      $.each(parsed, function(j, estrofe) {        
        var estrofeEsp = estrofe.replace(/\n/g,"<br>");
        $('#livesongs tbody').append('<tr data-id="'+f+'"><td>'+dados[item.folderId].songs[item.id].title+'</td><td>'+estrofeEsp+'</td></tr>');
        // viewSlides+="<section data-background-transition=\"fade\" data-background=\"imagens/fundo.jpg\">\n<h2>"+estrofeEsp+"</h2>\n</section>\n";
        var fimState = "";
        var fimStyle = "";
        if(j+1 == parsed.length){
          fimState = " showfim";
          fimStyle = "<style>.showfim footer{ display: block; }</style>\n"         
        }       
        if(j == 0){
          if(dados[item.folderId].songs[item.id].title.length > 32){
            var titulodividido = dados[item.folderId].songs[item.id].title.split(" ");
            var indexDivision = Math.round(titulodividido.length/2);
            var nome = dados[item.folderId].songs[item.id].title.replace(titulodividido[indexDivision],titulodividido[indexDivision]+"<br>");
            viewSlides+="<section data-state=\"showtitle"+item.folderId+"_"+item.id+fimState+"\">\n<style>\n.showtitle"+item.folderId+"_"+item.id+" header.winetitle2"+lang+" #titulo:before { content: \""+nome.split("<br>")[0]+"\"; }\n.showtitle"+item.folderId+"_"+item.id+" header.winetitle2"+lang+" #titulo:after { content: \""+nome.split("<br>")[1]+"\"; }\n.showtitle"+item.folderId+"_"+item.id+" header.winetitle2"+lang+"{ display: table; }\n.showtitle"+item.folderId+"_"+item.id+" header.winetitle2"+lang+" #titulo{ display: table; }\n.showtitle"+item.folderId+"_"+item.id+" header.winetitle2"+lang+" #logo{ display: table; }</style>\n"+fimStyle;
          }else{
            viewSlides+="<section data-state=\"showtitle"+item.folderId+"_"+item.id+fimState+"\">\n<style>\n.showtitle"+item.folderId+"_"+item.id+" header.winetitle"+lang+" #titulo:after { content: \""+dados[item.folderId].songs[item.id].title+"\"; }\n.showtitle"+item.folderId+"_"+item.id+" header.winetitle"+lang+"{ display: table; }\n.showtitle"+item.folderId+"_"+item.id+" header.winetitle"+lang+" #logo{ display: table; }</style>\n"+fimStyle;
          } 
        } else {
          viewSlides+="<section data-state=\"showlogo"+item.folderId+"_"+item.id+"_"+j+fimState+"\">\n<style>\n.showlogo"+item.folderId+"_"+item.id+"_"+j+" header.whitelogo"+lang+"{ display: block; }\n.showlogo"+item.folderId+"_"+item.id+"_"+j+" header.whitelogo"+lang+" #logo{ display: block; }</style>\n"+fimStyle;
        }
        viewSlides+=estrofeEsp+"\n</section>\n";
        
        f++;
      });
      $('#livesongs tbody').append('<tr data-id="'+f+'"><td>'+TRANSLATIONS[config.lang]['default_screen']+'</td><td></td></tr>');      
      f++;
      viewSlides+=telaPadrao;
    }
    if(item.type == "b"){
      for (var i = item.from; i <= item.to; i++) {
        var label = bible[item.b].name+" "+(item.c+1)+":"+(i+1);
        var scripture = bible[item.b].chapters[item.c][i];
        var refverse = "b"+item.b+"c"+item.c+"v"+i;
        $('#livesongs tbody').append('<tr data-id="'+f+'"><td>'+label+'</td><td>'+scripture+'</td></tr>');
        viewSlides+="<section data-background-color=\"#000000\" data-state=\"scriptures "+refverse+"\">\n<style>\n."+refverse+" footer.scripturetitle small:after{ content: \""+label+"\"; }\n."+refverse+" footer.scripturetitle{ display: block; }\n</style>\n<p>"+scripture+"</p>\n</section>\n";
        f++;
      }
      $('#livesongs tbody').append('<tr data-id="'+f+'"><td>Tela Padrão</td><td></td></tr>');
      f++;
      viewSlides+=telaPadrao;      
    }
    if(item.type == "i"){
      var imagem = imagens[item.id];
      $('#livesongs tbody').append('<tr data-id="'+f+'"><td><i class="fas fa-image"></i>&nbsp;'+imagem.name+'</td><td><img class="responsive-img" src='+imagem.image+'></td></tr>');
      viewSlides+="<section data-background-color=\"#000000\">\n<img src="+imagem.image+">\n</section>\n";
      f++;
      $('#livesongs tbody').append('<tr data-id="'+f+'"><td>Tela Padrão</td><td></td></tr>');
      f++;
      viewSlides+=telaPadrao;      
    }
  });

  $('#livesongs > tbody > tr').click(function() {    
    $( this ).parent().find( 'tr.active' ).removeClass( 'active' );
    $( this ).addClass( 'active' );
    projecaoAtiva = parseInt($(this).attr("data-id"));
    mudaSlide();
  });

  projecaoAtiva = 0;
  mudaProjecaoAtiva();

  updateViewSlides();
}

function updateViewSlides(){
  if (typeof(windowView)!='undefined' && !windowView.closed) {
    windowView.postMessage(JSON.stringify( {
          host: 'projection-html5',
          function: 'reloadReveal',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
          data: viewSlides
        } ), "*");
  }
  iframeView.postMessage(JSON.stringify( {
          host: 'projection-html5',
          function: 'reloadReveal',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
          data: viewSlides
        } ), "*");
}

function mudaProjecaoAtiva(){
  $('#livesongs > tbody > tr.active').removeClass( 'active' );
  $('#livesongs > tbody > tr[data-id="'+projecaoAtiva+'"]').addClass( 'active' );
  $('#scrollblock').scrollTop(
      $('#livesongs > tbody > tr[data-id="'+projecaoAtiva+'"]').offset().top - $('#scrollblock').offset().top + $('#scrollblock').scrollTop()
  );   
  mudaSlide();
}

function mudaSlide(){
  if (typeof(windowView)!='undefined' && !windowView.closed) {
    windowView.postMessage(JSON.stringify( {
          host: 'projection-html5',
          function: 'changeSlide',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
          data: projecaoAtiva
        } ), "*");    
  }
    iframeView.postMessage(JSON.stringify( {
          host: 'projection-html5',
          function: 'changeSlide',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
          data: projecaoAtiva
        } ), "*");    
}

$(document).on('keydown', function(e) {
    var rows = $('#livesongs > tbody > tr');
    var tag = e.target.tagName.toLowerCase();
    var tabName = $('#guias a[aria-selected="true"]').attr('aria-controls');
    
    if (tabName == "live" && tag != "input" && tag != "textarea" && tag != "a"){
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
            if(rows.length > projecaoAtiva + 1){
              projecaoAtiva++;
              mudaProjecaoAtiva();
            }          
            break;  
          }          
          break;

          case 40: // down
          {
            if(rows.length > projecaoAtiva + 1){
              projecaoAtiva++;
              mudaProjecaoAtiva();
            }          
            break;  
          }
          case 27: // esc
          {            
            projecaoAtiva = 0;
            mudaProjecaoAtiva();
            break;  
          }
          default: return; // exit this handler for other keys
      }

      e.preventDefault(); // prevent the default action (scroll / move caret)     
    }

    if ((e.ctrlKey || e.metaKey) && tabName == "edit") {
        switch (String.fromCharCode(e.which).toLowerCase()) {
        case 's':
            e.preventDefault();
            $("#save").click()
            // alert('ctrl-s');
            break;
        }
    }

});

$(window).keypress(function(event) {
    // var tag = e.target.tagName.toLowerCase();
    // if(tag == "textarea"){
      if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
      alert("Ctrl-S pressed");
      event.preventDefault();
      return false;
    // }    
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

$("#msgSave").hide();

$(function () { 
  $('#songList').jstree({ 'core' : {
      'data' : []
  },
  "types" : {
      "default" : {
        "icon" : "fas fa-folder-open fa-fw pt-2"
      },
      'f-open' : {
          'icon' : 'fas fa-folder-open fa-fw pt-2'
      },
      'f-closed' : {
          'icon' : 'fas fa-folder fa-fw pt-2'
      },
      "song" : {
        "icon" : "fas fa-file-alt fa-fw pt-2"
      },
      "image" : {
        "icon" : "fas fa-file-image fa-fw pt-2"
      }
    },
  "search":{
    "show_only_matches" : true,
    search_callback : function (str, node) {
      if(node.data != null){
        return node.text.toUpperCase().includes(str.toUpperCase()) || node.data.content.toUpperCase().includes(str.toUpperCase());
      } else {
        return node.text.toUpperCase().includes(str.toUpperCase());  
      }
    }    
  },
  "plugins" : [ "search", "types" ]
   });

  var to = false;
  $('#treesearch').keyup(function () {
    if(to) { clearTimeout(to); }
    to = setTimeout(function () {
      var v = $('#treesearch').val();
      $('#songList').jstree(true).search(v);
    }, 250);
  });

  /* Toggle between folder open and folder closed */
  $("#songList").on('open_node.jstree', function (event, data) {
      data.instance.set_type(data.node,'f-open');
  });
  $("#songList").on('close_node.jstree', function (event, data) {
      data.instance.set_type(data.node,'f-closed');
  });

  $('#songList').on("changed.jstree", function (e, data) {
    if(data.node != undefined && data.node != null && data.node.data != null && data.node.type == 'song'){
        louvor = data.node.data;        
        pastaAtiva = parseInt(data.node.id.split("_")[0]);        
        louvorAtivo = parseInt(data.node.id.split("_")[1]);

        if(imagens.length > 0){
          pastaAtiva--;
        }
        // ref_selected = pastaAtiva+"_"+louvorAtivo;
        console.log(pastaAtiva);

        $('#title').val(louvor.title);    
        $('#content').val(louvor.content);
    }
  });

  $('#songList').bind("dblclick.jstree", function (e) {
      var instance = $.jstree.reference(this),
      node = instance.get_node(e.target);
     // Do my action
     if(node.data != null && node.type == 'song'){
      var louvor = { id: louvorAtivo, folderId: pastaAtiva, type: "s" }
      projecao.push(louvor);
      reloadProjectionList();
     }

     if(node.data != null && node.type == 'image'){
      var idImage = node.id.split("_")[1];
      var imagem = { id: idImage, type: "i" }
      projecao.push(imagem);
      reloadProjectionList();
     }
  });

  $('#songList').bind('refresh.jstree', function(e, data) {
        $('#songList').jstree(true).deselect_all();        
        $('#songList').jstree(true).select_node(ref_selected);
        $("#songList #"+ref_selected)[0].scrollIntoView();
  })

  $("#btnAbout").click(function(){
    var title = '<i class="fas fa-info-circle"></i>&nbsp;'+TRANSLATIONS[config.lang]['btn_about']['title'];
    $('#modalNotImplemented > .modal-dialog > .modal-content > .modal-header > h5').html(title);
    $('#modalNotImplemented > .modal-dialog > .modal-content > .modal-body').html('<p><strong>Desenvolvido por:</strong> Ítalo Carvalho Zaina</p><h5>Contatos</h5><p><strong><i class="fas fa-envelope"></i></strong> <a href="MAILTO:italoczaina@gmail.com">italoczaina@gmail.com</a></p><p><strong><i class="fab fa-skype"></i></strong> <a href="skype:italozo?chat">italozo</a></p>');
    $('#modalNotImplemented').modal('toggle');
  });

});

window.onload = function() {
  setTimeout(function afterTwoSeconds() {
    carregaLouvores();
    startProjection();
    reloadProjectionList();
    document.getElementById("loading").style.display = "none";
  }, 2000);
};

var ps = new PerfectScrollbar('#scrollblock');