import {
  ArrowBendUpLeft, ArrowsClockwise, Brain, Camera, ChartLineUp, ChatCircleDots, CheckCircle, Clock, FileDoc,
  FileText, Funnel, Gear, Handshake, Heart, PaperPlaneTilt, PencilSimpleLine, Plug, QrCode, Robot, Ruler, Scan,
  SealCheck, ShoppingCart, UserFocus,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { Icone as Nome } from "@/content/site";

const MAPA: Record<Nome, Icon> = {
  chat: ChatCircleDots, brain: Brain, funnel: Funnel, user: UserFocus, handshake: Handshake, file: FileText,
  clock: Clock, pen: PencilSimpleLine, reply: ArrowBendUpLeft, check: CheckCircle, heart: Heart, pix: QrCode,
  repeat: ArrowsClockwise, camera: Camera, scan: Scan, doc: FileDoc, seal: SealCheck, send: PaperPlaneTilt,
  cart: ShoppingCart, chart: ChartLineUp, plug: Plug, robot: Robot, ruler: Ruler, gear: Gear,
};

export function Icone({ nome, size = 22, className }: { nome: Nome; size?: number; className?: string }) {
  const C = MAPA[nome];
  return <C size={size} weight="duotone" className={className} aria-hidden />;
}
