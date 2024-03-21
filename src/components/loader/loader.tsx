import Lottie from 'lottie-react';

import animationLoader from './animation.json';

const Loader = () => (
        <Lottie
            animationData={animationLoader}
            loop={true}
            data-test-id='loader'
            className='loader'
        />
    );

export default Loader;
