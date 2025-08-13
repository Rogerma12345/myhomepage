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
 *   headers:
 *     Authorization: "token 111111"
 *     Accept:        "application/json"
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
        <Block label="zerotier.name" />
        <Block label="zerotier.ip_assignments" />
        <Block label="zerotier.last_seen" />
      </Container>
    );
  }

  const name =
    typeof data?.name === "string" && data.name.trim() ? data.name : "-";

  const ips = Array.isArray(data?.config?.ipAssignments)
    ? data.config.ipAssignments.join(", ")
    : "-";

  const lastSeen =
    typeof data?.lastSeen === "number" ? new Date(data.lastSeen) : null;

  return (
    <Container service={service}>
      <Block label="zerotier.name" value={name} />
      <Block label="zerotier.ip_assignments" value={ips} />
      <Block
        label="zerotier.last_seen"
        value={lastSeen ? lastSeen.toLocaleString() : "-"}
      />
    </Container>
  );
}
