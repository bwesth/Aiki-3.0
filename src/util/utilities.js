export function parseUrl(site) {
  let host = site.includes("http") ? site.split("/")[2] : site.split("/")[0];
  let name = host.includes("www") ? host.split(".")[1] : host.split(".")[0];
  return { host: host, name: name };
}

export function makeDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date();
  return {
    dateString: date.toLocaleDateString("en-US", options),
    milliseconds: date.getMilliseconds(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    timestamp: date.getTime(),
    hours: date.getHours(),
  };
}
