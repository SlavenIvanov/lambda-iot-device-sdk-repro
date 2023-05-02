import { iot, mqtt5 } from "aws-iot-device-sdk-v2";
import { once } from "events";

export const handler = async (event) => {
  const cfg = {
    endpoint: "<AWS_IOT_ENDPOINT>",
    key: "<IOT_THING.key>",
    cert: "<IOT_THING.pem.crt>",
  };

  const builder =
    iot.AwsIotMqtt5ClientConfigBuilder.newDirectMqttBuilderWithMtlsFromPath(
      cfg.endpoint,
      cfg.cert,
      cfg.key
    );
  const config = builder.build();

  const client = new mqtt5.Mqtt5Client(config);

  const connectionSuccess = once(client, "connectionSuccess");
  client.start();
  await connectionSuccess;
  console.log("🟢Connected to AWS IoT");

  const stopped = once(client, "stopped");
  client.stop();
  await stopped;
  console.log("Stopped client");

  client.close();
  console.log("Closed client");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success!" }),
  };
};
