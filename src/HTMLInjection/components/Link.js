import { applyStyles, createInnerElement } from "../htmlCreationScripts";


const style = [
  { property: "backgroundColor", value: "#7b68ee" },
  { property: "color", value: "#fff" },
];

export function Link() {
    let ele = createInnerElement("a", "Go to LearnIT");
    ele.href = "https://learnit.itu.dk/course/view.php?id=3020940";
    ele.id = "learnit-link"
    applyStyles(ele, style);
    return ele;
  }
  