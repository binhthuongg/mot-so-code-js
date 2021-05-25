import * as LOCAL_STORAGE from '../constants/LocalStorage';
import { isClientSide } from './utils';

const shaka = isClientSide ? require('shaka-player') : null;

// Q.net - DRMToday HTML5 sample

function setWidevineDataResponse(response) {
    const wrappedArray = new Uint8Array(response.data);

    // Convert it to a string.
    const wrappedString = String.fromCharCode.apply(null, wrappedArray);

    // Parse the JSON string into an object.
    let wrapped;
    try {
        wrapped = JSON.parse(wrappedString);
    } catch (err) {
        throw new Error(`Error while parsing JSON: ${err}`);
    }

    // This is a base64-encoded version of the raw license.
    const rawLicenseBase64 = wrapped.license;

    // Decode it to a string.
    const rawLicenseString = atob(rawLicenseBase64);

    // Convert that string into a Uint8Array and replace the response data to
    // feed it to the Widevine CDM.
    response.data = new Uint8Array(rawLicenseString.length);
    for (let i = 0; i < rawLicenseString.length; i += 1) {
        response.data[i] = rawLicenseString.charCodeAt(i);
    }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function setupDRMToday(player) {
    const userId = isClientSide
        ? localStorage.getItem(LOCAL_STORAGE.USER_ID)
        : '';
    const sessionId = isClientSide
        ? localStorage.getItem(LOCAL_STORAGE.SESSION_ID)
        : '';
    const merchant = isClientSide
        ? localStorage.getItem(LOCAL_STORAGE.MERCHANT)
        : '';
    player.configure({
        drm: {
            servers: {
                'com.widevine.alpha':
                    'https://lic.drmtoday.com/license-proxy-widevine/cenc/',
                'com.microsoft.playready':
                    'https://lic.drmtoday.com/license-proxy-headerauth/drmtoday/RightsManager.asmx',
            },
            advanced: {
                'com.microsoft.playready': {
                    videoRobustness: 'SW_SECURE_DECODE',
                    audioRobustness: 'SW_SECURE_CRYPTO',
                },
            },
        },
    });

    const net = player.getNetworkingEngine();
    const requestTypes = shaka.net.NetworkingEngine.RequestType;

    // Setting up the License Request
    net.registerRequestFilter((type, request) => {
        if (type === requestTypes.LICENSE) {
            let drmTodayData = {
                userId,
                sessionId,
                merchant,

                // userId: '4-01234567893',
                // sessionId:
                //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0LTAxMjM0NTY3ODkzIiwic2Vzc2lvbklkIjoic3N0dl9wcm9kdWN0aW9uIiwidGltZXN0YW1wIjoiMTYxMjI1OTUyOCIsImV4cCI6MTYxMjM0NTkyOCwibmJmIjoxNjEyMjU5MjI4LCJpYXQiOjE2MTIyNTk1Mjh9.-txegGZxurJs_MA1JTeEpM5HYsv5Grd44Km9Np7O1v8',
                // merchant: 'qnet',
                // userId: '4-01234567893',
                // sessionId:
                //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0LTAxMjM0NTY3ODkzIiwic2Vzc2lvbklkIjoic3N0dl9wcm9kdWN0aW9uIiwidGltZXN0YW1wIjoiMTYxMjM0NzY0MCIsImV4cCI6MTYxMjQzNDA0MCwibmJmIjoxNjEyMzQ3MzQwLCJpYXQiOjE2MTIzNDc2NDB9.nn-ykjRSgZVdaQYYT0cFXwG6Yb3UNv9LVkNqTkBJrZA',
                // merchant: 'qnet',

                // userId: '4-01234567893',
                // sessionId:
                //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0LTAxMjM0NTY3ODkzIiwic2Vzc2lvbklkIjoic3N0dl9wcm9kdWN0aW9uIiwidGltZXN0YW1wIjoiMTYxMjQ4OTI3OSIsImV4cCI6MTYxMjU3NTY3OSwibmJmIjoxNjEyNDg4OTc5LCJpYXQiOjE2MTI0ODkyNzl9.GzQAnllOClNrI-HTdKHwH3KDcUvM5-8V7COrRLDdMXM',
                // merchant: 'qnet',
            };

            drmTodayData = btoa(JSON.stringify(drmTodayData));
            request.headers['dt-custom-data'] = drmTodayData;
        }
    });

    // Setting up the license response
    net.registerResponseFilter((type, response) => {
        if (type === requestTypes.LICENSE) {
            const keySystem = player.keySystem();
            if (keySystem === 'com.widevine.alpha') {
                setWidevineDataResponse(response);
            }
        }
    });
}
