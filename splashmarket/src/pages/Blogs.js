
import './Blogs.css'

import HeaderBlogs from '../components/header/headerBlogs'
import Footer from '../components/footer/footer'

import BotBlogPanelLarge from '../components/panels/BlogBotPanelLarge'      //use for new blog posts
import BotBlogPanelSmall from '../components/panels/BlogBotPanelSmall'

import PageSwitch from '../components/page-switch/PageSwitch'


function Blogs(props) {
    return(
        <>
            <HeaderBlogs />
            <div className="blogs_panel-container">
                <BotBlogPanelLarge botName="Cybersole" authorUsername="dearchitect#1234" authorAvatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg" blogUrl="https://google.com" title="PD tweets numerous 4.0 teasers. When should we expect the update? Probably tomorrow im guessing but no one will know for sure"/>
                <BotBlogPanelSmall headerColor="#52FF81" headerTextColor="black" headerTitle="Cybersole" authorUsername="dearchitect#1234" authorAvatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg" bodyTitle="How well did Cybersole perform on the University Blue drop?" bodyContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in."/>
                <BotBlogPanelSmall headerColor="#52FF81" headerTextColor="black" headerTitle="Cybersole" authorUsername="dearchitect#1234" authorAvatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg" bodyTitle="How well did Cybersole perform on the University Blue drop?" bodyContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in. ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in."/>
            </div>
            <PageSwitch />
            <Footer />
        </>
    )
}

export default Blogs;