function getCoords(id) {
    const rect = document.getElementById(id).getBoundingClientRect();
    console.log(rect);
    return rect;
  }

  export const successTheme = ({x, y}) => {
    return {
      "--toastBackground": "green",
      "--toastColor": "black",
      transform: `translate(${getCoords(x).right+15}px, ${
        getCoords(y).top
      }px)`,
    };
  };

  export const warningTheme = ({x, y}) => {
    return {
      "--toastBackground": "red",
      "--toastColor": "black",
      transform: `translate(${getCoords(x).right+15}px, ${
        getCoords(y).top
      }px)`,
    };
  };

  export const infoTheme = ({x, y}) => {
    return {
      "--toastBackground": "yellow",
      "--toastColor": "black",
      transform: `translate(${getCoords(x).right+15}px, ${
        getCoords(y).top
      }px)`,
    };
  };