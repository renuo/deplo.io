<script lang="ts">
  export let labels: string[] = [];
  const [label1, label2, label3, label4] = labels;
</script>

<svg
  width="1440"
  height="747"
  viewBox="40 -200 1440 747"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="mountain-svg pointer-events-none -mb-px h-auto w-full select-none"
>
  <path
    d="M1304.5 164L1455 303.5L1485.5 546.499H-68.0005L33 498.5L130 474.5L183 440L210.5 425L244.5 440L349 386L413 323.5H454L500.5 303.5L563 336.5L665 293L748 243L767 253L824 295.5L856 270.5L953.2 153.4L1089.5 114L1124 79.5L1150.5 66.5L1201 20L1232.5 46.5L1304.5 164Z"
    fill="#FCFAFA"
  />
  <circle cx="209" cy="426" r="18" stroke="#141D50" stroke-width="4" />
  <circle cx="499" cy="303" r="18" stroke="#141D50" stroke-width="4" />
  <circle cx="747" cy="243" r="18" stroke="#141D50" stroke-width="4" />
  <circle cx="1200" cy="20" r="18" stroke="#141D50" stroke-width="4" />

  <text x="209" y="380" text-anchor="middle" class="mountain-label" fill="#141D50" transform="rotate(-30, 209, 380)"
    >{label1}</text
  >
  <text x="499" y="260" text-anchor="middle" class="mountain-label" fill="#141D50" transform="rotate(-30, 499, 260)"
    >{label2}</text
  >
  <text x="747" y="200" text-anchor="middle" class="mountain-label" fill="#141D50" transform="rotate(-30, 747, 200)"
    >{label3}</text
  >
  <text x="1200" y="-20" text-anchor="middle" class="mountain-label" fill="#141D50" transform="rotate(-30, 1200, -20)"
    >{label4}</text
  >

  <g>
    <mask
      id="mask0_2455_4589"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="-763"
      y="-392"
      width="2957"
      height="1290"
    >
      <rect x="-763" y="-392" width="2956.5" height="1290" fill="#141D50" />
    </mask>
    <g mask="url(#mask0_2455_4589)">
      <path
        class="background-path"
        d="M222 437L259 468L312 448.5L359 456L423 404.5L442 351L486 315.5"
        stroke="#141D50"
        stroke-width="4"
      />
      <path
        class="background-path"
        d="M507.5 319L526.5 353L577.5 357.5L619 386L652.5 367L659 324.5L731 295.5L741.5 260.5"
        stroke="#141D50"
        stroke-width="4"
      />
      <path
        class="background-path"
        d="M758.5 257L787 281L802.5 319L864 333L952.5 292.5L1051 281L1092 241L1039.5 221.5L1003.5 184L1051 156.5L1131 153L1207.5 113L1192 74L1198 40"
        stroke="#141D50"
        stroke-width="4"
      />
      <path
        class="pulse-path"
        d="M222 437L259 468L312 448.5L359 456L423 404.5L442 351L486 315.5"
        stroke="#141D50"
        stroke-width="4"
      />
      <path
        class="pulse-path"
        d="M507.5 319L526.5 353L577.5 357.5L619 386L652.5 367L659 324.5L731 295.5L741.5 260.5"
        stroke="#141D50"
        stroke-width="4"
      />
      <path
        class="pulse-path"
        d="M758.5 257L787 281L802.5 319L864 333L952.5 292.5L1051 281L1092 241L1039.5 221.5L1003.5 184L1051 156.5L1131 153L1207.5 113L1192 74L1198 40"
        stroke="#141D50"
        stroke-width="4"
      />
    </g>
  </g>
  <defs>
    <mask id="pulseMask">
      <rect width="1440" height="547" fill="black" />
      <circle r="140" fill="white">
        <animateMotion dur="4s" repeatCount="indefinite" keyTimes="0;1" keySplines="0.25,0.1,0.25,1" calcMode="spline">
          <mpath href="#motionPath" />
        </animateMotion>
      </circle>
    </mask>
    <path
      id="motionPath"
      d="M100 470Q150 450 222 437Q350 380 486 315.5Q550 340 659 324.5Q700 290 758.5 257Q850 320 1051 281Q1100 220 1198 38Q1280 -20 1350 -40"
      fill="none"
      stroke="none"
    />
  </defs>
</svg>

<style>
  .background-path {
    stroke-dasharray: 16 16;
    stroke-linecap: round;
    opacity: 0.4;
  }

  .pulse-path {
    stroke-dasharray: 16 16;
    stroke-linecap: round;
    mask: url(#pulseMask);
    stroke-dashoffset: 0;
  }

  .mountain-label {
    font-family: inherit;
    font-size: 45px;
    font-weight: normal;
    text-transform: uppercase;
    line-height: 117%;
    letter-spacing: 0.02em;
  }

  @media (min-width: 750px) {
    .mountain-label {
      font-size: 32px;
    }
  }

  @media (min-width: 1000px) {
    .mountain-label {
      font-size: 20px;
    }
  }

  @media (min-width: 1200px) {
    .mountain-label {
      font-size: 16px;
    }
  }
</style>
