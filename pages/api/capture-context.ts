import cybersourceRestApi from "cybersource-rest-client";
import { NextApiResponse } from "next";

const configObj = {
  authenticationType: "http_signature",
  runEnvironment: "cybersource.environment.SANDBOX",
  merchantID: "testrest",
  merchantKeyId: "08c94330-f618-42a3-b09d-e1e43be5efda",
  merchantsecretKey: "yBJxy6LjM2TmcPGu+GaJrHtkke25fPpUX+UY6/L/1tE=",
  keyAlias: "testrest",
  keyPass: "testrest",
  keyFileName: "testrest",
  keysDirectory: "Resource",
  enableLog: true,
  logFilename: "cybs",
  logDirectory: "../log",
  logFileMaxSize: 5242880,
};

export default async function handler(_: undefined, res: NextApiResponse) {
  const instance = new cybersourceRestApi.KeyGenerationApi(configObj);
  const request = new cybersourceRestApi.GeneratePublicKeyRequest();
  request.encryptionType = "RsaOaep256";
  request.targetOrigin = "https://cybersource-demo-react.vercel.app";
  const opts: any = [];
  opts["format"] = "JWT";

  instance.generatePublicKey(
    request,
    opts,
    function (error: any, data: { keyId: string }) {
      if (error) {
        res.status(200).json("An error occured");
      } else if (data) {
        res.status(200).json(data.keyId);
      }
    }
  );
}
