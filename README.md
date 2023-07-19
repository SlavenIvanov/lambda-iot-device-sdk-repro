# Reproduction repository for [MQTT5 in Lambda, multi-initialization issue](https://github.com/aws/aws-iot-device-sdk-js-v2/discussions/360)

## Setup Instructions:

1. Create an AWS iot thing and download the private key and certificate into the project's root directory
2. Add a test policy to the iot thing that allows all actions
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "iot:Connect",
        "iot:Publish",
        "iot:Subscribe",
        "iot:Receive"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    }
  ]
}
```
2. Take note of the AWS IoT endpoint in the Settings tab of the AWS IoT console
2. Open `IotFunction.ts` and replace values of **cfg** with your own
```js
const cfg = {
  endpoint: "<AWS_IOT_ENDPOINT>",
  key: "<IOT_THING.key>",
  cert: "<IOT_THING.pem.crt>",
};
  ```
3. `npm install`
4. `npm run start`
5. Open http://localhost:3001/dev/iot in your browser


## Expected Behavior
The first time you open the page the MQTT client should connect and then disconnect.

The second time around it should throw the following error:git s
```js
Error: Aws-crt-nodejs does not yet support multi-initialization.
    at Object.Module._extensions..node (node:internal/modules/cjs/loader:1189:18)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (.../lambda-iot-device-sdk/node_modules/aws-crt/dist/native/binding.js:59:19)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
Signal received: 6, errno: 0

```
