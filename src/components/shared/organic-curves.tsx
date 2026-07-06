import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CurveVariant =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "full-sweep"
  | "horizontal"
  | "diagonal-dark";

/* ————————————————————————————————————————————————————————————
   Caminhos SVG orgânicos — viewBox 0 0 1200 800
   Cada variante tem 3 curvas com opacidade decrescente
   para criar profundidade e sensação de traço à mão.
   ———————————————————————————————————————————————————————————— */
const PATHS: Record<CurveVariant, ReactNode> = {
  /* Flui do topo-direito para baixo — usa no hero e no FAQ */
  "top-right": (
    <>
      <path
        d="M 680 -150 C 820 40 700 260 920 440 C 1080 570 1060 730 1250 950"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 820 -180 C 950 20 830 240 1000 420 C 1140 540 1120 700 1310 920"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 560 -100 C 710 90 590 320 820 500 C 1000 640 980 800 1180 1020"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </>
  ),

  /* Flui do topo-esquerdo para baixo — usa na Sobre e Processo */
  "top-left": (
    <>
      <path
        d="M -80 -100 C 80 80 -60 310 180 480 C 360 610 300 770 80 970"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M -200 -60 C -30 130 -160 350 80 520 C 250 640 200 800 -20 1000"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 60 -130 C 220 50 60 280 260 450 C 430 580 380 740 160 940"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </>
  ),

  /* Sobe do canto inferior-direito — usa em seções pares */
  "bottom-right": (
    <>
      <path
        d="M 1280 920 C 1100 720 1280 490 980 310 C 800 180 840 20 1050 -160"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 1400 960 C 1220 760 1400 530 1100 350 C 920 220 960 60 1170 -120"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 1160 880 C 980 680 1160 450 860 270 C 680 140 720 -20 930 -200"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </>
  ),

  /* Sobe do canto inferior-esquerdo — usa nas Dores */
  "bottom-left": (
    <>
      <path
        d="M -80 920 C 80 720 -80 490 200 310 C 380 180 360 20 160 -160"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M -200 960 C -40 760 -200 530 80 350 C 260 220 240 60 40 -120"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 60 880 C 220 680 40 450 300 270 C 460 140 440 -20 240 -200"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </>
  ),

  /* Grande arco diagonal de topo-direito ao inferior-esquerdo — usa em seções de destaque */
  "full-sweep": (
    <>
      <path
        d="M 1300 -100 C 1020 100 1180 400 850 520 C 600 620 450 500 -100 680"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 1420 20 C 1140 220 1300 500 970 620 C 720 720 570 600 20 780"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 1180 -150 C 900 50 1060 350 730 470 C 480 570 330 450 -220 630"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </>
  ),

  /* Ondas horizontais que cruzam a seção — usa nos Depoimentos e Atendimento */
  horizontal: (
    <>
      <path
        d="M -150 430 C 180 300 460 540 720 360 C 970 190 1170 430 1500 340"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M -150 570 C 280 440 560 660 820 480 C 1070 310 1270 560 1600 460"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M -150 290 C 140 160 400 400 660 220 C 880 60 1110 310 1420 210"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </>
  ),

  /* Versão escura — mesmo traço full-sweep mas com opacidade invertida para seções ink */
  "diagonal-dark": (
    <>
      <path
        d="M 1300 -100 C 1020 100 1180 400 850 520 C 600 620 450 500 -100 680"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 1420 20 C 1140 220 1300 500 970 620 C 720 720 570 600 20 780"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M 1100 -180 C 840 20 1000 320 680 440 C 440 540 300 420 -240 600"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.35"
      />
    </>
  ),
};

/* ————————————————————————————————————————————————————————————
   Componente
   ———————————————————————————————————————————————————————————— */
interface OrganicCurvesProps {
  variant: CurveVariant;
  /** "light" (default) = traço em gold claro; "dark" = traço em ivory. */
  tone?: "light" | "dark";
  className?: string;
}

export function OrganicCurves({
  variant,
  tone = "light",
  className,
}: OrganicCurvesProps) {
  return (
    <svg
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        tone === "dark" ? "stroke-ivory/[0.30]" : "stroke-gold-dark/[0.42]",
        className
      )}
    >
      {PATHS[variant]}
    </svg>
  );
}
