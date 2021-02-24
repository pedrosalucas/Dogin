import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PhotoComments from './PhotoComments';
import VisualizacoesBlackSvg from '../../Assets/visualizacao-black.svg';

const scaleUp = keyframes`
    to {
            opacity: initial;
            transform: initial;
        }
`;

const DivContent = styled.div`
    margin: auto;
    height: 36rem;
    border-radius: .2rem;
    background-color: #fff;
    display: grid;
    grid-template-columns: 36rem 20rem;
    grid-template-rows: auto 1fr auto;
    overflow: hidden;
    opacity: 0;
    transform: scale(.8);
    animation: ${scaleUp} .3s forwards;

    .detalhes{
        padding: 2rem 2rem 0 2rem;
    }

    .img {
        grid-row: 1/4;
    }

    .autor {
        opacity: .5;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .autor a:hover {
        text-decoration: underline;
    }

    .visualizacoes:before {
        content: '';
        display: inline-block;
        width: 16px;
        height: 10px;
        margin-right: .5rem;
        background: url(${VisualizacoesBlackSvg});
    }

    .atributos {
        display: flex;
        font-size: 1.125rem;
        font-weight: bold;
        margin: 1rem 0 2rem;
    }

    .atributos li {
        margin-right: 2rem;
    }

    .atributos li:before {
        content: '';
        display: inline-block;
        height: 20px;
        margin-top: 5px;
        margin-right: .5rem;
        position: relative;
        top: 3px;
        width: 2px;
        background-color: #333;
    }

    @media (max-width: 64rem) {
        height: auto;
        max-height: calc(100vh - 4rem);
        overflow-y: auto;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 40rem));

        .img {
            grid-row: 1;
        }
    }
`;

const PhotoContent = ({ data }) => {
    const { photo, comments } = data;

    return (
        <DivContent>
            <div className="img">
                <img src={photo.src} alt={photo.title} />
            </div>
            <div className="detalhes">
                <div>
                    <div>
                        <p className="autor">
                            <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
                            <span className="visualizacoes">{photo.acessos}</span>
                        </p>
                        <h1 className="title">
                            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
                        </h1>
                        <ul className="atributos">
                            <li>{photo.peso} kg</li>
                            <li>{photo.idade} anos</li>
                        </ul>
                    </div>
                </div>
            </div>
            <PhotoComments id={photo.id} comments={comments} />
        </DivContent>
    );
};

export default PhotoContent;
