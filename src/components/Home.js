import React from 'react';
import styled from 'styled-components';
import Feed from './Feed/Feed';
import Head from './Helper/Head';

const SectionHome = styled.section``;

const Home = () => {
    return (
        <SectionHome className="container mainContainer">
            <Head  title="Fotos" description="Home do site Dogs." />
           <Feed /> 
        </SectionHome>
    );
};

export default Home;
