// src/widgets/zerotier/widget.js
import genericProxyHandler from "utils/proxy/handlers/generic";

/**
 * 需求要点：
 * - ZeroTier Central v1 的单成员查询：GET
 *   https://api.zerotier.com/api/v1/network/{networkId}/member/{nodeId}
 * - 鉴权头：Authorization: token {key}
 * - 使用 Homepage 的 mappings 白名单与 headers 传入鉴权
 */
export default {
  type: "zerotier",
  api: "https://api.zerotier.com/api/v1/network/{networkId}/{endpoint}",
  proxyHandler: genericProxyHandler,
  mappings: {
    // 组件里会通过 useWidgetAPI(widget, "member") 调用到这里
    member: {
      endpoint: "member/{nodeId}",
      // 直接在 headers 中放入 ZeroTier 要求的 token 头
      headers: {
        Authorization: "token {key}",
      },
      // 返回体关键字段存在即可渲染（精简校验）
      validate: ["id", "config", "lastSeen"],
    },
  },
};
