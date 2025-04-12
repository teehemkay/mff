const epLogo = ({ lang, altText, url }) => (
  <div className="logo flex-1 mx-2 sm:mx-0 my-2">
    <a href={`https://www.europarl.europa.eu/portal/${lang}`}>
      <img
        src={url}
        alt={altText}
        className="logo-european-union max-w-[200px] h-[40px]"
      />
    </a>
  </div>
);

export default epLogo;
