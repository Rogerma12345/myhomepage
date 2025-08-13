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
        Authorization: "token {key}",              // ZeroTier要求
        "User-Agent": "Homepage/1.0 (+gethomepage.dev)", // 避免WAF因UA缺失而403
        Accept: "application/json",                // 期望JSON
      },
      // 包含 name / config.ipAssignments / lastSeen
      validate: ["name", "config", "lastSeen"],
    },
  },
};
