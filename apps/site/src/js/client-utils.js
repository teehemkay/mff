export const basePath = 'gender-equality-week';

export const pageHrefMaker = (lang) => (page) =>
  page === kIndex ? `/${lang}/` : `/${lang}/${page}/`;

export const langHrefMaker = (currentPage) => (lang) =>
  currentPage === '/'
    ? `/${basePath}/${lang}/`
    : `/${basePath}/${lang}/${currentPage}/`;

export const splitLines = (text, splitter) => {
  if (
    !text ||
    typeof text !== 'string' ||
    text.trim() === '' ||
    !text.includes(splitter)
  ) {
    return [];
  }

  return text
    .trim()
    .split(/\r?\n/)
    .map((line) =>
      line
        .trim()
        .split(splitter)
        .map((item) => item.trim())
    );
};
