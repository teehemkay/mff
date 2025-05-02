import { h, text } from 'hyperapp';

export const translations = (lang) => data[lang] || data.en;

export const data = {
  en: {
    lang: 'en',
    url: 'together.eu',
    title: "Managing cookies on Parliament's website",
    body: [
      h('p', {}, text('Dear visitor,')),
      h(
        'p',
        {},
        text(
          'We use analytics cookies to offer you a better browsing experience. You have the choice to refuse or accept them.'
        )
      ),
    ],
    textBottom1:
      'For any information on the other cookies and server logs we use, we invite you to read our ',
    textBottom2: ', our ',
    textBottom3: ' and our ',
    linkLabels: {
      'data-protection': 'data protection policy',
      'cookies-policy': 'cookies policy',
      'cookies-inventory': 'cookies inventory.',
      'privacy-policy': 'privacy policy',
    },
    accept: 'I accept analytics cookies',
    refuse: 'I refuse analytics cookies',
    more: 'More',
    tooltip: 'Read more',
  },
  uk: {
    lang: 'uk',
    title: 'Управління файлами cookie на вебсайті Парламенту',
    body: [
      h('p', {}, text('Шановний відвідувачу,')),
      h(
        'p',
        {},
        text(
          'Ми використовуємо аналітичні файли cookie, щоб покращити для Вас якість використання вебсайту. Прийняти чи відмовитися від них -- вирішувати Вам.'
        )
      ),
    ],
    textBottom1:
      'Для отримання більш детальної інформації про інші файли cookie та журнали серверу, які ми використовуємо, просимо ознайомитися з нашою  ',
    textBottom2: ', нашою ',
    textBottom3: ' та нашою ',
    linkLabels: {
      'data-protection': 'політикою захисту даних',
      'cookies-policy': 'політикою щодо файлів cookie',
      'cookies-inventory': 'реєстром файлів cookie.',
      'privacy-policy': 'політикою конфіденційності',
    },
    accept: 'Я приймаю аналітичні файли cookie.',
    refuse: 'Я відмовляюся від аналітичних файлів cookie.',
    more: 'Більше',
    tooltip: 'Детальніше',
  },
  bg: {
    lang: 'bg',
    title:
      'Управлението на „бисквитките“ (cookies) на интернет сайта на Европейския парламент',
    body: [
      h('p', {}, text('Уважаеми посетители,')),
      h(
        'p',
        {},
        text(
          'Използваме аналитични бисквитки, за да Ви предложим по-добро сърфиране. Имате право да ги отхвърлите или приемете.'
        )
      ),
    ],
    textBottom1:
      'За информация относно другите използвани от нас бисквитки и сървърни регистрационни файлове, Ви поканваме да прочетете за нашата ',
    textBottom2: ', нашата ',
    textBottom3: ' и за нашия ',
    linkLabels: {
      'data-protection': 'политика за защита на данните',
      'cookies-policy': 'политика за бисквитките',
      'cookies-inventory': 'списък на бисквитките.',
      'privacy-policy': 'политика за поверителност на личните данни',
    },
    accept: 'Приемам аналитичните бисквитки',
    refuse: 'Отхвърлям аналитичните бисквитки',
    more: 'Повече',
    tooltip: 'Продължение',
  },

  cs: {
    lang: 'cs',
    title:
      'Používání souborů cookies na internetových stránkách Evropského parlamentu',
    body: [
      h('p', {}, text('Vážení návštěvníci,')),
      h(
        'p',
        {},
        text(
          'ke zlepšení kvality prohlížení našich webových stránek používáme analytické cookies. Máte možnost je přijmout nebo odmítnout.'
        )
      ),
    ],
    textBottom1:
      'Další informace o ostatních cookies a záznamech na serveru, které používáme, naleznete na těchto stránkách: ',
    textBottom2: ', ',
    textBottom3: ' a ',
    linkLabels: {
      'data-protection': 'ochrana osobních údajů',
      'cookies-policy': 'zásady používání cookies',
      'cookies-inventory': 'inventář cookies.',
      'privacy-policy': 'politika ochrany osobních údajů',
    },
    accept: 'Souhlasím se zasíláním analytických cookies',
    refuse: 'Nesouhlasím se zasíláním analytických cookies',
    more: 'více',
    tooltip: 'Přečtěte si více',
  },

  da: {
    lang: 'da',
    title: 'Håndtering af cookies på Europa-Parlamentets websted',
    body: [
      h('p', {}, text('Kære besøgende')),
      h(
        'p',
        {},
        text(
          'Vi bruger analysecookies for at tilbyde dig en bedre browsingoplevelse. Du kan vælge at afvise eller acceptere dem.'
        )
      ),
    ],
    textBottom1:
      'For alle oplysninger om de øvrige cookies og serverlogfiler, vi bruger, opfordrer vi dig til at læse vores ',
    textBottom2: ', vores ',
    textBottom3: ' og vores ',
    linkLabels: {
      'data-protection': 'databeskyttelsespolitik',
      'cookies-policy': 'cookiepolitik',
      'cookies-inventory': 'cookieoversigt.',
      'privacy-policy': 'Privatlivspolitik',
    },
    accept: 'Jeg accepterer analysecookies',
    refuse: 'Jeg afviser analysecookies',
    more: 'Mere',
    tooltip: 'Læs mere',
  },

  de: {
    lang: 'de',
    title: 'Verwendung von Cookies auf der Website des Europäischen Parlaments',
    body: [
      h('p', {}, text('Guten Tag!')),
      h(
        'p',
        {},
        text(
          'Das Europäische Parlament setzt Analyse-Cookies, um die Qualität des Besuchs seiner Website zu verbessern. Sie können diese Cookies ablehnen oder akzeptieren.'
        )
      ),
    ],
    textBottom1:
      'Weitere Informationen über die anderen Cookies und die Serverprotokolle, die vom Europäischen Parlament verwendet werden, finden Sie unter ',
    textBottom2: ', ',
    textBottom3: ' und im ',
    linkLabels: {
      'data-protection': 'Schutz personenbezogener Daten',
      'cookies-policy': 'Cookies und Datenschutz',
      'cookies-inventory': 'Cookie-Verzeichnis.',
      'privacy-policy': 'datenschutzbestimmungen',
    },
    accept: 'Analyse-Cookies akzeptieren',
    refuse: 'Analyse-Cookies ablehnen',
    more: 'Mehr',
    tooltip: 'Fortsetzung lesen',
  },

  el: {
    lang: 'el',
    title:
      'Πώς χρησιμοποιούνται τα cookies στον ιστότοπο του Ευρωπαϊκού Κοινοβουλίου',
    body: [
      h('p', {}, text('Αγαπητέ επισκέπτη,')),
      h(
        'p',
        {},
        text(
          'Χρησιμοποιούμε cookies ανάλυσης για να σας προσφέρουμε καλύτερη εμπειρία περιήγησης . Έχετε την επιλογή να τα αρνηθείτε ή να τα αποδεχθείτε.'
        )
      ),
    ],
    textBottom1:
      'Για οποιαδήποτε πληροφορία σχετικά με τα άλλα cookies και αρχεία καταγραφής διακομιστών που χρησιμοποιούμε, σας καλούμε να διαβάσετε την πολιτική μας για την ',
    textBottom2: ', την ',
    textBottom3: ' και τον ',
    linkLabels: {
      'data-protection': 'προστασία των δεδομένων',
      'cookies-policy': 'πολιτική μας για τα cookies',
      'cookies-inventory': 'κατάλογο των cookies μας.',
      'privacy-policy': 'πολιτική απορρήτου',
    },
    accept: 'Αποδέχομαι τα cookies ανάλυσης',
    refuse: 'Απορρίπτω τα cookies ανάλυσης',
    more: 'Περισσότερα',
    tooltip: 'Διαβάστε τη συνέχεια',
  },

  es: {
    lang: 'es',
    title: 'La gestión de las cookies en el sitio del Parlamento Europeo',
    body: [
      h('p', {}, text('Estimado/a visitante:')),
      h(
        'p',
        {},
        text(
          'Utilizamos cookies de análisis para ofrecerle una mejor experiencia de navegación. Tiene la opción de rechazarlas o de aceptarlas.'
        )
      ),
    ],
    textBottom1:
      'Para cualquier información sobre las otras cookies y los servidores que utilizamos, le rogamos lea nuestra política de ',
    textBottom2: ', nuestra ',
    textBottom3: ' y nuestro ',
    linkLabels: {
      'data-protection': 'Protección de los datos personales',
      'cookies-policy': 'Política de cookies',
      'cookies-inventory': 'Inventario de cookies.',
      'privacy-policy': 'política de privacidad',
    },
    accept: 'Acepto las cookies de análisis.',
    refuse: 'Rechazo las cookies de análisis.',
    more: 'Más',
    tooltip: 'Más...',
  },

  et: {
    lang: 'et',
    title: 'Küpsiste haldamine Euroopa Parlamendi saidil',
    body: [
      h('p', {}, text('Austatud külastaja')),
      h(
        'p',
        {},
        text(
          'Parema sirvimiskogemuse pakkumiseks kasutame analüüsiküpsiseid. Teil on võimalus neist keelduda või nendega nõustuda.'
        )
      ),
    ],
    textBottom1:
      'Teabe saamiseks muude küpsiste ja serverilogide kohta, mida me kasutame, soovitame tutvuda meie ',
    textBottom2: ', ',
    textBottom3: ' ja ',
    linkLabels: {
      'data-protection': 'privaatsuspoliitika ja andmekaitsepõhimõtetega',
      'cookies-policy': 'küpsiste kasutamise põhimõtetega',
      'cookies-inventory': 'küpsiste loeteluga.',
      'privacy-policy': 'andmekaitsepõhimõtted',
    },
    accept: 'Nõustun analüüsiküpsistega',
    refuse: 'Keeldun analüüsiküpsistest',
    more: 'Lisateave',
    tooltip: 'Loe lähemalt',
  },

  fi: {
    lang: 'fi',
    title: 'Evästeiden hallinta Euroopan parlamentin verkkosivustolla',
    body: [
      h('p', {}, text('Tiedoksi sivuston käyttäjälle')),
      h(
        'p',
        {},
        text(
          'Käytämme analytiikkaevästeitä käyttäjäkokemuksesi parantamiseen. Voit estää tai sallia ne.'
        )
      ),
    ],
    textBottom1:
      'Tietoa käyttämistämme muista evästeistä ja palvelinlokeista: ',
    textBottom2: ', ',
    textBottom3: ' ja ',
    linkLabels: {
      'data-protection': 'tietosuojakäytäntömme',
      'cookies-policy': 'evästekäytäntömme',
      'cookies-inventory': 'evästehakemistomme',
      'privacy-policy': 'tietosuojakäytäntö',
    },
    accept: 'Hyväksyn analytiikkaevästeet',
    refuse: 'En hyväksy analytiikkaevästeitä',
    more: 'Lisää',
    tooltip: 'Lue lisää',
  },

  fr: {
    lang: 'fr',
    title: 'La gestion des cookies sur le site du Parlement européen',
    body: [
      h('p', {}, text('Cher visiteur,')),
      h(
        'p',
        {},
        text(
          'Nous utilisons des cookies analytiques pour vous offrir une meilleure expérience de navigation. Vous pouvez les refuser ou les accepter.'
        )
      ),
    ],
    textBottom1:
      'Pour obtenir des informations sur les autres cookies et les journaux de serveur que nous utilisons, veuillez lire notre ',
    textBottom2: ', notre ',
    textBottom3: ' et notre ',
    linkLabels: {
      'data-protection': 'politique de protection des données',
      'cookies-policy': 'politique d’utilisation des cookies',
      'cookies-inventory': 'inventaire des cookies.',
      'privacy-policy': 'politique de confidentialité',
    },
    accept: 'J’accepte les cookies analytiques',
    refuse: 'Je refuse les cookies analytiques',
    more: 'Plus d’options',
    tooltip: 'Lire la suite',
  },

  ga: {
    lang: 'ga',
    title: 'Bainistiú fianán ar láithreán gréasáin Pharlaimint na hEorpa',
    body: [
      h('p', {}, text('A chuairteoir, a chara,')),
      h(
        'p',
        {},
        text(
          'Úsáidimid fianáin anailísíochta chun eispéireas brabhsála níos fearr a thairiscint duit. Tá an rogha agat iad a dhiúltú nó glacadh leo.'
        )
      ),
    ],
    textBottom1:
      'Le haghaidh aon fhaisnéis faoi na fianáin agus na logaí freastalaí eile a úsáidimid, iarraimid ort go léifeá ár ',
    textBottom2: ', ár ',
    textBottom3: ' agus ár ',
    linkLabels: {
      'data-protection': 'mbeartas cosanta sonraí',
      'cookies-policy': 'mbeartas fianán',
      'cookies-inventory': 'bhfardal fianán.',
      'privacy-policy': 'beartas príobháideachais',
    },
    accept: 'Glacaim le fianáin anailísíochta',
    refuse: 'Diúltaím fianáin anailísíochta',
    more: 'Níos mó',
    tooltip: 'Read more',
  },

  hr: {
    lang: 'hr',
    title:
      'Upravljanje kolačićima na internetskoj stranici Europskog parlamenta',
    body: [
      h('p', {}, text('Poštovani posjetitelji,')),
      h(
        'p',
        {},
        text(
          'Koristimo analitičke kolačiće kako bismo vam omogućili bolje pretraživanje. Kolačiće možete odbiti ili prihvatiti.'
        )
      ),
    ],
    textBottom1:
      'Sve informacije o drugim kolačićima i zapisnicima poslužitelja kojima se koristimo možete pronaći u našoj ',
    textBottom2: ', ',
    textBottom3: ' i ',
    linkLabels: {
      'data-protection': 'politici zaštite podataka',
      'cookies-policy': 'politici kolačića',
      'cookies-inventory': 'popisu kolačića.',
      'privacy-policy': 'politika zaštite privatnosti',
    },
    accept: 'Prihvaćam analitičke kolačiće',
    refuse: 'Ne prihvaćam analitičke kolačiće',
    more: 'Više',
    tooltip: 'Pročitaj više',
  },

  hu: {
    lang: 'hu',
    title: 'A cookie-k használata az Európai Parlament honlapján',
    body: [
      h('p', {}, text('Tisztelt Látogató!')),
      h(
        'p',
        {},
        text(
          'Elemzési célú sütiket használunk, hogy jobb böngészési élményt nyújtsunk Önnek. Lehetősége van arra, hogy elutasítsa vagy elfogadja őket.'
        )
      ),
    ],
    textBottom1:
      'Az általunk használt többi sütivel és szervernaplóval kapcsolatos információkért, kérjük, olvassa el ',
    textBottom2: ', ',
    textBottom3: ' és ',
    linkLabels: {
      'data-protection': 'adatvédelmi szabályzatunkat',
      'cookies-policy': 'sütikre vonatkozó szabályzatunkat',
      'cookies-inventory': 'sütijegyzékünket.',
      'privacy-policy': 'adatvédelmi szabályzat',
    },
    accept: 'Elfogadom az elemzési célú sütiket',
    refuse: 'Elutasítom az elemzési célú sütiket',
    more: 'További információk',
    tooltip: 'Tovább',
  },

  it: {
    lang: 'it',
    title: 'La gestione dei cookie sul sito del Parlamento europeo',
    body: [
      h('p', {}, text('Gentile visitatore,')),
      h(
        'p',
        {},
        text(
          'utilizziamo cookie analitici per migliorare la tua esperienza di navigazione. Puoi scegliere se rifiutarli o accettarli.'
        )
      ),
    ],
    textBottom1:
      'Per informazioni sugli altri cookie e i log di server che utilizziamo ti invitiamo a leggere la nostra ',
    textBottom2: ', la nostra ',
    textBottom3: ' e il nostro ',
    linkLabels: {
      'data-protection': 'politica in materia di protezione dei dati personali',
      'cookies-policy': 'politica in materia di cookie',
      'cookies-inventory': 'inventario dei cookie.',
      'privacy-policy': 'informativa sulla privacy',
    },
    accept: 'Accetto i cookie analitici',
    refuse: 'Rifiuto i cookie analitici',
    more: 'Altre opzioni',
    tooltip: 'Seguito',
  },

  lt: {
    lang: 'lt',
    title: 'Slapukų tvarkymas Europos Parlamento svetainėje',
    body: [
      h('p', {}, text('Gerbiamas lankytojau,')),
      h(
        'p',
        {},
        text(
          'naudojame analitinius slapukus, kad jums būtų patogiau naršyti. Galite sutikti arba nesutikti, kad jie būtų naudojami.'
        )
      ),
    ],
    textBottom1:
      'Informaciją apie kitus mūsų naudojamus slapukus ir serverio žurnalus rasite perskaitę mūsų ',
    textBottom2: ', ',
    textBottom3: ' ir ',
    linkLabels: {
      'data-protection': 'duomenų apsaugos politiką',
      'cookies-policy': 'slapukų politiką',
      'cookies-inventory': 'slapukų aprašą.',
      'privacy-policy': 'privatumo politika',
    },
    accept: 'Sutinku, kad būtų naudojami analitiniai slapukai',
    refuse: 'Nesutinku, kad būtų naudojami analitiniai slapukai',
    more: 'Daugiau',
    tooltip: 'Skaityti daugiau',
  },

  lv: {
    lang: 'lv',
    title: 'Sīkdatņu pārvaldība Eiropas Parlamenta tīmekļa vietnē',
    body: [
      h('p', {}, text('Godātais apmeklētāj,')),
      h(
        'p',
        {},
        text(
          'Mēs izmantojam analītiskās sīkdatnes, lai jums nodrošinātu labāku pārlūkošanas pieredzi. Jūs varat tās noraidīt vai pieņemt'
        )
      ),
    ],
    textBottom1:
      'Ar papildu informāciju par citām mūsu izmantotajām sīkdatnēm un serveru ierakstiem  aicinām iepazīties sadaļās par ',
    textBottom2: ', mūsu ',
    textBottom3: ' un ',
    linkLabels: {
      'data-protection': 'personas datu aizsardzības politiku',
      'cookies-policy': 'sīkdatņu politiku',
      'cookies-inventory': 'sīkdatņu sarakstu.',
      'privacy-policy': 'privātuma politika',
    },
    accept: 'Es piekrītu analītisko sīkdatņu izmantošanai',
    refuse: 'Es atsakos no analītiskajām sīkdatnēm',
    more: 'Vairāk',
    tooltip: 'Lasīt tālāk',
  },

  mt: {
    lang: 'mt',
    title: 'Il-ġestjoni tal-cookies fis-sit tal-Parlament Ewropew',
    body: [
      h('p', {}, text('Għażiż(a) viżitatur/viżitatriċi,')),
      h(
        'p',
        {},
        text(
          "Aħna nużaw cookies analitiċi biex noffrulek esperjenza ta' bbrawżjar aħjar. Għandek l-għażla li tirrifjuta jew li taċċettahom."
        )
      ),
    ],
    textBottom1:
      'Għal kwalunkwe informazzjoni dwar cookies oħra u l-logs tas-servers li nużaw, nistednuk taqra ',
    textBottom2: ', ',
    textBottom3: ' u ',
    linkLabels: {
      'data-protection': 'l-politika tagħna dwar il-protezzjoni tad-data',
      'cookies-policy': 'il-politika tagħna dwar il-cookies',
      'cookies-inventory': 'l-inventarju tagħna dwar il-cookies.',
      'privacy-policy': 'politika tal-privatezza',
    },
    accept: 'Naċċetta l-cookies analitiċi',
    refuse: 'Nirrifjuta l-cookies analitiċi',
    more: 'Aktar',
    tooltip: 'Read more',
  },

  nl: {
    lang: 'nl',
    title: 'Cookies op de website van het Europees Parlement',
    body: [
      h('p', {}, text('Geachte bezoeker,')),
      h(
        'p',
        {},
        text(
          'Wij gebruiken analytische cookies om uw surfervaring te verbeteren. U kunt deze cookies accepteren of weigeren.'
        )
      ),
    ],
    textBottom1:
      'Nadere informatie over andere cookies en serverlogs die we gebruiken kunt u vinden in ons ',
    textBottom2: ', ons ',
    textBottom3: ' en onze lijst van ',
    linkLabels: {
      'data-protection': 'gegevensbeschermingsbeleid',
      'cookies-policy': 'cookiebeleid',
      'cookies-inventory': 'cookies.',
      'privacy-policy': 'privacybeleid',
    },
    accept: 'Ik accepteer analytische cookies',
    refuse: 'Ik weiger analytische cookies',
    more: 'Meer',
    tooltip: 'Lees meer',
  },

  pl: {
    lang: 'pl',
    title: 'Zarządzanie ciasteczkami na stronie Parlamentu Europejskiego',
    body: [
      h('p', {}, text('Drogi użytkowniku!')),
      h(
        'p',
        {},
        text(
          'W celu zapewnienia wyższej jakości korzystania z naszej strony internetowej używamy analitycznych plików cookie. Możesz zdecydować, czy zgadzasz się na ich stosowanie, czy też nie.'
        )
      ),
    ],
    textBottom1:
      'W celu uzyskania wszelkich informacji na temat innych używanych przez nas plików cookie i rejestrów aktywności sieciowej zapraszamy do zapoznania się z naszą ',
    textBottom2: ', naszą ',
    textBottom3: ' i naszym ',
    linkLabels: {
      'data-protection': 'Polityką ochrony prywatności',
      'cookies-policy': 'Polityką dotyczącą plików cookie',
      'cookies-inventory': 'Wykazem plików cookie.',
      'privacy-policy': 'polityka prywatności',
    },
    accept: 'Zgadzam się na stosowanie analitycznych plików cookie.',
    refuse: 'Nie zgadzam się na stosowanie analitycznych plików cookie.',
    more: 'Więcej',
    tooltip: 'Przeczytaj więcej',
  },

  pt: {
    lang: 'pt',
    title: 'A gestão dos cookies no sítio Web do Parlamento Europeu.',
    body: [
      h('p', {}, text('Caro(a) visitante,')),
      h(
        'p',
        {},
        text(
          'Utilizamos cookies analíticos para lhe oferecer uma melhor experiência de navegação. Tem a opção de recusá-los ou aceitá-los.'
        )
      ),
    ],
    textBottom1:
      'Para mais informações sobre os outros cookies e registos de servidores que utilizamos, queira consultar a nossa ',
    textBottom2: ', a nossa ',
    textBottom3: ' e o nosso ',
    linkLabels: {
      'data-protection': 'política de proteção de dados',
      'cookies-policy': 'política relativa aos cookies',
      'cookies-inventory': 'inventário de cookies.',
      'privacy-policy': 'política de confidencialidade',
    },
    accept: 'Aceito cookies analíticos',
    refuse: 'Recuso cookies analíticos',
    more: 'Mais',
    tooltip: 'Ler mais',
  },

  ro: {
    lang: 'ro',
    title: 'Gestionarea modulelor cookie pe site-ul Parlamentului European',
    body: [
      h('p', {}, text('Dragi vizitatori,')),
      h(
        'p',
        {},
        text(
          'Utilizăm cookie-uri de analiză pentru a vă oferi o experiență de navigare mai bună. Puteți alege să le refuzați sau să le acceptați.'
        )
      ),
    ],
    textBottom1:
      'Pentru informații suplimentare despre alte cookie-uri și jurnale de server pe care le folosim, vă invităm să citiți ',
    textBottom2: ', ',
    textBottom3: ' și ',
    linkLabels: {
      'data-protection': 'politica de protecție a datelor',
      'cookies-policy': 'politica privind cookie-urile',
      'cookies-inventory': 'inventarul cookie-urilor.',
      'privacy-policy': 'politica de confidențialitate',
    },
    accept: 'Accept cookie-urile de analiză',
    refuse: 'Refuz cookie-urile de analiză',
    more: 'Detalii',
    tooltip: 'Mai mult',
  },

  sk: {
    lang: 'sk',
    title: 'Správa súborov cookies na webovej stránke Európskeho parlamentu',
    body: [
      h('p', {}, text('Vážený návštevník,')),
      h(
        'p',
        {},
        text(
          'Európsky parlament používa analytické súbory cookie, aby vám umožnil jednoduchšie prehliadanie. Môžete sa rozhodnúť, či s ich používaním budete súhlasiť alebo nie.'
        )
      ),
    ],
    textBottom1:
      'Viac o ostatných súboroch cookie a serverových logoch, ktoré používa Európsky parlament, si môžete prečítať na stránkach ',
    textBottom2: ', ',
    textBottom3: ' a ',
    linkLabels: {
      'data-protection': 'politika ochrany údajov',
      'cookies-policy': 'politika používania súborov cookie',
      'cookies-inventory': 'zoznam používaných súborov cookie.',
      'privacy-policy': 'ochrana súkromia',
    },
    accept: 'Súhlasím s používaním analytických súborov cookie.',
    refuse: 'Nesúhlasím s používaním analytických súborov cookie.',
    more: 'Viac',
    tooltip: 'Čítať ďalej',
  },

  sl: {
    lang: 'sl',
    title: 'Uporaba piškotkov na spletišču Evropskega parlamenta',
    body: [
      h('p', {}, text('Spoštovani obiskovalci,')),
      h(
        'p',
        {},
        text(
          'analitične piškotke uporabljamo, da bi vam omogočili učinkovitejše brskanje. Lahko jih zavrnete ali sprejmete.'
        )
      ),
    ],
    textBottom1:
      'Za vse informacije o drugih piškotkih in strežniških dnevnikih, ki jih uporabljamo, vas vabimo, da si preberete našo ',
    textBottom2: ', našo ',
    textBottom3: ' in naš ',
    linkLabels: {
      'data-protection': 'politiko varstva podatkov',
      'cookies-policy': 'politiko piškotkov',
      'cookies-inventory': 'seznam piškotkov.',
      'privacy-policy': 'pravilnik o zasebnosti',
    },
    accept: 'Sprejmi analitične piškotke',
    refuse: 'Zavrni analitične piškotke',
    more: 'Več',
    tooltip: 'Preberite več',
  },

  sv: {
    lang: 'sv',
    title: 'Hur används kakor (cookies), på Europaparlamentets webbplats?',
    body: [
      h('p', {}, text('Hej,')),
      h(
        'p',
        {},
        text(
          'vi använder analytiska kakor för att du lättare ska kunna navigera på våra webbplatser. Du kan välja att avvisa eller godkänna dem.'
        )
      ),
    ],
    textBottom1:
      'För information om övriga kakor och serverloggar som vi använder kan du läsa vår ',
    textBottom2: ', vår ',
    textBottom3: ' och vår ',
    linkLabels: {
      'data-protection': 'policy för skydd av personuppgifter',
      'cookies-policy': 'policy för kakor',
      'cookies-inventory': 'genomgång av kakor.',
      'privacy-policy': 'integritetspolicy',
    },
    accept: 'Jag godkänner analytiska kakor',
    refuse: 'Jag avvisar analytiska kakor',
    more: 'Mer',
    tooltip: 'Läs mer',
  },
};
