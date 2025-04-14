import { kUseYourVote, kHeroMovie } from '../_props/constants.js';
import { pageDataForLang, metadataForLang } from '../_props/misc.js';

export const shareWidgetProps = ({ lang }) => {
  const { onTwitter, onFacebook, onLinkedIn, onWhatsApp, shareLabel } =
    metadataForLang(lang);

  const socialNetworkLabels = {
    facebook: onFacebook,
    twitter: onTwitter,
    linkedin: onLinkedIn,
    whatsapp: onWhatsApp,
  };

  return {
    shareLabel,
    socialNetworkLabels,
    copyURLProps: {
      copyLabel: pageDataForLang(kHeroMovie, lang).labelPlayer12,
      copyURLToClipboard: pageDataForLang(kUseYourVote, lang).formOtherPeople5,
      urlCopiedToClipboard: pageDataForLang(kUseYourVote, lang)
        .formOtherPeople6,
    },
  };
};

export default shareWidgetProps;
