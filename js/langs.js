var config = { lang: "pt-br" };
if(localStorage.getItem("config") === null){  
  localStorage.setItem('config', JSON.stringify(config));
} else {
  config = JSON.parse(localStorage.getItem("config"));
}
let DEFAULT_LANG = config.lang;
let DATA_LANG_ELEMENTS = document.querySelectorAll('[data-lang-str]');
let VERSION = '1.0.0';
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
    'default_screen': 'Standard Screen',
    'maranata_title': 'MARANATHA',
    'maranata_slogan': 'The Lord Jesus is coming!',
    'title': 'Title:',
    'content': 'Content:',
    'btn_save': {
      'html': '<i class="fas fa-save"></i> Save'
    },
    'btn_export': {
      'html': '<i class="fas fa-download"></i> Export'
    },
    'bible_version': 'Version:',
    'bible_old_testament': 'Old Testament',
    'bible_new_testament': 'New Testament',
    'bible_chapter': 'Chapter',
    'bible_from': 'From',
    'bible_to': 'To',
    'bible_preview': 'Preview',
    'btn_bible_add': {
      'html': '<i class="fas fa-plus fa-fw"></i> Add',
      'title': 'Add to projection list'
    },
    'delSong_msg_start': 'Do you really want to delete the music ',
    'delFolder_msg_start': 'Do you really want to delete the folder ',
    'delFolder_msg_end': ' and all its content ?',
    'list_projection': 'List to projection',
    'empty_projection_list_msg': 'Empty list. Double click on the song to add',
    'need_export_msg': {
      'html': '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>One or more songs from your list have been edited, do not forget to <strong>Export</strong> and replace <strong>data.json</strong> in your folder <strong>/data</strong>'
    },
    'projection': 'Projection',
    'select_image': 'Select Image',
    'import_export': 'Import/Export',
    'btn_menu_import': {
      'html': '<i class="fas fa-upload"></i> Import...',
    },
    'btn_menu_export': {
      'html': '<i class="fas fa-download"></i> Export...',
    },
    'btn_start_view': {
      'title': 'Open projection screen'
    },
    'btn_create_image': {
      'title': 'New image'
    },
    'not_implemented':'Function not implemented.',
    'new_image': 'New Image',
    'image_name': {
      'placeholder': 'Image name'
    },
    'btn_about': {
      'title': 'About'
    },
    'images': 'Images',
    'warnings': 'Warnings',
    'new_warning': 'New warning',
    'warning_name': {
      'placeholder': 'Warning name'
    },
    'warning':'Warning',
    'logo_icon':'icon-logo_usa'
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
    'default_screen': 'Tela Padrão',
    'maranata_title': 'MARANATA',
    'maranata_slogan': 'O Senhor Jesus vem!',
    'title': 'Título:',
    'content': 'Conteúdo:',
    'btn_save': {
      'html': '<i class="fas fa-save"></i> Salvar'
    },
    'btn_export': {
      'html': '<i class="fas fa-download"></i> Exportar'
    },
    'bible_version': 'Versão:',
    'bible_old_testament': 'Velho testamento',
    'bible_new_testament': 'Novo testamento',
    'bible_chapter': 'Capítulo',
    'bible_from': 'Do',
    'bible_to': 'Até',
    'bible_preview': 'Pré-visualização',
    'btn_bible_add': {
      'html': '<i class="fas fa-plus fa-fw"></i> Adicionar',
      'title': 'Adicionar a lista de projeção'
    },
    'delSong_msg_start': 'Deseja realmente apagar a música ',
    'delFolder_msg_start': 'Deseja realmente apagar a pasta ',
    'delFolder_msg_end': ' e todo o seu conteúdo ?',
    'list_projection': 'Lista para projeção',
    'empty_projection_list_msg': 'Lista vazia. Dê um duplo clique sobre o louvor para adicionar',
    'need_export_msg': {
      'html': '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Um ou mais louvores de sua lista foram editados, não esqueça de <strong>Exportar</strong> e substituir o <strong>data.json</strong> em sua pasta <strong>/data</strong>'
    },
    'projection': 'Projeção',
    'select_image': 'Selecionar Imagem',
    'import_export': 'Importar/Exportar',
    'btn_menu_import': {
      'html': '<i class="fas fa-upload"></i> Importar...',
    },
    'btn_menu_export': {
      'html': '<i class="fas fa-download"></i> Exportar...',
    },
    'btn_start_view': {
      'title': 'Abrir tela de projeção'
    },
    'btn_create_image': {
      'title': 'Nova imagem'
    },
    'not_implemented':'Função não implementada.',
    'new_image': 'Nova Imagem',
    'image_name': {
      'placeholder': 'Nome da imagem'
    },
    'btn_about': {
      'title': 'Sobre'
    },
    'images': 'Imagens',
    'warnings': 'Avisos',
    'new_warning': 'Novo aviso',
    'warning_name': {
      'placeholder': 'Nome do aviso'
    },
    'warning':'Aviso',
    'logo_icon':'icon-logo_bold'
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
    'default_screen': 'Schermo standard',
    'maranata_title': 'MARANATA',
    'maranata_slogan': 'Il Signore Gesù viene!',
    'title': 'Titolo:',
    'content': 'Contenuto:',
    'btn_save': {
      'html': '<i class="fas fa-save"></i> Salvare'
    },
    'btn_export': {
      'html': '<i class="fas fa-download"></i> Esportazione'
    },
    'bible_version': 'Versione:',
    'bible_old_testament': 'Vecchio testamento',
    'bible_new_testament': 'Nuovo testamento',
    'bible_chapter': 'Capitolo',
    'bible_from': 'Di',
    'bible_to': 'A',
    'bible_preview': 'Anteprima',
    'btn_bible_add': {
      'html': '<i class="fas fa-plus fa-fw"></i> Aggiungi',
      'title': 'Aggiungi alla lista di proiezione'
    },
    'delSong_msg_start': 'Vuoi davvero eliminare la musica ',
    'delFolder_msg_start': 'Vuoi davvero eliminare la cartella ',
    'delFolder_msg_end': ' e tutto il suo contenuto ?',
    'list_projection': 'Lista di proiezione',
    'empty_projection_list_msg': 'Lista vuota. Fai doppio clic sulla canzone da aggiungere',
    'need_export_msg': {
      'html': '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Uno o più brani della tua lista sono stati modificati, non dimenticarti di <strong>Esportare</strong> e sostituire il <strong>data.json</strong> nel tuo cartella <strong>/data</strong>'
    },
    'projection': 'Proiezione',
    'select_image': 'Seleziona immagine',
    'import_export': 'Importare/Esportare',
    'btn_menu_import': {
      'html': '<i class="fas fa-upload"></i> Importare...',
    },
    'btn_menu_export': {
      'html': '<i class="fas fa-download"></i> Esportare...',
    },
    'btn_start_view': {
      'title': 'Apri lo schermo di proiezione'
    },
    'btn_create_image': {
      'title': 'Nuova immagine'
    },
    'not_implemented':'Funzione non implementata.',
    'new_image': 'Nuova immagine',
    'image_name': {
      'placeholder': 'Nome dell\'immagine'
    },
    'btn_about': {
      'title': 'Informazioni'
    },
    'images': 'Immagini',
    'warnings': 'Avvertenze',
    'new_warning': 'Nuovo avviso',
    'warning_name': {
      'placeholder': 'Nome dell\'avviso'
    },
    'warning':'Avviso',
    'logo_icon':'icon-logo_ita'
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
            el.innerHTML = (TRANSLATIONS[lang][STR]).html;
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
    config.lang = btn.getAttribute('data-lang');
    localStorage.setItem('config', JSON.stringify(config));
  });
});

translate();