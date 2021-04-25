import React from 'react';
import './Blogs.css';

import HeaderBlogs from '../components/header/headerBlogs';
import Footer from '../components/footer/footer';

import BotBlogPanelExpand from '../components/panels/BlogBotPanelExpand';

function BlogsExpand(props) {
  return (
    <>
      <HeaderBlogs />
      <div className="blogs_panel-container">
        <BotBlogPanelExpand botName="Cybersole" publishDate="December 12th, 2020" authorUsername="dearchitect#1234" authorAvatar="https://cdn.discordapp.com/avatars/638784999293976635/06d1e75f49559a1b16e6d127ec1c4fbf.jpg" blogUrl="https://google.com" title="PD tweets numerous 4.0 teasers. When should we expect the update? Probably tomorrow im guessing but no one will know for sure" />
        <h5 className="bots_expand-title">Lorem ipsum dolor</h5>
        <p className="bots_expand-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc. Egestas tellus rutrum tellus pellentesque. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Netus et malesuada fames ac turpis egestas maecenas pharetra. Id donec ultrices tincidunt arcu non sodales neque sodales. Praesent tristique magna sit amet. Donec pretium vulputate sapien nec sagittis aliquam malesuada. Vestibulum morbi blandit cursus risus. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Lorem sed risus ultricies tristique nulla aliquet enim tortor at. Nec sagittis aliquam malesuada bibendum arcu. Dui vivamus arcu felis bibendum ut tristique. Auctor eu augue ut lectus arcu bibendum at varius vel. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Accumsan in nisl nisi scelerisque eu ultrices. Amet dictum sit amet justo donec enim. Vitae justo eget magna fermentum iaculis eu. Nibh mauris cursus mattis molestie a.
        </p>
        <p className="bots_expand-text">
          Viverra aliquet eget sit amet tellus cras adipiscing enim. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Luctus venenatis lectus magna fringilla urna. Elementum sagittis vitae et leo duis ut diam quam nulla. Vivamus arcu felis bibendum ut tristique et egestas quis. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Ut faucibus pulvinar elementum integer. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Facilisis leo vel fringilla est ullamcorper eget nulla. Dui nunc mattis enim ut tellus elementum sagittis vitae et. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Quisque sagittis purus sit amet. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Odio ut sem nulla pharetra. At augue eget arcu dictum. Massa id neque aliquam vestibulum morbi blandit cursus risus. Blandit cursus risus at ultrices mi tempus. Fringilla urna porttitor rhoncus dolor purus non.
        </p>
        <h5 className="bots_expand-title">Lorem ipsum dolor</h5>
        <p className="bots_expand-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc. Egestas tellus rutrum tellus pellentesque. Mus mauris vitae ultricies leo integer malesuada nunc vel risus. Netus et malesuada fames ac turpis egestas maecenas pharetra. Id donec ultrices tincidunt arcu non sodales neque sodales. Praesent tristique magna sit amet. Donec pretium vulputate sapien nec sagittis aliquam malesuada. Vestibulum morbi blandit cursus risus. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Lorem sed risus ultricies tristique nulla aliquet enim tortor at. Nec sagittis aliquam malesuada bibendum arcu. Dui vivamus arcu felis bibendum ut tristique. Auctor eu augue ut lectus arcu bibendum at varius vel. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Accumsan in nisl nisi scelerisque eu ultrices. Amet dictum sit amet justo donec enim. Vitae justo eget magna fermentum iaculis eu. Nibh mauris cursus mattis molestie a.
          Viverra aliquet eget sit amet tellus cras adipiscing enim. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Luctus venenatis lectus magna fringilla urna. Elementum sagittis vitae et leo duis ut diam quam nulla. Vivamus arcu felis bibendum ut tristique et egestas quis. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Ut faucibus pulvinar elementum integer. Orci eu lobortis elementum nibh tellus molestie nunc non blandit. Facilisis leo vel fringilla est ullamcorper eget nulla. Dui nunc mattis enim ut tellus elementum sagittis vitae et. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Quisque sagittis purus sit amet. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Odio ut sem nulla pharetra. At augue eget arcu dictum. Massa id neque aliquam vestibulum morbi blandit cursus risus. Blandit cursus risus at ultrices mi tempus. Fringilla urna porttitor rhoncus dolor purus non.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default BlogsExpand;
