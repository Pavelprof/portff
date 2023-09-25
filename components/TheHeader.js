import { Navigation } from "./Navigation"

const userName = 'UserNameMe' //todo: develop getting username


const TheHeader = () => {
    return (
        <header>
            <Navigation userName = {userName} />
        </header>
    );
};

export { TheHeader };