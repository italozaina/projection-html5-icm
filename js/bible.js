var bibleversion = "acf";
var bible;
var bookSelected = 0;
var chapterSelected = 0;
var fromSelected = 0;
var toSelected = 0;

function loadBible() {
  switch(bibleversion) {
      case "nvi":
      {
        bible = biblenvi;
        break;
      }         
      case "acf":
      {
        bible = bibleacf;
        break;
      }
      default: {
        bible = biblenvi;
        break;
      }
  }
}

loadBible();

var bookNames = [
{ name: "Gênesis", num_chapters:50 }, { name: "Êxodo", num_chapters:40 }, { name: "Levítico", num_chapters:27 }, { name: "Números", num_chapters:36 }, { name: "Deuteronômio", num_chapters:34 }, { name: "Josué", num_chapters:24 }, { name: "Juízes", num_chapters:21 }, { name: "Rute", num_chapters:4 }, { name: "1 Samuel", num_chapters:31 }, { name: "2 Samuel", num_chapters:24 }, { name: "1 Reis", num_chapters:22 }, { name: "2 Reis", num_chapters:25 }, { name: "1 Crônicas", num_chapters:29 }, { name: "2 Crônicas", num_chapters:36 }, { name: "Esdras", num_chapters:10 }, { name: "Neemias", num_chapters:13 }, { name: "Ester", num_chapters:10 }, { name: "Jó", num_chapters:42 }, { name: "Salmos", num_chapters:150 }, { name: "Provérbios", num_chapters:31 }, { name: "Eclesiastes", num_chapters:12 }, { name: "Cânticos", num_chapters:8 }, { name: "Isaías", num_chapters:66 }, { name: "Jeremias", num_chapters:52 }, { name: "Lamentações", num_chapters:5 }, { name: "Ezequiel", num_chapters:48 }, { name: "Daniel", num_chapters:12 }, { name: "Oséias", num_chapters:14 }, { name: "Joel", num_chapters:3 }, { name: "Amós", num_chapters:9 }, { name: "Obadias", num_chapters:1 }, { name: "Jonas", num_chapters:4 }, { name: "Miquéias", num_chapters:7 }, { name: "Naum", num_chapters:3 }, { name: "Habacuque", num_chapters:3 }, { name: "Sofonias", num_chapters:3 }, { name: "Ageu", num_chapters:2 }, { name: "Zacarias", num_chapters:14 }, { name: "Malaquias", num_chapters:4 }, { name: "Mateus", num_chapters:28 }, { name: "Marcos", num_chapters:16 }, { name: "Lucas", num_chapters:24 }, { name: "João", num_chapters:21 }, { name: "Atos", num_chapters:28 }, { name: "Romanos", num_chapters:16 }, { name: "1 Coríntios", num_chapters:16 }, { name: "2 Coríntios", num_chapters:13 }, { name: "Gálatas", num_chapters:6 }, { name: "Efésios", num_chapters:6 }, { name: "Filipenses", num_chapters:4 }, { name: "Colossenses", num_chapters:4 }, { name: "1 Tessalonicenses", num_chapters:5 }, { name: "2 Tessalonicenses", num_chapters:3 }, { name: "1 Timóteo", num_chapters:6 }, { name: "2 Timóteo", num_chapters:4 }, { name: "Tito", num_chapters:3 }, { name: "Filemom", num_chapters:1 }, { name: "Hebreus", num_chapters:13 }, { name: "Tiago", num_chapters:5 }, { name: "1 Pedro", num_chapters:5 }, { name: "2 Pedro", num_chapters:3 }, { name: "1 João", num_chapters:5 }, { name: "2 João", num_chapters:1 }, { name: "3 João", num_chapters:1 }, { name: "Judas", num_chapters:1 }, { name: "Apocalipse", num_chapters:22 } 
];

function ajustarListasDaBiblia(){
  $('#listaVelho').html("");
  $('#listaNovo').html("");

  $.each(bookNames, function(i, book){
    if(i<39) {
      $('#listaVelho').append('<li class="list-group-item" data-id="'+i+'">'+book.name+'</li>');
    } else {
      $('#listaNovo').append('<li class="list-group-item" data-id="'+i+'">'+book.name+'</li>');
    }
  });

  $('#listaVelho li').click(function(){
    $('#listaVelho > li.active').removeClass('active');
    $('#listaNovo > li.active').removeClass('active');
    $(this).addClass('active');
    selectBook($(this));
  });

  $('#listaNovo li').click(function(){
    $('#listaVelho > li.active').removeClass('active');
    $('#listaNovo > li.active').removeClass('active');
    $(this).addClass('active');
    selectBook($(this));
  });  
}

function selectBook(nodeLi){
  bookSelected = parseInt(nodeLi.attr("data-id"));
  chapterSelected = 0;

  $('#listaDe').html("");
  $('#listaAte').html(""); 

  $('#listaCapitulo').html("");
  for(i = 0; i < bookNames[bookSelected].num_chapters; i++){
    $('#listaCapitulo').append('<li class="list-group-item" data-id="'+i+'">'+(i+1)+'</li>');
  } 

  $('#listaCapitulo').scrollTop(0);

  $('#listaCapitulo li').click(function(){
    $('#listaCapitulo > li.active').removeClass('active');
    $(this).addClass('active');
    selectChapter($(this));
  });

}

function selectChapter(nodeLi){
  chapterSelected = parseInt(nodeLi.attr("data-id"));
  fromSelected = 0;
  toSelected = 0;

  $('#listaDe').html("");
  $('#listaAte').html("");
  for(i = 0; i < bible[bookSelected].chapters[chapterSelected].length; i++){
    $('#listaDe').append('<li class="list-group-item" data-id="'+i+'">'+(i+1)+'</li>');
    $('#listaAte').append('<li class="list-group-item" data-id="'+i+'">'+(i+1)+'</li>');
    if(i == bible[bookSelected].chapters[chapterSelected].length - 1){
      toSelected = bible[bookSelected].chapters[chapterSelected].length - 1;
      $('#listaDe').scrollTop(0);
      $('#listaAte').scrollTop(  $('#listaAte > li[data-id="'+toSelected+'"]').offset().top - $('#listaAte').offset().top + $('#listaAte').scrollTop());
      $('#listaDe > li[data-id="'+fromSelected+'"]').addClass('active');
      $('#listaAte > li[data-id="'+toSelected+'"]').addClass('active');
      biblePreView();
    }
  } 

  $('#listaDe li').click(function(){
    $('#listaDe > li.active').removeClass('active');
    $(this).addClass('active');
    fromSelected = parseInt($(this).attr("data-id"));
    toSelected = parseInt($(this).attr("data-id"));
    $('#listaAte > li.active').removeClass('active');
    $('#listaAte > li[data-id="'+fromSelected+'"]').addClass('active');
    $('#listaAte').scrollTop(  $('#listaAte > li[data-id="'+toSelected+'"]').offset().top - $('#listaAte').offset().top + $('#listaAte').scrollTop());    
    biblePreView();
  });  

  $('#listaAte li').click(function(){
    $('#listaAte > li.active').removeClass('active');
    $(this).addClass('active');
    toSelected = parseInt($(this).attr("data-id"));
    if(fromSelected > toSelected){
      fromSelected = toSelected;
      $('#listaDe > li.active').removeClass('active');
      $('#listaDe > li[data-id="'+fromSelected+'"]').addClass('active');
      $('#listaDe').scrollTop(  $('#listaDe > li[data-id="'+fromSelected+'"]').offset().top - $('#listaDe').offset().top + $('#listaDe').scrollTop());
    }
    biblePreView();
  }); 
}

function biblePreView(){
  $('#preViewScripture').html("");
  for (var i = fromSelected; i <= toSelected; i++) {
    $('#preViewScripture').append("<p>"+bible[bookSelected].chapters[chapterSelected][i]+"</p>");
  }
}

$('#addBibleToProjection').click(function(){
  var biblia = { b: bookSelected, c: chapterSelected, from: fromSelected, to: toSelected, type: "b" }
  projecao.push(biblia);
  reloadProjectionList();
});  

$('#selectBibleVersion').change(function() {
  bibleversion = $(this).val();
  loadBible();
   biblePreView();
  reloadProjectionList();
});

ajustarListasDaBiblia();