import {Logger} from '@monolithed/logger';

import {
    useEffect,
    useState
} from 'react';

import {Actions} from './actions';

type Result = {
    script: HTMLScriptElement;
    loaded: boolean;
    failed: boolean;
    verbose?: boolean;
};

type Options = {
    verbose?: boolean;
};

const defaultAttributes = {
    async: true
};

const defaultOptions = {
    verbose: false
};

const SERVICE_NAME = 'LazyService::useScript';
const TAG_NAME = 'script';

const useScript = (props: Partial<HTMLScriptElement>, {verbose}: Options = defaultOptions): Result => {
    const {src} = props;
    const script: HTMLScriptElement = document.createElement(TAG_NAME);

    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const logger = new Logger({
            title: SERVICE_NAME,
            silent: !verbose
        });

        if (!src) {
            setFailed(true);
            logger.error(Actions.EMPTY);

            return;
        }

        logger.info(src, Actions.STARTED);

        Object.assign(script, defaultAttributes, props);

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
export type {Options};
