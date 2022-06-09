import React from 'react';
import jm_97 from '../images/Joe-and-Marcia-in-Moscow-subway(1997).jpg';
import jm_83 from '../images/Joe-and-Maria-in-disguise-inside-Afghanistan-(1983).jpg';
import jm_83_2 from '../images/Joe-and-Marcia-on-the-way-across-the-Afghan-border-into-Pakistan-(1983).jpg';
import MetaTags from 'react-meta-tags'

const About = (props) => (
    <div className="container about-us">
        <MetaTags>
            <title>What is PRINT? | the lifework of journalists Joe Albright and Marcia Kunstel | tworeporters.com</title>
            <meta name="description" content="PRINT is the lifework of award-winning Cox Newspapers journalists Marcia Kunstel and Joe Albright spanning from 1958-2000 and chronicling the major news events at that define our world today." />
        </MetaTags>
        <h2 className="page-title">What is PRINT?</h2>
        <div className="about-us-container text-justify">
            <p className="clearfix"><img className="inline-image d-block float-md-right img-thumbnail" src={jm_83} alt="Joe and Maria in disguise inside Afghanistan (1983)" />You’ve opened a collection of newspaper articles by Joe Albright and Marcia Kunstel, written back in the days when newspapers were flush with the motivation – and the revenue -- to tell the story like it was, wherever it was. And readers were hungry to know news. It covers the years 1958 to 2000, spanning two careers that started miles apart and ended up merged in some of Earth’s most beautiful, most deadly and most consequential locations.</p>
            <p className="clearfix"><img className="inline-image d-block float-md-left img-thumbnail" src={jm_83_2} alt="Joe and Marcia on the way across the Afghan border into Pakistan (1983)." />The roughly 3,000 articles track the beginning of Joe’s cub reporter days in Chicago and Marcia’s in Hartford, through our work gaining experience at newspapers around the country, till we connected and set out abroad together in 1983. As foreign correspondents we traveled from Afghanistan to Zimbabwe, covering stories of people’s tragedies, triumphs and simple – or not so simple -- existence. We thank the Cox Newspapers for supporting this odyssey.</p>
            <p className="clearfix"><img className="inline-image d-block float-md-right img-thumbnail" src={jm_97} alt="Joe and Marcia in Moscow subway(1997)" />When we retired in 2000, we left journalism behind. But we thought about it. Eventually we started poking around boxes of wrinkled old articles, piecing together what we had salvaged from our days in the world of print.  A lot was missing. An on-line data base called <a href="https://newspapers.com" target="_blank" rel="noreferrer">newspapers.com</a> filled many holes, and we found a program called <a href="https://mymemories.com" target="_blank" rel="noreferrer">mymemories.com</a> to convert articles into scrapbooks. With limits of about 100 pages per scrapbook, we ended up with 36 volumes. Our careers are once again in “Print,” as we titled the collection of scrapbooks.</p>
            <p className="h2 text-center p-3">This is PRINT, digitally.</p>
        </div>
    </div>
);

export default About;