// src/widgets/zerotier/widget.js
import credentialedProxyHandler from "utils/proxy/handlers/credentialed";

export default {
  type: "zerotier",
  api: "https://api.zerotier.com/api/v1/network/{networkId}/{endpoint}",
  proxyHandler: credentialedProxyHandler,
  mappings: {
    member: {
      endpoint: "member/{nodeId}",
      headers: {
        Authorization: "token {key}",
      },
      validate: ["id", "config", "lastSeen"],
    },
  },
};
