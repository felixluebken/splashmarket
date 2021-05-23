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
  let gracePeriod;
  let instagramURL;
  let twitterURL;
  let middleman;
  let scammerPrevention;
  let unbindType;
  let tags;
  let siteURL;
  let headerColor;

  console.log('BOT GUIDE: ', botGuide);
  if (botGuide) {
    ({
      instagramURL = '',
      twitterURL = '',
      unbindType = '',
      middleman = '',
      scammerPrevention = '',
      gracePeriod = '',
      headerColor = '',
      siteURL = '',
      botName,
      fileContents,
      renewalTypes,
      systemsSupported,
      tags,
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
      <GuidesBotAdminEditPopup tags={tags} toggleEditGuideModal={toggleEditGuideModal} botGuide={botGuide} setBotGuide={setBotGuide} />
      )}
      <HeaderGuide />
      <div className="guides_expand-header_banner" style={{ backgroundColor: `${headerColor || 'transparent'}` /* ,backgroundImage:`url(${bannerBackgroundUrl})` */ }}>
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
            <p className="text-normal-big" style={{ margin: '10px 0' }}>{unbindType}</p>
          </div>

          <div className="guides_expand-panel_header-container-part guides_expand-panel_header-links">
            {twitterURL && (
            <a href={twitterURL} target="_blank" rel="noreferrer">
              <div className="guides_expand-twitter" />
            </a>
            )}

            {instagramURL && (
            <a href={instagramURL} target="_blank" rel="noreferrer">
              <div className="guides_expand-instagram" style={{ marginLeft: '20px' }} />
            </a>
            )}

            {siteURL && (
            <a href={siteURL} target="_blank" className="guides_link" style={{ marginLeft: '20px', marginTop: '4px' }} rel="noreferrer">Visit Site ⇾</a>
            )}

          </div>

        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Renewal</p>
          <div className="guides_expand-small_panel-container" style={{ margin: '10px 0' }}>
            {renewalTypes && renewalTypes.length > 0 && renewalTypes.map((renewal) => {
              let tag;
              if (renewal.renewalType.toLowerCase() === 'lifetime') {
                if (renewal.price) {
                  tag = `Lifetime/${renewal.price}`;
                } else {
                  tag = 'Lifetime';
                }
              } else if (renewal.price && renewal.renewalInterval) {
                tag = `${renewal.price}/${renewal.renewalInterval}`;
              } else {
                tag = `${renewal.renewalType}`;
              }
              return (
                <GuideTag tag={tag} isCloseIconVisible={false} />);
            })}
          </div>
        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Sites Supported</p>
          <div className="guides_expand-small_panel-container" style={{ margin: '10px 0' }}>
            {tags && tags.length > 0 && tags.map((tag) => <GuideTag tag={tag} isCloseIconVisible={false} />)}

          </div>
        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Systems Supported</p>
          <div className="guides_expand-small_panel-container" style={{ margin: '10px 0' }}>
            {systemsSupported === 'windows' && (
            <GuideTag tag="Windows" isCloseIconVisible={false} />
            )}
            {systemsSupported === 'macOS' && (
            <GuideTag tag="Mac OS" isCloseIconVisible={false} />
            )}
            {systemsSupported === 'all' && (
              <>
                <GuideTag tag="Windows" isCloseIconVisible={false} />
                <GuideTag tag="Mac OS" isCloseIconVisible={false} />
              </>
            )}
          </div>
        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Middleman</p>
          <span className="text-normal-big">

            {'Once both parties are ready, head to '}
            <GuideTagBlue tag="#create-ticket" />
            and type
            <GuideTagBlue tag={`$new ${botName}`} />
            .
            <br />
            {middleman && middleman}
          </span>
        </div>

        <div className="guides_expand-container">
          <p className="text-light" style={{ margin: 0 }}>Scam Prevention</p>
          <p className="text-normal-big">
            {scammerPrevention}
            <br />
          </p>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default GuidesExpand;
