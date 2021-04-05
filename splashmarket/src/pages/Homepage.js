
import HeaderHome from '../components/header/headerHome'
import HomepageSearch from '../components/homepage/main'
import HomepageLeaderboard from '../components/homepage/leaderboard'
import HomepageGraphs from '../components/homepage/graphs'
import HomepageBlogs from '../components/homepage/blogs'
import HomepageSocials from '../components/homepage/discord'
import Footer from '../components/footer/footer'

function Homepage() {
  return (
    <>
      <HeaderHome />
      <HomepageSearch />
      <HomepageLeaderboard />
      <HomepageGraphs />
      <HomepageBlogs />
      <HomepageSocials />
      <Footer />
    </>
  );
}

export default Homepage;
