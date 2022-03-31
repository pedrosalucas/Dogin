import React from 'react';
import styled, { keyframes } from 'styled-components';

const skeleton = keyframes`
    from {
        background-position: 0;
    }
    
    to {
        background-position: -200%;
    }
`;

const WrapperImg = styled.div`
    display: grid;

    img {
        display: block;
        max-width: 100%;
        grid-area: 1/1;
        opacity: 0;
        transition: .2s;
    }

    .skeleton {
        grid-area: 1/1;
        height: 100%;
        background-image: linear-gradient(90deg, #eee 0, #fff 50%, #eee 100%);
        background-color: #eee;
        background-size: 200%;
        animation: ${skeleton} 1.5s infinite linear;
    }
`;

const Image = ({ classWrapper, src, alt, ...props}) => {
    const [skeleton, setSkeleton] = React.useState(true);

    function handleLoad({ target }) {
        setSkeleton(false);
        target.style.opacity = 1;
    }

    return (
        <WrapperImg className={classWrapper}>
            {skeleton &&
                <div className="skeleton"></div>
            }
            <img onLoad={handleLoad} src={src} alt={alt} {...props} />
        </WrapperImg>
    );
};

export default Image;
