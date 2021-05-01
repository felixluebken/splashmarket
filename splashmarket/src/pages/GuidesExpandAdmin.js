import React from 'react';
import './Guides.css';

import HeaderGuide from '../components/header/headerGuide';
import Footer from '../components/footer/footer';

import GuideTag from '../components/small-panels/guideTagsLarge';
import GuideTagBlue from '../components/small-panels/guideTagsLargeBlue';

/*

bannerColor                 -str hex code of the background color
bannerTextColor             -str hex code of the text color
bannerIconUrl               -str
bannerBackgroundUrl         -str        (uncomment when assets are ready from database)

botName                     -str

instagramLink               -str
twitterLink                 -str
siteLink                    -str

*/

function GuidesExpandUser(props) {
  const {
    bannerColor, bannerIconUrl, botName, bannerTextColor, twitterLink, instagramLink, siteLink,
  } = props;
  return (
    <>
      <HeaderGuide />
      <div className="guides_expand-header_banner" style={{ backgroundColor: `${bannerColor}` /* ,backgroundImage:`url(${bannerBackgroundUrl})` */ }}>
        <div className="guides_expand-header_container">
          <div className="guides_expand-header_icon" style={{ backgroundImage: `url(${bannerIconUrl})` }} />
          <h4 className="guides_title" style={{ color: `${bannerTextColor}` }}>{botName}</h4>
        </div>

        <div className="guides_expand-edit_btn">
          <span className="guides_expand-edit_btn-text">Edit Guide</span>
        </div>
      </div>

      <div className="guides_expand-panel">
        <div className="guides_expand-panel_header-container">

          <div className="guides_expand-panel_header-container-part">
            <p className="text-light-big" style={{ margin: 0 }}>Type</p>
            <p className="text-normal-big" style={{ margin: '10px 0' }}>Unbindable (24 hour cooldown)</p>
          </div>

          <div className="guides_expand-panel_header-container-part guides_expand-panel_header-links">
            <a href={twitterLink}>
              <div className="guides_expand-twitter" />
            </a>
            <a href={instagramLink}>
              <div className="guides_expand-instagram" style={{ marginLeft: '20px' }} />
            </a>

            <a href={siteLink} className="guides_link" style={{ marginLeft: '20px', marginTop: '4px' }}>Visit Site ⇾</a>
          </div>

        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Renewal</p>
          <div className="guides_expand-small_panel-container" style={{ margin: '10px 0' }}>
            <GuideTag tag="$100/6 Months" />
            <GuideTag tag="Lifetime" />
          </div>
        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Sites Supported</p>
          <div className="guides_expand-small_panel-container" style={{ margin: '10px 0' }}>
            <GuideTag tag="Shopify" />
            <GuideTag tag="Footsites" />
            <GuideTag tag="Mesh" />
            <GuideTag tag="Supreme" />
            <GuideTag tag="Shopify" />
            <GuideTag tag="Footsites" />
            <GuideTag tag="Mesh" />
            <GuideTag tag="Supreme" />
          </div>
        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Systems Supported</p>
          <div className="guides_expand-small_panel-container" style={{ margin: '10px 0' }}>
            <GuideTag tag="Windows" />
            <GuideTag tag="Mac OS" />
          </div>
        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Middleman</p>
          <span className="text-normal-big">
            Once both parties are ready, head to
            {' '}
            <GuideTagBlue tag="#create-ticket" />
            {' '}
            and type
            {' '}
            <GuideTagBlue tag="$new cyber" />
            Note: We will ONLY MM Cyber off-cooldown.

          </span>
        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Scam Prevention</p>
          <p className="text-normal-big">

            -- Please read #scammer-prevention to avoid being scammed!
            {' '}
            <br />
            -- MMs will ALWAYS do deals inside the Splash Market server.
            {' '}
            <br />
            -- Avoid renting to & from suspicious users!
            {' '}
            <br />
          </p>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default GuidesExpandUser;
