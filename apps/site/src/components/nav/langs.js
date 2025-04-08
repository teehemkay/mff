export const base = {
  accessibilitytxt: '',
  ariaCurrent: '',
  bgcolor: '',
  colorfont: '',
  coloricon: '',
  current: '',
  focus: 'ep-focus-outline',
  hiddenlabel: '',
  hoverbgcolor: '',
  hovercoloricon: '',
  hovertxtcolor: '',
  icon: '',
  iconl: 'false',
  iconr: 'false',
  rel: '',
  role: '',
  sizefont: 'ep:text-body-l',
  spacingico: '',
  span: false,
  target: '',
  weightfont: '',
};

export const labels = [
  {
    label: 'BG - български',
    lang: 'bg',
  },
  {
    label: 'ES - Español',
    lang: 'bg',
  },
  {
    label: 'CS - Čeština',
    lang: 'cs',
  },
  {
    label: 'DA - Dansk',
    lang: 'da',
  },
  {
    label: 'DE - Deutsch',
    lang: 'de',
  },
  {
    label: 'ET - Eesti keel',
    lang: 'et',
  },
  {
    label: 'EL - ελληνικά',
    lang: 'el',
  },
  {
    current: 'ep:bg-blue-link-s-current',
    hoverbgcolor: '',
    hreflang: 'en',
    icon: 'ep-icon-checked',
    label: 'EN - English',
    lang: 'en',
    spacingico: 'ep:[&_.label]:mr-2xs',
  },
  {
    label: 'GA - Gaeilge',
    lang: 'ga',
  },
  {
    label: 'HR - Hrvatski',
    lang: 'hr',
  },
  {
    label: 'IT - Italiano',
    lang: 'it',
  },
  {
    label: 'LV - Latviešu valoda',
    lang: 'lv',
  },
  {
    label: 'LT - Lietuvių kalba',
    lang: 'lt',
  },
  {
    label: 'HU - Magyar',
    lang: 'hu',
  },
  {
    label: 'MT - Malti',
    lang: 'mt',
  },
  {
    label: 'NL - Nederlands',
    lang: 'nl',
  },
  {
    label: 'PL - Polski',
    lang: 'pl',
  },
  {
    label: 'PT - Português',
    lang: 'pt',
  },
  {
    label: 'RO - Română',
    lang: 'ro',
  },
  {
    label: 'SK - Slovenčina',
    lang: 'sk',
  },
  {
    label: 'SL - Slovenščina',
    lang: 'sl',
  },
  {
    label: 'FI - Suomi',
    lang: 'fi',
  },
  {
    label: 'SV - Svenska',
    lang: 'sv',
  },
];

export const langItems = labels.map((label) => ({
  ...base,
  ...label,
  href: `../${label.lang}`,
  hreflang: label.lang,
}));

export default langItems;
