import {useEffect, useState} from 'react';
import {Logger} from '@monolithed/logger';
import {Actions} from './actions';

type Result = {
    script: HTMLScriptElement;
    loaded: boolean;
    failed: boolean;
};

const logger = new Logger({
    title: 'LazyService::useDynamicScript'
});

const defaultProps = {
    async: true
};

const useScript = (props: Partial<HTMLScriptElement>): Result => {
    const {src} = props;
    const script: HTMLScriptElement = document.createElement('script');

    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (!src) {
            setFailed(true);
            logger.error(Actions.EMPTY);

            return;
        }

        logger.info(src, Actions.STARTED);

        Object.assign(script, {
            ...defaultProps,
            ...props
        });

        script.addEventListener('load', () => {
            setLoaded(true);
            logger.info(src, Actions.LOADED);
        });

        script.addEventListener('error', () => {
            setLoaded(false);
            setFailed(true);

            logger.error(src, Actions.FAILED);
        });

        document.head.append(script);

        return (): void => {
            script.remove();
            logger.info(src, Actions.REMOVED);
        };
    }, [src]);

    return {loaded, failed, script};
};

export {useScript};
