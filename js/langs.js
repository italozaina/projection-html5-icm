let DEFAULT_LANG = 'pt-br';
let DATA_LANG_ELEMENTS = document.querySelectorAll('[data-lang-str]');
let VERSION = '0.8.0';
let TRANSLATIONS = {
  'en': {
    'navbrand': 'Projection MCC',
    'version': 'Version '+VERSION,
    'btn_change_bgimage': {
      'title': 'Change background image'
    },
    'btn_create_warning': {
      'title': 'Create warning'
    },
    'language': 'Language',
    'files': 'Files',
    'search': {
      'placeholder':'Search'
    },
    'btn_create_song': {
      'title': 'Create song'
    },
    'btn_create_folder': {
      'title': 'Create folder'
    },
    'btn_del_file_folder': {
      'title': 'Delete file/folder'
    },
    'load_data': 'Load data',
    'load_body': {
      'html': 'The Mozilla Firefox browser was not detected, in which case you should manually open your data file <strong>(data.json)</strong> which is in your folder <strong>("/data")</strong>.<input type="file" name="filedata" id="filedata">'
    },
    'cancel': 'Cancel',
    'delete': 'Delete',
    'create_folder': 'Create folder',
    'create': 'Create',
    'folder_name': {
      'placeholder': 'Folder name'
    },
    'tab_live': 'Live',
    'tab_edition': 'Edition',
    'tab_bible': 'Bible',
  },
  'pt-br': {
    'navbrand': 'Projeção ICM',
    'version': 'Versão '+VERSION,
    'btn_change_bgimage': {
      'title': 'Alterar imagem de fundo'
    },
    'btn_create_warning': {
      'title': 'Criar aviso'
    },
    'language': 'Idioma',
    'files': 'Arquivos',
    'search': {
      'placeholder':'Pesquisar'
    },
    'btn_create_song': {
      'title': 'Criar música'
    },
    'btn_create_folder': {
      'title': 'Criar pasta'
    },
    'btn_del_file_folder': {
      'title': 'Apagar pasta/arquivo'
    },
    'load_data': 'Carregar dados',
    'load_body': {
      'html': 'Não foi detectado o navegador Mozilla Firefox, neste caso você deverá abrir manualmente seu arquivo de dados <strong>(data.json)</strong> que esta em sua pasta <strong>("/data")</strong>.<input type="file" name="filedata" id="filedata">'
    },
    'cancel': 'Cancelar',
    'delete': 'Apagar',
    'create_folder': 'Criar pasta',
    'create': 'Criar',
    'folder_name': {
      'placeholder': 'Nome da pasta'
    },
    'tab_live': 'Ao Vivo',
    'tab_edition': 'Edição',
    'tab_bible': 'Bíblia',
  },
  'it': {
    'navbrand': 'Proiezione MEMDI',
    'version': 'Versione '+VERSION,
    'btn_change_bgimage': {
      'title': 'Cambia immagine di sfondo'
    },
    'btn_create_warning': {
      'title': 'Crea un avvertimento'
    },
    'language': 'Lingua',
    'files': 'Archivios',
    'search': {
      'placeholder':'Per cercare'
    },
    'btn_create_song': {
      'title': 'Crea musica'
    },
    'btn_create_folder': {
      'title': 'Crea cartella'
    },
    'btn_del_file_folder': {
      'title': 'Elimina musica/cartella'
    },
    'load_data': 'Carica i dati',
    'load_body': {
      'html': 'l browser Mozilla Firefox non è stato rilevato, nel qual caso è necessario aprire manualmente il file di dati <strong>(data.json)</strong> cosa c\'è nel tuo cartella <strong>("/data")</strong>.<input type="file" name="filedata" id="filedata">'
    },
    'cancel': 'Annullare',
    'delete': 'Cancellare',
    'create_folder': 'Crea cartella',
    'create': 'Creare',
    'folder_name': {
      'placeholder': 'Nome della cartella'
    },
    'tab_live': 'Vivere',
    'tab_edition': 'Edizione',
    'tab_bible': 'Bibbia',
  }
};


const translate = (lang = null) => {
  if (lang === null) {
    lang = DEFAULT_LANG;
  }
  let DEFAULT_LANG_LENGTH = Object.keys(TRANSLATIONS[DEFAULT_LANG]).length;
  // Verifica se o idioma selecionado existe.
  if (TRANSLATIONS[lang]) {
    // Existe... Agora verifica se a tradução selecionada está completa
    // Se não estiver exibe a mensagem.
    let LANG_LENGTH = Object.keys(TRANSLATIONS[lang]).length;
    if (LANG_LENGTH < DEFAULT_LANG_LENGTH) {
      console.log("Tradução incompleta");
    }
    DATA_LANG_ELEMENTS.forEach((el) => {
      let STR = el.getAttribute('data-lang-str');
      if (TRANSLATIONS[lang][STR]) {        
        if(typeof TRANSLATIONS[lang][STR] == "string"){
          el.innerText = (TRANSLATIONS[lang][STR]);
        } else {
          if((TRANSLATIONS[lang][STR]).html){
            el.innerHtml = (TRANSLATIONS[lang][STR]).html;
          }
          if((TRANSLATIONS[lang][STR]).title){
            el.title = (TRANSLATIONS[lang][STR]).title;
          }
          if((TRANSLATIONS[lang][STR]).placeholder){
            el.placeholder = (TRANSLATIONS[lang][STR]).placeholder;
          } 
        }        
      }
    });
  } else {
    // Não existe, então exibe a mensagem
    console.log("Não há tradução");
  }
}

let BTNS_TRANSLATE = document.querySelectorAll('[name=btn-translate]');
BTNS_TRANSLATE.forEach((btn) => {
  btn.addEventListener('click', (ev) => {
    translate(btn.getAttribute('data-lang'));
  });
});

translate();