import { createConfiguration, ServerConfiguration } from "../../gen";

export const Config = createConfiguration({
  baseServer: new ServerConfiguration<{}>("https://10.0.2.102:9443", {}),
});