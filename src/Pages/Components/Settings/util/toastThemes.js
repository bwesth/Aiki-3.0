function getCoords(id) {
  const rect = document.getElementById(id).getBoundingClientRect();
  return rect;
}

export const successTheme = ({ x, y }) => {
  return {
    "--toastBackground": "#fff",
    "--toastColor": "--gray-dark",
    "--toastProgressBackground": "#28a745",
    "text-align": "center",
    transform: `translate(${getCoords(x).right + 15}px, ${getCoords(y).top}px)`,
  };
};

export const warningTheme = ({ x, y }) => {
  return {
    "--toastBackground": "#fff",
    "--toastColor": "--gray-dark",
    "--toastProgressBackground": "#dc3545",
    "text-align": "center",
    transform: `translate(${getCoords(x).right + 15}px, ${getCoords(y).top}px)`,
  };
};

export const infoTheme = ({ x, y }) => {
  return {
    "--toastBackground": "#fff",
    "--toastColor": "--gray-dark",
    "--toastProgressBackground": "#ffc107",
    "text-align": "center",
    transform: `translate(${getCoords(x).right + 15}px, ${getCoords(y).top}px)`,
  };
};
