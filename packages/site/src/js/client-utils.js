export const basePath = '';

export const pageHrefMaker = (lang) => (page) =>
  page === 'index' ? `/${lang}/` : `/${lang}/${page}/`;

export const langHrefMaker = (currentPage) => (lang) =>
  currentPage === 'index' ? `/${lang}/` : `/${lang}/${currentPage}/`;

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
        .map((item) => item.trim()),
    );
};
