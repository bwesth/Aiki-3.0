import storage from './util/storage'
import { learningSites } from './util/constants'
import browser from "webextension-polyfill";

async function createFilter() {
    const procList = await storage.getList();

    let url = procList.map(item => {
        return { hostContains: `.${item.name}.` }
    })

    const filter = {
        url: url
    };

    return filter;
}

function redirect () {
    location.replace("www.codecademy.com")
}

browser.webNavigation.onBeforeNavigate.addListener(redirect, createFilter());

