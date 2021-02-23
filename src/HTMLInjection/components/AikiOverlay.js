/* body element of injection. Top level element created by extension with a fixed position and high zIndex. */

import { applyStyles } from "../htmlCreationScripts";

const style = [
  { property: "position", value: "fixed" },
  { property: "zIndex", value: "1001" },
  { property: "textAlign", value: "center" },
  { property: "top", value: "10em" },
  { property: "right", value: "0" },
];

export function AikiOverlay() {
  let ele = document.createElement("div");
  ele.id = "aikiOverlay";
  applyStyles(ele, style);
  return ele;
}
