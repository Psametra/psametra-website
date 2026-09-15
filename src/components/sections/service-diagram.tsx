type Capability = "software" | "ai" | "web" | "product";

function SoftwareSystem() {
  return (
    <>
      <g className="diagram-faint">
        <path d="M18 24H302M18 95H302M18 166H302" />
        <path d="M66 14V176M160 14V176M254 14V176" />
      </g>
      <rect
        className="diagram-panel"
        x="18"
        y="47"
        width="78"
        height="96"
        rx="5"
      />
      <rect
        className="diagram-panel"
        x="121"
        y="29"
        width="78"
        height="60"
        rx="5"
      />
      <rect
        className="diagram-panel"
        x="224"
        y="47"
        width="78"
        height="96"
        rx="5"
      />
      <path
        className="diagram-track"
        d="M96 95H121M199 59H211Q224 59 224 72V95"
      />
      <path
        className="diagram-signal"
        pathLength={1}
        d="M38 112H78L110 130H160V112H282"
      />
      <circle className="diagram-node" cx="38" cy="112" r="6" />
      <circle className="diagram-node" cx="160" cy="112" r="6" />
      <circle
        className="diagram-accent diagram-pulse"
        cx="282"
        cy="112"
        r="5"
      />
      <path
        className="diagram-detail"
        d="M36 68h42M36 79h28M139 49h42M242 68h42M242 79h26"
      />
    </>
  );
}

function IntelligenceSystem() {
  return (
    <>
      <circle className="diagram-faint diagram-ring" cx="160" cy="95" r="75" />
      <ellipse
        className="diagram-faint diagram-ring"
        cx="160"
        cy="95"
        rx="124"
        ry="46"
      />
      <path
        className="diagram-track"
        d="M160 95L72 43M160 95l91-48M160 95l104 64M160 95L57 151"
      />
      <circle className="diagram-node" cx="72" cy="43" r="13" />
      <circle className="diagram-node" cx="251" cy="47" r="9" />
      <circle className="diagram-node" cx="264" cy="159" r="12" />
      <circle className="diagram-node" cx="57" cy="151" r="9" />
      <circle
        className="diagram-soft-fill diagram-pulse-ring"
        cx="160"
        cy="95"
        r="35"
      />
      <circle className="diagram-node" cx="160" cy="95" r="24" />
      <circle className="diagram-accent diagram-pulse" cx="160" cy="95" r="5" />
      <circle
        className="diagram-accent diagram-orbit-dot"
        cx="160"
        cy="20"
        r="4"
      />
      <path
        className="diagram-detail"
        d="M65 39h14M244 43h14M257 155h14M50 147h14"
      />
    </>
  );
}

function WebSystem() {
  return (
    <>
      <rect
        className="diagram-faint diagram-panel"
        x="82"
        y="15"
        width="214"
        height="130"
        rx="6"
      />
      <rect
        className="diagram-faint diagram-panel"
        x="55"
        y="29"
        width="214"
        height="130"
        rx="6"
      />
      <rect
        className="diagram-panel"
        x="24"
        y="45"
        width="214"
        height="130"
        rx="6"
      />
      <path className="diagram-track" d="M24 70h214" />
      <circle className="diagram-node" cx="40" cy="58" r="3" />
      <circle className="diagram-node" cx="51" cy="58" r="3" />
      <circle className="diagram-node" cx="62" cy="58" r="3" />
      <rect
        className="diagram-soft-fill"
        x="42"
        y="89"
        width="73"
        height="52"
        rx="3"
      />
      <path
        className="diagram-detail"
        d="M132 91h76M132 105h58M132 119h69M42 154h166"
      />
      <path className="diagram-scan" d="M34 80h194" />
      <path className="diagram-cursor" d="M196 129l20 9-9 4-4 10z" />
      <circle
        className="diagram-accent diagram-pulse"
        cx="207"
        cy="142"
        r="3"
      />
    </>
  );
}

function ProductSystem() {
  return (
    <>
      <g className="diagram-faint">
        <path d="M22 36H298M22 95H298M22 154H298" />
        <path d="M54 17V173M160 17V173M266 17V173" />
      </g>
      <path
        className="diagram-track"
        d="M34 143C80 143 78 55 126 55s46 79 91 79 43-78 72-78"
      />
      <path
        className="diagram-signal diagram-product-route"
        pathLength={1}
        d="M34 143C80 143 78 55 126 55s46 79 91 79 43-78 72-78"
      />
      <circle className="diagram-node" cx="34" cy="143" r="8" />
      <rect
        className="diagram-node diagram-diamond"
        x="118"
        y="47"
        width="16"
        height="16"
      />
      <circle className="diagram-node" cx="217" cy="134" r="8" />
      <circle className="diagram-accent diagram-pulse" cx="289" cy="56" r="5" />
      <path className="diagram-detail" d="M26 20h58M174 20h52M241 167h51" />
      <circle
        className="diagram-soft-fill diagram-pulse-ring"
        cx="217"
        cy="134"
        r="25"
      />
    </>
  );
}

/** Decorative, code-native motion studies; capability copy remains the accessible explanation. */
export function ServiceDiagram({ type }: { type: Capability }) {
  return (
    <svg
      className={`service-diagram diagram-${type}`}
      viewBox="0 0 320 190"
      fill="none"
      aria-hidden="true"
    >
      {type === "software" ? (
        <SoftwareSystem />
      ) : type === "ai" ? (
        <IntelligenceSystem />
      ) : type === "web" ? (
        <WebSystem />
      ) : (
        <ProductSystem />
      )}
    </svg>
  );
}
