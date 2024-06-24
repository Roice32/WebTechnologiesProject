import url from 'url';
import { navigateTo } from './router.js';
import { resourceTypes, loadResource } from './resource_loader.js';
import { handleAPICall } from './controllers.js';
import { getRequestBody } from '../shared.js';
import { getTokenFromHeaders } from '../jwt.js';

function pageRequested(requestPath) {
    return requestPath === '/' || requestPath.endsWith('.html');
}

function resourceRequested(requestPath) {
    const fileExtension = requestPath.split('.').pop();
    return fileExtension in resourceTypes;
}

export default async function handleRequest(req, res) {
    const requestUrl = url.parse(req.url, true);
    const requestPath = requestUrl.pathname;
    if (pageRequested(requestPath)) {
        console.log(requestPath + ' GET');
        await navigateTo(requestPath, res);
        return;
    }
    if (resourceRequested(requestPath)) {
        console.log(requestPath + ' GET');
        await loadResource(requestPath, res);
        return;
    }

    const methodType = req.method;
    var parameters;
    if (methodType === 'GET')
        parameters = requestUrl.query;
    else if (methodType === 'POST' || methodType === 'PATCH')
        parameters = JSON.parse(await getRequestBody(req));
    else
        parameters = {};
    const token = getTokenFromHeaders(req);
    console.log(requestPath + ' ' + methodType + ' ' + token + ' ' + JSON.stringify(parameters));
    await handleAPICall(requestPath, methodType, token, parameters, res);
}