export const socialNetwork = 'linkedin';

export const linker = ({ title, url }) =>
  `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=&source=`;

export const ShareOnLinkedIn = ({ url, title, shareOn }) => {
  const share = `${shareOn(socialNetwork)} - ${title}`;

  return (
    <a
      href={linker({
        url: encodeURIComponent(url),
        title: encodeURIComponent(title),
      })}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="sr-only">{share}</span>
      <svg
        aria-hidden
        className="linkedin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 34 34"
        width="34"
        height="34"
      >
        <path
          className="back"
          d="M22.5,38.6a17,17,0,1,0-17-17,17,17,0,0,0,17,17"
          transform="translate(-5.5 -4.6)"
        />
        <path
          className="icon"
          d="M17.2,13.05A1.9,1.9,0,1,1,15.3,15a1.9,1.9,0,0,1,1.9-1.9m-1.64,5.24h3.28V28.82H15.56Z"
          transform="translate(-5.5 -4.6)"
        />
        <path
          className="icon"
          d="M20.89,18.29H24v1.44h0a3.45,3.45,0,0,1,3.1-1.7c3.32,0,3.93,2.18,3.93,5v5.78H27.83V23.7c0-1.22,0-2.79-1.7-2.79s-2,1.33-2,2.7v5.21H20.89Z"
          transform="translate(-5.5 -4.6)"
        />
      </svg>
    </a>
  );
};

export default ShareOnLinkedIn;
