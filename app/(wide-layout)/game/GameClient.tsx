"use client";

import React, { useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Pos = { x: number; y: number }; // 0–100 percent of image

type SceneData = {
  id: number;
  title: string;
  objectName: string;
  hint: string;
  target: Pos;
  Component: React.FC;
};

type RoundResult = {
  clickPos: Pos;
  distance: number;
  score: number;
  label: string;
  emoji: string;
};

// ─── Scoring ──────────────────────────────────────────────────────────────────

function calcScore(dist: number): { score: number; label: string; emoji: string } {
  if (dist < 5) return { score: 100, label: "Sempurna!", emoji: "🎯" };
  if (dist < 10) return { score: 80, label: "Luar biasa!", emoji: "✨" };
  if (dist < 18) return { score: 60, label: "Bagus!", emoji: "👍" };
  if (dist < 28) return { score: 40, label: "Hampir!", emoji: "😅" };
  return { score: 20, label: "Meleset!", emoji: "😬" };
}

// ─── Scene 1: Pantai Tropis — target: Bintang Laut @ (65%, 88%) ───────────────

const BeachScene: React.FC = () => (
  <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="block w-full">
    <defs>
      <linearGradient id="s1-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4AA8D8" />
        <stop offset="100%" stopColor="#B8DDEF" />
      </linearGradient>
      <linearGradient id="s1-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1565C0" />
        <stop offset="100%" stopColor="#1E88E5" />
      </linearGradient>
    </defs>
    {/* Sky */}
    <rect width="800" height="500" fill="url(#s1-sky)" />
    {/* Sun */}
    <circle cx="680" cy="78" r="55" fill="#FFE082" opacity="0.25" />
    <circle cx="680" cy="78" r="40" fill="#FFD54F" opacity="0.65" />
    <circle cx="680" cy="78" r="28" fill="#FFD700" />
    {/* Clouds */}
    <ellipse cx="130" cy="82" rx="72" ry="28" fill="white" opacity="0.88" />
    <ellipse cx="178" cy="66" rx="58" ry="23" fill="white" opacity="0.88" />
    <ellipse cx="85" cy="74" rx="48" ry="21" fill="white" opacity="0.88" />
    <ellipse cx="442" cy="100" rx="66" ry="26" fill="white" opacity="0.82" />
    <ellipse cx="488" cy="86" rx="52" ry="21" fill="white" opacity="0.82" />
    <ellipse cx="398" cy="93" rx="42" ry="18" fill="white" opacity="0.82" />
    {/* Sea */}
    <rect x="0" y="268" width="800" height="112" fill="url(#s1-sea)" />
    <path
      d="M0,282 Q100,272 200,282 Q300,292 400,282 Q500,272 600,282 Q700,292 800,282"
      fill="none"
      stroke="white"
      strokeWidth="2"
      opacity="0.3"
    />
    <path
      d="M0,308 Q150,298 300,308 Q450,318 600,308 Q700,303 800,308"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      opacity="0.2"
    />
    {/* Shoreline foam */}
    <path
      d="M0,374 Q200,360 400,374 Q600,388 800,374 L800,380 Q600,394 400,380 Q200,366 0,380Z"
      fill="white"
      opacity="0.38"
    />
    {/* Sand */}
    <rect x="0" y="370" width="800" height="130" fill="#F5DEB3" />
    <ellipse cx="400" cy="386" rx="400" ry="22" fill="#DEB887" opacity="0.4" />
    {/* Palm tree left */}
    <rect x="87" y="152" width="16" height="228" rx="8" fill="#795548" />
    <rect x="92" y="152" width="9" height="228" rx="4" fill="#6D4C41" />
    <ellipse cx="95" cy="145" rx="4" ry="53" fill="#2E7D32" transform="rotate(-38,95,145)" />
    <ellipse cx="95" cy="145" rx="4" ry="57" fill="#388E3C" transform="rotate(8,95,145)" />
    <ellipse cx="95" cy="145" rx="4" ry="51" fill="#2E7D32" transform="rotate(52,95,145)" />
    <ellipse cx="95" cy="145" rx="4" ry="49" fill="#388E3C" transform="rotate(-82,95,145)" />
    <ellipse cx="95" cy="145" rx="4" ry="46" fill="#43A047" transform="rotate(100,95,145)" />
    <circle cx="98" cy="152" r="6" fill="#795548" />
    <circle cx="89" cy="157" r="5" fill="#6D4C41" />
    {/* Palm tree right */}
    <rect x="706" y="180" width="14" height="200" rx="7" fill="#795548" />
    <rect x="710" y="180" width="7" height="200" rx="3.5" fill="#6D4C41" />
    <ellipse cx="713" cy="174" rx="4" ry="51" fill="#2E7D32" transform="rotate(28,713,174)" />
    <ellipse cx="713" cy="174" rx="4" ry="54" fill="#388E3C" transform="rotate(-18,713,174)" />
    <ellipse cx="713" cy="174" rx="4" ry="48" fill="#2E7D32" transform="rotate(78,713,174)" />
    <ellipse cx="713" cy="174" rx="4" ry="46" fill="#388E3C" transform="rotate(-68,713,174)" />
    {/* Rocks */}
    <ellipse cx="556" cy="382" rx="29" ry="14" fill="#9E9E9E" />
    <ellipse cx="576" cy="384" rx="18" ry="9" fill="#BDBDBD" />
    <ellipse cx="184" cy="387" rx="22" ry="11" fill="#9E9E9E" />
    {/* Shells */}
    <ellipse cx="344" cy="408" rx="7" ry="4" fill="#FFAB91" transform="rotate(-20,344,408)" />
    <ellipse cx="416" cy="426" rx="5.5" ry="3.5" fill="#FFFDE7" transform="rotate(15,416,426)" />
    <ellipse cx="636" cy="416" rx="6" ry="3.5" fill="#FFAB91" transform="rotate(-10,636,416)" />
    {/* Seaweed near target */}
    <path
      d="M493,462 Q496,442 501,458"
      fill="none"
      stroke="#43A047"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M542,460 Q547,440 551,456"
      fill="none"
      stroke="#388E3C"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* ★ TARGET: Bintang Laut @ (520, 440) = 65%, 88% */}
    <g transform="translate(520,440)">
      <polygon
        points="0,-16 3.8,-5.2 15.2,-5.2 6.2,2 9.7,13.2 0,7 -9.7,13.2 -6.2,2 -15.2,-5.2 -3.8,-5.2"
        fill="#E64A19"
        stroke="#BF360C"
        strokeWidth="1"
      />
      <circle cx="0" cy="0" r="2.8" fill="#BF360C" />
      <circle cx="0" cy="-9" r="1.2" fill="#BF360C" opacity="0.6" />
      <circle cx="8.5" cy="3" r="1.2" fill="#BF360C" opacity="0.6" />
      <circle cx="-8.5" cy="3" r="1.2" fill="#BF360C" opacity="0.6" />
    </g>
  </svg>
);

// ─── Scene 2: Hutan Malam — target: Burung Hantu @ (36%, 46%) ────────────────

const ForestScene: React.FC = () => (
  <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="block w-full">
    <defs>
      <linearGradient id="s2-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0A1628" />
        <stop offset="70%" stopColor="#162040" />
        <stop offset="100%" stopColor="#1F2E50" />
      </linearGradient>
      <linearGradient id="s2-ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1B3A1A" />
        <stop offset="100%" stopColor="#0D2010" />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#s2-sky)" />
    {/* Stars */}
    <circle cx="55" cy="38" r="2" fill="white" opacity="0.8" />
    <circle cx="132" cy="22" r="1.5" fill="white" opacity="0.9" />
    <circle cx="198" cy="48" r="1" fill="white" opacity="0.7" />
    <circle cx="335" cy="28" r="2" fill="white" opacity="0.85" />
    <circle cx="405" cy="42" r="1.5" fill="white" opacity="0.8" />
    <circle cx="515" cy="18" r="1" fill="white" opacity="0.75" />
    <circle cx="582" cy="47" r="2" fill="white" opacity="0.9" />
    <circle cx="648" cy="28" r="1.5" fill="white" opacity="0.8" />
    <circle cx="718" cy="44" r="1" fill="white" opacity="0.7" />
    <circle cx="768" cy="18" r="2" fill="white" opacity="0.85" />
    <circle cx="92" cy="68" r="1" fill="white" opacity="0.65" />
    <circle cx="260" cy="70" r="1" fill="white" opacity="0.7" />
    <circle cx="455" cy="82" r="1.5" fill="white" opacity="0.75" />
    <circle cx="618" cy="68" r="1" fill="white" opacity="0.7" />
    <circle cx="340" cy="90" r="1" fill="white" opacity="0.6" />
    <circle cx="180" cy="88" r="1.5" fill="white" opacity="0.72" />
    <circle cx="700" cy="80" r="1" fill="white" opacity="0.68" />
    {/* Moon */}
    <circle cx="682" cy="85" r="52" fill="#FFF9C4" opacity="0.12" />
    <circle cx="682" cy="85" r="40" fill="#FFFDE7" opacity="0.92" />
    <circle cx="669" cy="73" r="7" fill="#FFF9C4" />
    <circle cx="695" cy="88" r="5" fill="#FFF9C4" />
    <circle cx="678" cy="98" r="3.5" fill="#FFF9C4" />
    {/* Far tree silhouettes */}
    <rect x="0" y="200" width="22" height="300" rx="5" fill="#0F200F" />
    <polygon points="11,65 -10,210 32,210" fill="#0F200F" />
    <rect x="750" y="175" width="22" height="325" rx="5" fill="#0F200F" />
    <polygon points="761,42 740,190 782,190" fill="#0F200F" />
    <rect x="770" y="210" width="18" height="290" rx="5" fill="#0F200F" />
    <polygon points="779,88 760,220 798,220" fill="#0F200F" />
    {/* Mid trees */}
    <rect x="570" y="155" width="30" height="345" rx="8" fill="#142214" />
    <polygon points="585,30 555,170 615,170" fill="#142214" />
    <rect x="155" y="165" width="28" height="335" rx="7" fill="#142214" />
    <polygon points="169,38 140,178 198,178" fill="#142214" />
    {/* Large center tree with hollow */}
    <rect x="262" y="100" width="55" height="400" rx="12" fill="#2D1B0E" />
    <rect x="268" y="100" width="29" height="400" rx="8" fill="#3E2723" />
    {/* Hollow opening */}
    <ellipse cx="289" cy="232" rx="21" ry="23" fill="#1A0A00" />
    {/* ★ TARGET: Burung Hantu @ (289, 230) = 36.1%, 46% */}
    <g transform="translate(289,228)">
      {/* Body */}
      <ellipse cx="0" cy="6" rx="11" ry="14" fill="#8D6E63" />
      {/* Head */}
      <ellipse cx="0" cy="-8" rx="10" ry="10" fill="#A1887F" />
      {/* Ear tufts */}
      <polygon points="-7,-17 -4,-10 -10,-10" fill="#795548" />
      <polygon points="7,-17 4,-10 10,-10" fill="#795548" />
      {/* Face disk */}
      <ellipse cx="0" cy="-8" rx="8" ry="7.5" fill="#D7CCC8" opacity="0.8" />
      {/* Eyes */}
      <circle cx="-3.5" cy="-10" r="3.5" fill="#FFF9C4" />
      <circle cx="3.5" cy="-10" r="3.5" fill="#FFF9C4" />
      <circle cx="-3.5" cy="-10" r="2" fill="#212121" />
      <circle cx="3.5" cy="-10" r="2" fill="#212121" />
      <circle cx="-2.8" cy="-10.8" r="0.8" fill="white" />
      <circle cx="4.2" cy="-10.8" r="0.8" fill="white" />
      {/* Beak */}
      <polygon points="0,-6 -2,-3 2,-3" fill="#FF8F00" />
      {/* Wing outline */}
      <path
        d="M-11,0 Q-14,8 -10,15"
        fill="none"
        stroke="#6D4C41"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11,0 Q14,8 10,15"
        fill="none"
        stroke="#6D4C41"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
    {/* Branches */}
    <rect
      x="240"
      y="310"
      width="62"
      height="8"
      rx="4"
      fill="#3E2723"
      transform="rotate(-15,240,310)"
    />
    <rect
      x="295"
      y="292"
      width="72"
      height="8"
      rx="4"
      fill="#3E2723"
      transform="rotate(20,295,292)"
    />
    {/* Ground */}
    <rect x="0" y="400" width="800" height="100" fill="url(#s2-ground)" />
    <rect x="0" y="396" width="800" height="12" fill="#2E5A2E" />
    {/* Mushroom */}
    <rect x="420" y="388" width="6" height="12" rx="2" fill="#FAFAFA" />
    <ellipse cx="423" cy="387" rx="11" ry="6" fill="#EF5350" />
    <circle cx="419" cy="384" r="1.5" fill="white" />
    <circle cx="425" cy="385" r="1.5" fill="white" />
    {/* Fallen leaves */}
    <ellipse cx="200" cy="405" rx="12" ry="5" fill="#FF8F00" opacity="0.7" transform="rotate(-20,200,405)" />
    <ellipse cx="550" cy="408" rx="10" ry="4" fill="#F4511E" opacity="0.7" transform="rotate(15,550,408)" />
    <ellipse cx="650" cy="402" rx="11" ry="4.5" fill="#FFA000" opacity="0.7" transform="rotate(-10,650,402)" />
  </svg>
);

// ─── Scene 3: Langit Senja — target: Bintang Jatuh @ (22%, 22%) ─────────────

const SunsetScene: React.FC = () => (
  <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="block w-full">
    <defs>
      <linearGradient id="s3-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1A0A4E" />
        <stop offset="35%" stopColor="#6A1A8A" />
        <stop offset="65%" stopColor="#E64A19" />
        <stop offset="85%" stopColor="#FF8F00" />
        <stop offset="100%" stopColor="#FFD54F" />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#s3-sky)" />
    {/* Stars in upper dark sky */}
    <circle cx="80" cy="35" r="1.5" fill="white" opacity="0.7" />
    <circle cx="200" cy="50" r="1" fill="white" opacity="0.6" />
    <circle cx="355" cy="30" r="2" fill="white" opacity="0.8" />
    <circle cx="505" cy="45" r="1.5" fill="white" opacity="0.7" />
    <circle cx="652" cy="25" r="1" fill="white" opacity="0.6" />
    <circle cx="722" cy="55" r="2" fill="white" opacity="0.75" />
    <circle cx="48" cy="65" r="1" fill="white" opacity="0.5" />
    <circle cx="280" cy="55" r="1" fill="white" opacity="0.55" />
    {/* ★ TARGET: Bintang Jatuh @ (176, 110) = 22%, 22% */}
    <g transform="translate(176,110)">
      {/* Glowing tail */}
      <line x1="-62" y1="31" x2="0" y2="0" stroke="white" strokeWidth="1" opacity="0.4" />
      <line x1="-50" y1="25" x2="0" y2="0" stroke="white" strokeWidth="2" opacity="0.65" />
      <line x1="-36" y1="18" x2="0" y2="0" stroke="white" strokeWidth="3" opacity="0.85" />
      {/* Core */}
      <circle cx="0" cy="0" r="9" fill="white" opacity="0.25" />
      <circle cx="0" cy="0" r="5.5" fill="white" opacity="0.7" />
      <circle cx="0" cy="0" r="3" fill="white" />
    </g>
    {/* Purple/pink clouds */}
    <ellipse cx="148" cy="182" rx="92" ry="35" fill="#CE93D8" opacity="0.5" />
    <ellipse cx="200" cy="165" rx="76" ry="28" fill="#F48FB1" opacity="0.45" />
    <ellipse cx="102" cy="174" rx="62" ry="25" fill="#CE93D8" opacity="0.5" />
    <ellipse cx="598" cy="202" rx="102" ry="38" fill="#FF7043" opacity="0.45" />
    <ellipse cx="656" cy="186" rx="82" ry="30" fill="#FFAB40" opacity="0.5" />
    <ellipse cx="546" cy="196" rx="66" ry="27" fill="#FF7043" opacity="0.45" />
    <ellipse cx="352" cy="242" rx="82" ry="30" fill="#EF5350" opacity="0.38" />
    <ellipse cx="402" cy="226" rx="66" ry="25" fill="#FF7043" opacity="0.42" />
    {/* Horizon glow */}
    <ellipse cx="400" cy="500" rx="400" ry="118" fill="#FFD54F" opacity="0.22" />
    {/* Bird silhouettes */}
    <path
      d="M298,318 Q301,313 304,318 Q307,313 310,318"
      fill="none"
      stroke="#1A0A4E"
      strokeWidth="2"
    />
    <path
      d="M358,300 Q361,295 364,300 Q367,295 370,300"
      fill="none"
      stroke="#1A0A4E"
      strokeWidth="2"
    />
    <path
      d="M418,310 Q421,305 424,310 Q427,305 430,310"
      fill="none"
      stroke="#1A0A4E"
      strokeWidth="2"
    />
    <path
      d="M278,342 Q281,337 284,342 Q287,337 290,342"
      fill="none"
      stroke="#1A0A4E"
      strokeWidth="1.5"
    />
    {/* Distant mountains */}
    <polygon points="0,452 202,280 402,432" fill="#1A0A4E" opacity="0.28" />
    <polygon points="202,452 452,260 702,422" fill="#1A0A4E" opacity="0.24" />
    <polygon points="452,452 652,302 800,402" fill="#1A0A4E" opacity="0.26" />
    {/* Dark horizon ground */}
    <rect x="0" y="452" width="800" height="48" fill="#0D0620" />
  </svg>
);

// ─── Scene 4: Pasar Tradisional — target: Kucing @ (55%, 78%) ────────────────

const MarketScene: React.FC = () => (
  <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="block w-full">
    <defs>
      <linearGradient id="s4-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#87CEEB" />
        <stop offset="100%" stopColor="#C8E6F5" />
      </linearGradient>
    </defs>
    {/* Sky */}
    <rect width="800" height="420" fill="url(#s4-sky)" />
    {/* Ground / cobblestone */}
    <rect x="0" y="418" width="800" height="82" fill="#8D6E63" />
    <rect x="0" y="415" width="800" height="10" fill="#6D4C41" opacity="0.5" />
    {/* Cobble rows */}
    {[0, 1, 2].map((row) =>
      [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
        <rect
          key={`${row}-${col}`}
          x={col * 100 + 10}
          y={row * 26 + 426}
          width="82"
          height="20"
          rx="4"
          fill="#795548"
          opacity="0.38"
        />
      )),
    )}
    {/* ── Left Stall ── */}
    <polygon points="28,148 232,148 252,200 8,200" fill="#E53935" />
    <polygon points="28,148 232,148 222,158 38,158" fill="#EF5350" />
    <rect x="8" y="200" width="244" height="218" fill="#EFEBE9" stroke="#BCAAA4" strokeWidth="2" />
    <rect x="8" y="278" width="244" height="8" fill="#8D6E63" />
    {/* Fruits upper shelf */}
    <circle cx="48" cy="262" r="14" fill="#FF7043" />
    <circle cx="78" cy="260" r="14" fill="#FF5722" />
    <circle cx="108" cy="262" r="14" fill="#FFCA28" />
    <circle cx="138" cy="260" r="14" fill="#FF7043" />
    <circle cx="168" cy="262" r="14" fill="#66BB6A" />
    <circle cx="198" cy="260" r="14" fill="#FF5722" />
    <rect x="8" y="338" width="244" height="8" fill="#8D6E63" />
    {/* Vegetables lower shelf */}
    <ellipse
      cx="53"
      cy="323"
      rx="16"
      ry="10"
      fill="#4CAF50"
      transform="rotate(-15,53,323)"
    />
    <ellipse
      cx="88"
      cy="325"
      rx="16"
      ry="10"
      fill="#388E3C"
      transform="rotate(10,88,325)"
    />
    <ellipse cx="123" cy="322" rx="10" ry="14" fill="#FF8F00" />
    <ellipse cx="153" cy="324" rx="10" ry="14" fill="#FF6F00" />
    <ellipse
      cx="186"
      cy="323"
      rx="16"
      ry="10"
      fill="#4CAF50"
      transform="rotate(-20,186,323)"
    />
    {/* Posts */}
    <rect x="8" y="200" width="12" height="218" fill="#795548" />
    <rect x="240" y="200" width="12" height="218" fill="#795548" />

    {/* ── Right Stall ── */}
    <polygon points="518,138 722,138 742,192 498,192" fill="#1976D2" />
    <polygon points="518,138 722,138 712,150 528,150" fill="#1E88E5" />
    <rect x="498" y="192" width="244" height="226" fill="#EFEBE9" stroke="#BCAAA4" strokeWidth="2" />
    <rect x="498" y="268" width="244" height="8" fill="#8D6E63" />
    {/* Spice mounds */}
    <ellipse cx="532" cy="254" rx="18" ry="11" fill="#FF8F00" />
    <ellipse cx="566" cy="256" rx="18" ry="11" fill="#D32F2F" />
    <ellipse cx="600" cy="254" rx="18" ry="11" fill="#F9A825" />
    <ellipse cx="634" cy="256" rx="18" ry="11" fill="#388E3C" />
    <ellipse cx="668" cy="254" rx="18" ry="11" fill="#FF8F00" />
    <ellipse cx="702" cy="256" rx="18" ry="11" fill="#795548" />
    <rect x="498" y="328" width="244" height="8" fill="#8D6E63" />
    {/* Baskets */}
    <ellipse cx="533" cy="316" rx="16" ry="10" fill="#A1887F" />
    <ellipse cx="568" cy="316" rx="16" ry="10" fill="#8D6E63" />
    <ellipse cx="605" cy="316" rx="16" ry="10" fill="#A1887F" />
    <ellipse cx="642" cy="316" rx="16" ry="10" fill="#8D6E63" />
    {/* Posts */}
    <rect x="498" y="192" width="12" height="226" fill="#795548" />
    <rect x="730" y="192" width="12" height="226" fill="#795548" />

    {/* Hanging lanterns between stalls */}
    <line x1="252" y1="152" x2="508" y2="152" stroke="#8D6E63" strokeWidth="2" />
    <circle cx="312" cy="164" r="14" fill="#FF5722" opacity="0.88" />
    <circle cx="380" cy="167" r="14" fill="#FF7043" opacity="0.88" />
    <circle cx="448" cy="164" r="14" fill="#FF5722" opacity="0.88" />
    <line x1="312" y1="152" x2="312" y2="164" stroke="#795548" strokeWidth="1.5" />
    <line x1="380" y1="152" x2="380" y2="167" stroke="#795548" strokeWidth="1.5" />
    <line x1="448" y1="152" x2="448" y2="164" stroke="#795548" strokeWidth="1.5" />

    {/* Shopper 1 */}
    <circle cx="340" cy="286" r="18" fill="#5D4037" />
    <rect x="326" y="304" width="28" height="64" rx="8" fill="#3949AB" />
    <rect x="320" y="314" width="12" height="54" rx="5" fill="#5D4037" />
    <rect x="354" y="314" width="12" height="54" rx="5" fill="#5D4037" />
    <rect x="326" y="368" width="12" height="34" rx="4" fill="#5D4037" />
    <rect x="342" y="368" width="12" height="34" rx="4" fill="#5D4037" />
    {/* Shopper 2 */}
    <circle cx="434" cy="278" r="17" fill="#FFCCBC" />
    <rect x="420" y="295" width="28" height="68" rx="8" fill="#E91E63" />
    <rect x="414" y="305" width="12" height="58" rx="5" fill="#FFCCBC" />
    <rect x="448" y="305" width="12" height="58" rx="5" fill="#FFCCBC" />
    <rect x="420" y="363" width="12" height="36" rx="4" fill="#5D4037" />
    <rect x="436" y="363" width="12" height="36" rx="4" fill="#5D4037" />

    {/* ★ TARGET: Kucing @ (440, 390) = 55%, 78% */}
    <g transform="translate(440,390)">
      {/* Body */}
      <ellipse cx="0" cy="5" rx="14" ry="9" fill="#BDBDBD" />
      {/* Head */}
      <circle cx="0" cy="-6" r="9" fill="#E0E0E0" />
      {/* Ears */}
      <polygon points="-8,-13 -5,-7 -11,-7" fill="#E0E0E0" />
      <polygon points="8,-13 5,-7 11,-7" fill="#E0E0E0" />
      <polygon points="-7,-12 -5.5,-8 -9,-8" fill="#FFCCBC" />
      <polygon points="7,-12 5.5,-8 9,-8" fill="#FFCCBC" />
      {/* Eyes */}
      <circle cx="-3" cy="-7" r="2.5" fill="#4CAF50" />
      <circle cx="3" cy="-7" r="2.5" fill="#4CAF50" />
      <circle cx="-3" cy="-7" r="1.2" fill="#212121" />
      <circle cx="3" cy="-7" r="1.2" fill="#212121" />
      {/* Nose */}
      <polygon points="0,-4 -1.5,-2.5 1.5,-2.5" fill="#FF80AB" />
      {/* Whiskers */}
      <line x1="-9" y1="-4" x2="-2" y2="-3" stroke="#9E9E9E" strokeWidth="0.8" />
      <line x1="-9" y1="-2" x2="-2" y2="-2" stroke="#9E9E9E" strokeWidth="0.8" />
      <line x1="9" y1="-4" x2="2" y2="-3" stroke="#9E9E9E" strokeWidth="0.8" />
      <line x1="9" y1="-2" x2="2" y2="-2" stroke="#9E9E9E" strokeWidth="0.8" />
      {/* Tail */}
      <path
        d="M14,5 Q26,0 23,12"
        fill="none"
        stroke="#BDBDBD"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

// ─── Scene 5: Kebun Bunga — target: Kupu-kupu @ (38%, 60%) ───────────────────

const GardenScene: React.FC = () => (
  <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="block w-full">
    <defs>
      <linearGradient id="s5-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#90CAF9" />
        <stop offset="100%" stopColor="#E3F2FD" />
      </linearGradient>
    </defs>
    <rect width="800" height="298" fill="url(#s5-sky)" />
    {/* Clouds */}
    <ellipse cx="180" cy="78" rx="82" ry="30" fill="white" opacity="0.86" />
    <ellipse cx="232" cy="63" rx="66" ry="25" fill="white" opacity="0.86" />
    <ellipse cx="130" cy="72" rx="56" ry="22" fill="white" opacity="0.86" />
    <ellipse cx="582" cy="98" rx="76" ry="28" fill="white" opacity="0.8" />
    <ellipse cx="632" cy="84" rx="62" ry="23" fill="white" opacity="0.8" />
    {/* Ground */}
    <rect x="0" y="288" width="800" height="212" fill="#558B2F" />
    <rect x="0" y="282" width="800" height="18" fill="#689F38" />
    {/* Grass tufts */}
    {[40, 140, 240, 340, 440, 540, 640, 740].map((x, i) => (
      <g key={i}>
        <path
          d={`M${x},288 Q${x - 5},268 ${x},282`}
          fill="none"
          stroke="#33691E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d={`M${x + 10},288 Q${x + 16},266 ${x + 10},282`}
          fill="none"
          stroke="#33691E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d={`M${x + 20},288 Q${x + 18},270 ${x + 20},282`}
          fill="none"
          stroke="#558B2F"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    ))}

    {/* ── Flower: Mawar (Rose) ── */}
    <rect x="90" y="228" width="6" height="68" rx="3" fill="#33691E" />
    <ellipse cx="80" cy="244" rx="10" ry="5" fill="#388E3C" transform="rotate(-25,80,244)" />
    <ellipse cx="102" cy="254" rx="10" ry="5" fill="#388E3C" transform="rotate(20,102,254)" />
    <circle cx="93" cy="222" r="20" fill="#E91E63" />
    <circle cx="87" cy="219" r="12" fill="#F06292" />
    <circle cx="93" cy="215" r="8" fill="#F48FB1" />

    {/* ── Flower: Matahari (Sunflower) ── */}
    <rect x="196" y="218" width="7" height="76" rx="3.5" fill="#33691E" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
      <ellipse
        key={i}
        cx="199.5"
        cy="212"
        rx="5"
        ry="16"
        fill="#FDD835"
        transform={`rotate(${a},199.5,212)`}
      />
    ))}
    <circle cx="199" cy="212" r="13" fill="#4E342E" />
    <circle cx="199" cy="212" r="8" fill="#6D4C41" />

    {/* ── Flower: Lavender cluster ── */}
    <rect x="359" y="238" width="5" height="56" rx="2.5" fill="#558B2F" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <circle
        key={i}
        cx={357 + (i % 3) * 5}
        cy={236 - i * 5}
        r="4"
        fill="#7E57C2"
        opacity="0.85"
      />
    ))}

    {/* ── Flower: Tulip ── */}
    <rect x="507" y="228" width="6" height="68" rx="3" fill="#33691E" />
    <path d="M510,222 Q494,212 497,198 Q509,208 510,222" fill="#388E3C" />
    <ellipse cx="508" cy="198" rx="12" ry="18" fill="#F44336" />
    <ellipse cx="508" cy="192" rx="8" ry="10" fill="#EF5350" />

    {/* ── Flower: Daisy cluster ── */}
    {[598, 638, 678, 618, 658, 698].map((x, i) => {
      const y = 248 + (i % 3) * 14;
      return (
        <g key={i}>
          <rect x={x + 2} y={y + 14} width="4" height="38" rx="2" fill="#558B2F" />
          {[0, 60, 120, 180, 240, 300].map((a, j) => (
            <ellipse
              key={j}
              cx={x + 4}
              cy={y + 10}
              rx="3.2"
              ry="8.5"
              fill="white"
              transform={`rotate(${a},${x + 4},${y + 10})`}
            />
          ))}
          <circle cx={x + 4} cy={y + 10} r="5.5" fill="#FDD835" />
        </g>
      );
    })}

    {/* ── Center White Flower (where butterfly sits) ── */}
    <rect x="299" y="232" width="6" height="72" rx="3" fill="#388E3C" />
    <ellipse cx="291" cy="250" rx="10" ry="5" fill="#2E7D32" transform="rotate(-20,291,250)" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
      <ellipse
        key={i}
        cx="302"
        cy="226"
        rx="4.2"
        ry="14"
        fill="white"
        transform={`rotate(${a},302,226)`}
      />
    ))}
    <circle cx="302" cy="226" r="8.5" fill="#FDD835" />

    {/* ★ TARGET: Kupu-kupu @ (304, 300) = 38%, 60% */}
    <g transform="translate(304,300)">
      {/* Upper wings */}
      <ellipse
        cx="-11"
        cy="-10"
        rx="17"
        ry="13"
        fill="#FF7043"
        opacity="0.92"
        transform="rotate(22,-11,-10)"
      />
      <ellipse
        cx="11"
        cy="-10"
        rx="17"
        ry="13"
        fill="#FF7043"
        opacity="0.92"
        transform="rotate(-22,11,-10)"
      />
      {/* Lower wings */}
      <ellipse
        cx="-9"
        cy="7"
        rx="13"
        ry="9"
        fill="#FF8A65"
        opacity="0.88"
        transform="rotate(-16,-9,7)"
      />
      <ellipse
        cx="9"
        cy="7"
        rx="13"
        ry="9"
        fill="#FF8A65"
        opacity="0.88"
        transform="rotate(16,9,7)"
      />
      {/* Wing spots */}
      <circle cx="-13" cy="-13" r="3" fill="#212121" opacity="0.5" />
      <circle cx="13" cy="-13" r="3" fill="#212121" opacity="0.5" />
      <circle cx="-11" cy="-9" r="2" fill="white" opacity="0.7" />
      <circle cx="11" cy="-9" r="2" fill="white" opacity="0.7" />
      {/* Body */}
      <ellipse cx="0" cy="0" rx="2.5" ry="10" fill="#212121" />
      {/* Antennae */}
      <path
        d="M-1,-9 Q-9,-19 -7,-23"
        fill="none"
        stroke="#212121"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M1,-9 Q9,-19 7,-23"
        fill="none"
        stroke="#212121"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="-7" cy="-23" r="1.5" fill="#212121" />
      <circle cx="7" cy="-23" r="1.5" fill="#212121" />
    </g>
  </svg>
);

// ─── Game data ────────────────────────────────────────────────────────────────

const SCENES: SceneData[] = [
  {
    id: 1,
    title: "Pantai Tropis",
    objectName: "Bintang Laut",
    hint: "Bintang laut senang bersembunyi di tepi air, dekat bebatuan",
    target: { x: 65, y: 88 },
    Component: BeachScene,
  },
  {
    id: 2,
    title: "Hutan Malam",
    objectName: "Burung Hantu",
    hint: "Burung hantu senang berdiam di lubang pohon tua yang besar",
    target: { x: 36.1, y: 46 },
    Component: ForestScene,
  },
  {
    id: 3,
    title: "Langit Senja",
    objectName: "Bintang Jatuh",
    hint: "Perhatikan bagian langit yang paling gelap di atas",
    target: { x: 22, y: 22 },
    Component: SunsetScene,
  },
  {
    id: 4,
    title: "Pasar Tradisional",
    objectName: "Kucing",
    hint: "Kucing pasar suka bersembunyi dekat kaki para pembeli",
    target: { x: 55, y: 78 },
    Component: MarketScene,
  },
  {
    id: 5,
    title: "Kebun Bunga",
    objectName: "Kupu-kupu",
    hint: "Kupu-kupu selalu hinggap di bunga yang paling segar",
    target: { x: 38, y: 60 },
    Component: GardenScene,
  },
];

// ─── Main game component ──────────────────────────────────────────────────────

type Phase = "start" | "playing" | "round-result" | "finished";

export default function GameClient() {
  const [phase, setPhase] = useState<Phase>("start");
  const [roundIdx, setRoundIdx] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [currentClick, setCurrentClick] = useState<Pos | null>(null);

  const scene = SCENES[roundIdx];
  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const maxScore = SCENES.length * 100;

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (phase !== "playing") return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Aspect-ratio-corrected distance (viewBox 800:500 = 1.6:1)
      const dx = (x - scene.target.x) * 1.6;
      const dy = y - scene.target.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const { score, label, emoji } = calcScore(distance);

      setCurrentClick({ x, y });
      setResults((prev) => [...prev, { clickPos: { x, y }, distance, score, label, emoji }]);
      setPhase("round-result");
    },
    [phase, scene],
  );

  const handleNext = useCallback(() => {
    if (roundIdx < SCENES.length - 1) {
      setRoundIdx((i) => i + 1);
      setCurrentClick(null);
      setPhase("playing");
    } else {
      setPhase("finished");
    }
  }, [roundIdx]);

  const handleRestart = useCallback(() => {
    setPhase("start");
    setRoundIdx(0);
    setResults([]);
    setCurrentClick(null);
  }, []);

  if (phase === "start") return <StartScreen onStart={() => setPhase("playing")} />;
  if (phase === "finished")
    return (
      <FinishScreen
        results={results}
        totalScore={totalScore}
        maxScore={maxScore}
        onRestart={handleRestart}
      />
    );

  const latestResult = phase === "round-result" ? results[results.length - 1] : null;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress bar */}
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-[var(--muted-foreground)]">
        <span>
          Ronde {roundIdx + 1} / {SCENES.length}
        </span>
        <span>Skor: {totalScore}</span>
      </div>
      <div className="mb-5 flex gap-1.5">
        {SCENES.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i < roundIdx
                ? "bg-[var(--accent)]"
                : i === roundIdx
                  ? "bg-[var(--accent)] opacity-50"
                  : "bg-[var(--border)]"
            }`}
          />
        ))}
      </div>

      {/* Round title */}
      <div className="mb-4 text-center">
        <p className="text-sm text-[var(--muted-foreground)]">{scene.title}</p>
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Temukan:{" "}
          <span className="text-[var(--accent)]">{scene.objectName}</span>
        </h2>
        {phase === "playing" && (
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">{scene.hint}</p>
        )}
      </div>

      {/* Game canvas */}
      <div
        className={`relative overflow-hidden rounded-2xl shadow-lg select-none ${
          phase === "playing" ? "cursor-crosshair" : "cursor-default"
        }`}
        onClick={handleImageClick}
      >
        <scene.Component />

        {/* Click marker (blue) */}
        {currentClick && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: `${currentClick.x}%`,
              top: `${currentClick.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-400 opacity-75" />
              <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-500 shadow-lg" />
            </div>
          </div>
        )}

        {/* Target marker (green) */}
        {phase === "round-result" && (
          <div
            className="pointer-events-none absolute"
            style={{
              left: `${scene.target.x}%`,
              top: `${scene.target.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 animate-pulse rounded-full border-4 border-green-400 bg-green-400/20" />
              <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-green-500 shadow-lg" />
            </div>
          </div>
        )}
      </div>

      {/* Result card */}
      {phase === "round-result" && latestResult && (
        <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {latestResult.emoji} {latestResult.label}
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">
                +{latestResult.score} poin &middot;{" "}
                {latestResult.distance < 5
                  ? "tepat sekali!"
                  : `selisih ${latestResult.distance.toFixed(1)}%`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[var(--accent)]">{latestResult.score}</p>
              <p className="text-xs text-[var(--muted-foreground)]">dari 100</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500" />
              Tebakan kamu
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-full bg-green-500" />
              Lokasi benar
            </span>
          </div>
          <button
            onClick={handleNext}
            className="mt-3 w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            {roundIdx < SCENES.length - 1 ? "Ronde Berikutnya →" : "Lihat Hasil Akhir →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Start Screen ─────────────────────────────────────────────────────────────

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-6 text-6xl">🔍</div>
      <h1 className="mb-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
        Temukan Benda
      </h1>
      <p className="mb-2 text-[var(--muted-foreground)]">
        Perhatikan gambar dengan seksama, lalu klik lokasi benda yang diminta.
      </p>
      <p className="mb-8 text-sm text-[var(--muted-foreground)]">
        Semakin tepat klikanmu, semakin tinggi skormu. Ada {SCENES.length} ronde.
      </p>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {SCENES.map((s) => (
          <div
            key={s.id}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-center"
          >
            <p className="text-xs font-semibold text-[var(--foreground)]">{s.objectName}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{s.title}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onStart}
        className="rounded-xl bg-[var(--accent)] px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
      >
        Mulai Bermain
      </button>
    </div>
  );
}

// ─── Finish Screen ────────────────────────────────────────────────────────────

function FinishScreen({
  results,
  totalScore,
  maxScore,
  onRestart,
}: {
  results: RoundResult[];
  totalScore: number;
  maxScore: number;
  onRestart: () => void;
}) {
  const pct = (totalScore / maxScore) * 100;
  const rating =
    pct >= 90
      ? { emoji: "🏆", label: "Luar Biasa!" }
      : pct >= 75
        ? { emoji: "⭐", label: "Hebat!" }
        : pct >= 55
          ? { emoji: "👍", label: "Bagus!" }
          : pct >= 35
            ? { emoji: "🙂", label: "Lumayan!" }
            : { emoji: "💪", label: "Terus Berlatih!" };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-4 text-5xl">{rating.emoji}</div>
      <h2 className="mb-1 text-3xl font-bold text-[var(--foreground)]">{rating.label}</h2>
      <p className="mb-6 text-[var(--muted-foreground)]">
        Kamu mendapatkan{" "}
        <span className="font-bold text-[var(--accent)]">{totalScore}</span>
        {" "}dari{" "}
        <span className="font-semibold">{maxScore}</span>{" "}poin
      </p>

      <div className="mb-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
        {results.map((r, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-3 ${
              i !== results.length - 1 ? "border-b border-[var(--border)]" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{r.emoji}</span>
              <div className="text-left">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {SCENES[i].objectName}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {r.label} &middot; {SCENES[i].title}
                </p>
              </div>
            </div>
            <span className="font-bold text-[var(--accent)]">+{r.score}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="rounded-xl bg-[var(--accent)] px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
      >
        Main Lagi
      </button>
    </div>
  );
}
