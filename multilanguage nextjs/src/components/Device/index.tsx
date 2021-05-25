import React, { ReactNode } from 'react';

interface DeviceProps {
    children: () => ReactNode;
}

/**
 * props.children là 1 function, trả về component, dùng dynamic import component, ssr: false (không render ở server side)
 * https://stackoverflow.com/questions/59494037/how-to-detect-the-device-on-react-ssr-app-with-next-js
 */
function Device(props: DeviceProps): React.ReactElement {
    return <>{props.children()}</>;
}

export default Device;
