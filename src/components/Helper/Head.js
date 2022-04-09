import React from 'react';

const Head = ( props ) => {

    React.useEffect(() => {
        document.title = 'Dogin | ' + props.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', props.description || '');
    }, [props]);

    return null;
};

export default Head;
