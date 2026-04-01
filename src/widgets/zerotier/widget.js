// src/widgets/zerotier/widget.js
import genericProxyHandler from "utils/proxy/handlers/generic";

export default {
  type: "zerotier",
  api: "https://api.zerotier.com/api/v1/network/{networkId}/{endpoint}",
  proxyHandler: genericProxyHandler,
  mappings: {
    member: {
      endpoint: "member/{nodeId}",
      // 包含 name / config.ipAssignments / lastSeen
      validate: ["name", "config", "lastSeen"],
    },
  },
};
