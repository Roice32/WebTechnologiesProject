import url from 'url';
import { navigateTo } from './router.js';
import { resourceTypes, loadResource } from './resource_loader.js';
import { handleAPICall } from './controllers.js';
import { getRequestBody } from '../shared.js';

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
    const methodType = req.method;
    var parameters;
    if (methodType === 'GET')
        parameters = requestUrl.query;
    else if (methodType === 'POST' || methodType === 'PATCH')
        parameters = JSON.parse(await getRequestBody(req));
    else
        parameters = {};

    if (pageRequested(requestPath))
        await navigateTo(requestPath, res);
    else if (resourceRequested(requestPath))
        await loadResource(requestPath, res);
    else
        await handleAPICall(requestPath, methodType, parameters, res);
}