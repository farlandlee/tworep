import React from 'react'
import { Container } from 'reactstrap'
import {Link} from 'react-router-dom'
import {
    Row,
    Col,
    Button
} from 'reactstrap'
import cover from '../images/cover.jpg'
import MetaTags from 'react-meta-tags'

const Home = () => (
    <div className="background-container">
        <MetaTags>
            <title>PRINT | newspaper article archive by Joe Albright and Marcia Kunstel | tworeporters.com</title>
            <meta name="description" content="This is an archive of newspaper articles by Joe Albright and Marcia Kunstel spanning over 4 decades from 1958 to 2000." />
            <meta name="keywords" content="Marcia Kunstel, Joe Albright, Joseph Albright, Nixon, Kennedy,Johnson, Reagan, Ford, Bush, Carter, Clinton, Wallace, Nunn, Chicago,Hartford, Savannah River, Nuclear, Chad, Libya, Egypt, Jordan, Israel,Lebanon, Beirut, Saudi Arabia, Iraq, Kuwait, Desert Shield, Desert Storm,Mandela, South Africa, apartheid, Berlin wall, Greenham Common, TheodoreHall, Ted Hall, Los Alamos, Morris Cohen, Lona Cohen, Bombshell, nuclearspy, Three Mile Island, China, Moscow, Yeltsin, Siberian Tiger, Norilsk,Ceaucescu, Atlanta, Georgia, Montgomery, Alabama, Robert Vance, MorrisDees, Judge Frank Johnson, Richard Shelby, Maynard Jackson, John Lewis,Reidsville, Oppenheimer, Teller, atomic bomb, Klerk, Zemin, CorazonAquino, Ferdinand Marcos"/>
        </MetaTags>
        <Container className="home-container">
            <div className="home-intro">
                <h2>You've Opened PRINT</h2>
                <img src={cover} alt="Joe & Marcia in Kuwait City" />
                <p className="lead">This is an archive of articles by Joe Albright and Marcia Kunstel written back in the days when newspapers were flush with the motivation-- and the revenue -- to tell the story, wherever it was and however long it took to dig it out. They reported from 20 U.S. states and 40 countries, covering everything from the deadliest school fire in Chicago history to the release of Nelson Mandela to half a dozen armed conflicts.</p>
                <Row className="justify-content-md-around home-button-links">
                    <Col xs md="auto"><Button tag={Link} to="/search" size="lg" >Search by name and date</Button></Col>
                    <Col xs md="auto"><Button tag={Link} to="/volumes" size="lg" >Choose a Volume of Clippings</Button></Col>
                </Row>
            </div>
        </Container>
    </div>
)

export default Home