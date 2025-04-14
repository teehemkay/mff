export const socialNetwork = 'facebook';

const linker = ({ url }) => `https://www.facebook.com/share.php?u=${url}`;

export const ShareOnFacebook = ({ url, title, shareOn }) => {
  const share = `${shareOn(socialNetwork)} - ${title}`;

  return (
    <a
      href={linker({ url: encodeURIComponent(url) })}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="sr-only">{share}</span>
      <svg
        aria-hidden
        className="facebook"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 34 34"
        width="34"
        height="34"
      >
        <path
          className="back"
          d="M22.5,38.59a17,17,0,1,0-17-17,17,17,0,0,0,17,17"
          transform="translate(-5.5 -4.59)"
        />
        <path
          className="icon"
          d="M19.9,31.62H24v-10h2.73l.36-3.47H24V16.37c0-.9.08-1.39,1.36-1.39h1.7V11.52H24.33c-3.27,0-4.43,1.68-4.43,4.51V18.1h-2v3.47h2Z"
          transform="translate(-5.5 -4.59)"
        />
      </svg>
    </a>
  );
};

export default ShareOnFacebook;
