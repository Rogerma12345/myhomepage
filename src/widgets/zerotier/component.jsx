// src/widgets/zerotier/component.jsx
import Container from "components/services/widget/container";
import Block from "components/services/widget/block";

import useWidgetAPI from "utils/proxy/use-widget-api";

/**
 * 期望输入（services.yaml 中）：
 * widget:
 *   type: zerotier
 *   networkId: "8056c2e21c000001"
 *   nodeId:    "abcdef01234"
 *   key:       "your-zt-api-token"
 */
export default function Component({ service }) {
  const { widget } = service;

  // 对应 widget.js 中 mappings.member
  const { data, error } = useWidgetAPI(widget, "member");

  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!data) {
    return (
      <Container service={service}>
        <Block label="zerotier.ip_assignments" />
        <Block label="zerotier.last_seen" />
        <Block label="zerotier.authorized" />
      </Container>
    );
  }

  const ips = Array.isArray(data?.config?.ipAssignments)
    ? data.config.ipAssignments.join(", ")
    : "-";
  const lastSeen =
    typeof data?.lastSeen === "number" ? new Date(data.lastSeen) : null;
  const authorized =
    typeof data?.config?.authorized === "boolean"
      ? String(data.config.authorized)
      : "-";

  return (
    <Container service={service}>
      <Block label="zerotier.ip_assignments" value={ips} />
      <Block
        label="zerotier.last_seen"
        value={lastSeen ? lastSeen.toLocaleString() : "-"}
      />
      <Block label="zerotier.authorized" value={authorized} />
    </Container>
  );
}
