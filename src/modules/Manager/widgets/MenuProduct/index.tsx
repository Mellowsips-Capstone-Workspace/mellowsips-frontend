import { FC } from 'react';

const MenuProduct: FC = () => {
    function sendMessageToParent() {
        // Send a message to the parent window
        window.opener.postMessage({ name: 'Hello from child' }, window.origin);
    }

    // Example of sending a message after some interaction or event


    return (
        <div onClick={sendMessageToParent}>MenuProduct jjs</div>
    )
}

export default MenuProduct