"use client";

import { Box, QrCode, ScanLine } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "@/lib/cms/types";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        iosSrc?: string;
        ar?: boolean;
        arModes?: string;
        cameraControls?: boolean;
        poster?: string;
      };
    }
  }
}

export function ARProductViewer({ product }: { product: Product }) {
  const hasAsset = Boolean(product.glbUrl);
  
  useEffect(() => {
    if (hasAsset && !document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
      document.head.appendChild(script);
    }
  }, [hasAsset]);

  return (
    <section className="ar-panel" aria-label={`Augmented reality preview for ${product.title}`}>
      <div className="ar-visual">
        {hasAsset ? (
          <model-viewer 
            src={product.glbUrl} 
            iosSrc={product.usdzUrl} 
            ar 
            arModes="webxr scene-viewer quick-look" 
            cameraControls 
            poster={product.thumbnail} 
            style={{ width: "100%", height: "100%", minHeight: "15rem" }} 
          />
        ) : (
          <>
            <ScanLine size={34} strokeWidth={1.3} />
            <strong>AR-ready product slot</strong>
            <span>Approved GLB / USDZ asset required</span>
          </>
        )}
      </div>
      <div className="ar-copy">
        <p className="eyebrow">Optional augmented reality</p>
        <h3>View selected technology in your space.</h3>
        <p>AR is available only when VSS Salesco supplies an approved product model. On a desktop, hand off to a mobile device via QR; on compatible mobile, launch native AR.</p>
        {hasAsset ? (
          <button className="tactile-link form-submit" type="button">
            <span>View in your space</span><i>↗</i>
          </button>
        ) : (
          <p className="notice">
            <QrCode size={14} style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px" }} /> 
            QR handoff and AR launch are prepared, but no approved product model is attached yet.
          </p>
        )}
      </div>
    </section>
  );
}
