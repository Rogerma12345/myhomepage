import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "next-i18next";

import useWidgetAPI from "utils/proxy/use-widget-api";

function formatOpenWrtUptime(uptime, t) {
  const totalSeconds = Math.max(0, Math.floor(Number(uptime) || 0));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [];

  if (days > 0) parts.push(`${days}${t("openwrt.day")}`);
  if (hours > 0) parts.push(`${hours}${t("openwrt.hour")}`);
  if (minutes > 0) parts.push(`${minutes}${t("openwrt.minute")}`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}${t("openwrt.second")}`);

  return parts.join("");
}

export default function Component({ service }) {
  const { t } = useTranslation();
  const { data, error } = useWidgetAPI(service.widget);

  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!data) {
    return null;
  }

  const { uptime, cpuLoad } = data;

  return (
    <Container service={service}>
      <Block label="openwrt.uptime" value={formatOpenWrtUptime(uptime, t)} />
      <Block label="openwrt.cpuLoad" value={cpuLoad} />
    </Container>
  );
}
