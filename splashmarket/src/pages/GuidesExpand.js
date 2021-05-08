import React, { useState, useEffect, useContext } from 'react';
import './Guides.css';
import { useParams, useHistory } from 'react-router-dom';
import HeaderGuide from '../components/header/headerGuide';
import Footer from '../components/footer/footer';
import { verifyAdmin } from '../helpers/helpers';
import GuideTag from '../components/small-panels/guideTagsLarge';
import GuideTagBlue from '../components/small-panels/guideTagsLargeBlue';
import GuideService from '../services/GuideService';
import GuidesAdminEditPopup from '../popups/GuidesAdminEditPopup';
import { UserContext } from '../context/UserContext';
import GuidesBotAdminEditPopup from '../popups/GuidesBotAdminEditPopup';

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

function GuidesExpand(props) {
  const {
    bannerColor, bannerIconUrl, bannerTextColor, twitterLink, instagramLink, siteLink,
  } = props;
  const [user] = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  const [botGuide, setBotGuide] = useState(null);
  const [botGuideIcon, setBotGuideIcon] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  let botName;
  let fileContents;
  let renewalTypes;
  let systemsSupported;
  let tags;

  if (botGuide) {
    ({
      botName, fileContents, renewalTypes, systemsSupported, tags,
    } = botGuide);
  }
  const { bot } = useParams();

  const getBotGuide = () => {
    const onGetBotGuideSuccess = (response) => {
      setBotGuide(response.data);
    };
    const onGetBotGuideError = (error) => {
      console.log('ERROR GETTING BOT: ', error.response);
      history.push('/');
    };

    GuideService.FindBotGuide(bot, onGetBotGuideSuccess, onGetBotGuideError);
  };
  useEffect(() => {
    getBotGuide();
  }, []);

  useEffect(() => {
    setIsAdmin(verifyAdmin(user.role, user.isLoggedIn));
  }, []);

  useEffect(() => {
    if (fileContents && fileContents.buffer) {
      // eslint-disable-next-line new-cap
      const img = new Buffer.from(fileContents.buffer).toString('base64');
      const imgURL = `data:image/png;base64,${img}`;
      setBotGuideIcon(imgURL);
    }
  }, [botGuide]);

  const toggleEditGuideModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

  return (
    <>
      {isEditModalVisible && (
      <GuidesBotAdminEditPopup tags={tags} toggleEditGuideModal={toggleEditGuideModal} botGuide={botGuide} />
      )}
      <HeaderGuide />
      <div className="guides_expand-header_banner" style={{ backgroundColor: '#131323' /* ,backgroundImage:`url(${bannerBackgroundUrl})` */ }}>
        <div className="guides_expand-header_container">
          <div className="guides_expand-header_icon" style={{ backgroundImage: `url(${botGuideIcon})` }} />
          <h4 className="guides_title" style={{ color: `${bannerTextColor}` }}>{botName}</h4>
        </div>

        {isAdmin && (
        <div
          className="guides_expand-edit_btn"
          role="button"
          tabIndex={0}
          aria-label="Edit Bot GUide"
          aria-hidden="true"
          onClick={toggleEditGuideModal}
        >
          <span className="guides_expand-edit_btn-text">Edit Guide</span>
        </div>
        )}

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
            {tags && tags.length > 0 && tags.map((tag) => <GuideTag tag={tag} />)}

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

export default GuidesExpand;
