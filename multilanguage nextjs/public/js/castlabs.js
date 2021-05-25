 
//Q.net - DRMToday HTML5 sample
function getWidevineCert() {
  var message = new Uint8Array(2);
  // in order our drm server to redirect this to google we need to send empty 2 bytes with values 8 and 4
  message[0] = 8;
  message[1] = 4;

  var request = new XMLHttpRequest();
  request.open('POST', 'https://lic.staging.drmtoday.com/license-proxy-widevine/cenc/');
  request.responseType = 'arraybuffer';

  var drmTodayData = {
      userId: '4-0977189760',
      sessionId: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0LTA5NzcxODk3NjAiLCJzZXNzaW9uSWQiOiJzc3R2X3Byb2R1Y3Rpb24iLCJ0aW1lc3RhbXAiOiIxNjEwNDMzOTc0IiwiZXhwIjoxNjEwNTIwMzc0LCJuYmYiOjE2MTA0MzM2NzQsImlhdCI6MTYxMDQzMzk3NH0.PbfLP9KNEqqbl2LuNEmVvvrdgT2Uu4yuQrbvhY1fBuY',
      merchant: 'qnet'
  };

  drmTodayData = btoa(JSON.stringify(drmTodayData));

  request.setRequestHeader('dt-custom-data', drmtodayData);

  request.addEventListener('error', function (ev) {
    console.log('error', err);
  });

  request.addEventListener('load', function (ev) {
    console.log('data', ev);
  });

  request.send(message);
}

var video;
var player;
var vjsPlayer;
//var manifestUrl = 'https://cdn.live.sunshinetv.vn/live_vega/smil:hbo.smil/manifest.mpd';
//var manifestUrl = 'http://cdn.video.streaming.sunshinetv.vn/live_vega/smil:tlc.smil/playlist.m3u8';
var manifestUrl = 'https://cdn.vod.sunshinetv.vn/storage01/hbo/game_of_thrones_s1_02_the_kingsroad/dash/master.mpd';
//var manifestUrl = 'https://cdn.vod.sunshinetv.vn/storage02/hbo/homeless_the_motel_kids_of_orange_county/dash/master.mpd';

function setWidevineDataResponse(response) {
  var wrappedArray = new Uint8Array(response.data);

  // Convert it to a string.
  var wrappedString = String.fromCharCode.apply(null, wrappedArray);

  // Parse the JSON string into an object.
  var wrapped;
  try {
    wrapped = JSON.parse(wrappedString);
  } catch (err) {
    throw new Error('Error while parsing JSON: ' + err);
  }

  // This is a base64-encoded version of the raw license.
  var rawLicenseBase64 = wrapped['license'];

  // Decode it to a string.
  var rawLicenseString = atob(rawLicenseBase64);

  // Convert that string into a Uint8Array and replace the response data to
  // feed it to the Widevine CDM.
  response.data = new Uint8Array(rawLicenseString.length);
  for (var i = 0; i < rawLicenseString.length; ++i) {
    response.data[i] = rawLicenseString.charCodeAt(i);
  }

  console.log(response.data);
}

function setupDRMToday() {
 // getWidevineCert();
  var cert = '10,191,2,8,3,18,16,40,112,52,84,192,8,246,54,24,173,231,68,61,182,196,200,24,139,231,249,144,5,34,142,2,48,130,1,10,2,130,1,1,0,181,33,18,184,208,93,2,63,204,93,149,226,194,81,193,198,73,180,23,124,216,210,190,239,53,91,176,103,67,222,102,30,61,42,188,49,130,183,153,70,213,95,220,8,223,233,84,7,129,94,154,98,116,179,34,162,199,245,224,103,187,95,10,192,122,137,212,90,234,148,178,81,111,7,91,102,239,129,29,13,38,225,185,166,184,148,242,185,133,121,98,170,23,28,79,102,99,13,62,76,96,39,24,137,127,94,30,249,182,170,245,173,77,186,42,126,20,23,109,241,52,161,211,24,91,90,33,138,192,90,76,65,240,129,239,255,128,163,160,64,197,11,9,187,199,64,238,220,216,241,77,103,90,145,152,15,146,202,125,220,100,106,6,173,173,81,1,247,74,14,73,140,192,31,0,83,43,172,33,120,80,189,144,94,144,146,54,86,183,223,239,239,66,72,103,103,243,62,246,40,61,79,66,84,171,114,88,147,144,190,229,88,8,241,214,104,8,13,69,216,147,194,188,162,247,77,96,160,192,208,160,153,60,239,1,96,71,3,51,76,54,56,19,148,134,188,157,175,36,253,103,160,127,154,217,67,2,3,1,0,1,58,18,115,116,97,103,105,110,103,46,103,111,111,103,108,101,46,99,111,109,18,128,3,152,62,48,53,38,117,244,11,167,21,252,36,155,218,229,212,172,114,73,162,102,101,33,228,54,85,115,149,41,114,31,248,128,224,170,239,197,226,123,201,128,218,234,218,191,63,195,134,208,132,160,44,130,83,120,72,204,117,63,244,151,176,17,167,218,151,120,138,0,226,170,107,132,205,125,113,192,122,72,235,246,22,2,204,165,163,243,32,48,167,41,92,48,218,145,91,145,220,24,185,188,149,147,184,222,139,181,15,13,237,193,41,56,184,233,224,57,205,222,24,250,130,232,27,176,50,99,15,233,85,216,90,86,108,225,84,48,11,246,212,193,189,18,105,102,53,107,40,125,101,123,24,206,99,208,239,212,95,197,38,158,151,234,177,28,181,99,229,86,67,178,111,244,159,16,156,33,1,175,202,243,91,131,47,40,143,13,157,69,150,14,37,158,133,251,93,36,219,210,207,130,118,76,93,217,191,114,126,251,233,200,97,248,105,50,31,106,222,24,144,95,77,146,249,166,218,101,54,219,132,117,135,29,22,142,135,11,178,48,60,247,12,110,151,132,201,61,45,232,69,173,130,98,190,126,13,78,46,74,7,89,206,248,45,16,157,37,146,199,36,41,248,192,23,66,186,226,179,222,202,219,195,60,62,95,75,175,94,22,236,183,78,173,186,252,183,198,112,95,122,158,59,111,57,64,56,63,156,81,22,210,2,162,12,146,41,238,150,156,37,25,113,131,3,181,13,1,48,195,53,46,6,176,20,216,56,84,15,138,12,34,124,0,17,224,245,179,142,78,41,142,210,203,48,30,180,86,73,101,245,92,93,121,117,122,37,10,78,185,200,74,179,230,83,159,107,111,223,86,137,158,162,153,20';
  player.configure({
    drm: {
      servers: {
        'com.widevine.alpha': 'https://lic.drmtoday.com/license-proxy-widevine/cenc/',
        'com.microsoft.playready': 'https://lic.drmtoday.com/license-proxy-headerauth/drmtoday/RightsManager.asmx'
      },
      advanced: {
        'com.microsoft.playready': {
          'videoRobustness': 'SW_SECURE_DECODE',
          'audioRobustness': 'SW_SECURE_CRYPTO'
          //,
       //   'serverCertificate': new Uint8Array(cert.split(','))
       }
      }
    }
  });

  var net = player.getNetworkingEngine();
  var requestTypes = shaka.net.NetworkingEngine.RequestType;

  // Setting up the License Request
  net.registerRequestFilter(function (type, request) {
    if (type === requestTypes.LICENSE) {
         var drmTodayData = {
          "userId": "4-0977189760",
          "sessionId": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0LTA5NzcxODk3NjAiLCJzZXNzaW9uSWQiOiJzc3R2X3Byb2R1Y3Rpb24iLCJ0aW1lc3RhbXAiOiIxNjExMDQyNDQ2IiwiZXhwIjoxNjExMTI4ODQ2LCJuYmYiOjE2MTEwNDIxNDYsImlhdCI6MTYxMTA0MjQ0Nn0.hqTVeWnOVWS6Xr_IEM0LY7KNTvKVFIIsItcMrf9lcm8",
          "merchant": "qnet"
        };

      drmTodayData = btoa(JSON.stringify(drmTodayData));
      request.headers['dt-custom-data'] = drmTodayData;

      console.log(JSON.stringify(request));
    }
  });

  // Setting up the license response
  net.registerResponseFilter(function (type, response) {
    if (type === requestTypes.LICENSE) {
      var keySystem = player.keySystem();
      if (keySystem === 'com.widevine.alpha') {
        setWidevineDataResponse(response);
      }

      // For Playready the data returned by DRMToday doesn't need handling and
      // can be sent directly to the CDM.
    }
  });

}
function playStream2(url, time) {
  player.unload().then(function() {
    return player.load(url).then(function() {
							//const end = player.seekRange().end;
							//if (startTime < end) {
								time = document.getElementById("time").value;
								player.getMediaElement().currentTime = time;
							});
  }).then(function () {
    console.log('Playing stream');
  }).catch(onError);
}

function playStream(url) {
  player.unload().then(function() {
    return player.load(url);
  }).then(function () {
    console.log('Playing stream');
  }).catch(onError);
}

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer(manifestUrl);
    playStream(manifestUrl);
    // loadAppEvents();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

function initPlayer(manifestUrl) {
  // Create a Player instance.
  vjsPlayer = videojs('#vid');

  // small workaround to prevent error on VideoJS
  var _src = vjsPlayer.src;
  vjsPlayer.src = function (value) {
    if (value !== undefined) {
      _src.call(vjsPlayer, value);
    } else {
      return manifestUrl;
    }
  };

  // vjsPlayer.src(manifestUrl);

  
  // video = document.getElementById('vid');
  video = vjsPlayer.el_.querySelector('video');
  player = new shaka.Player(video);


  setupDRMToday();

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

document.addEventListener('DOMContentLoaded', initApp);
