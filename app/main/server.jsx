import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router'
import axios from 'axios';
import { Provider } from 'react-redux';
import createRoutes from './routes';
import configureStore from './store';
import headconfig from '../components/Meta';
import { fetchComponentDataBeforeRender } from '../lib/fetchComponentDataBeforeRender';

import initialState from '../states';


//TODO：没什么用的话可以删掉了-----------------------------------------------------
// const clientConfig = {
//     host: process.env.HOSTNAME || 'localhost',
//     port: process.env.PORT || '3000'
// };


// axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;
//------------------------------------------------------------------------------


function renderFullPage(renderedContent, initialState, head={
    title: 'React Webpack Node',
    meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    link: '<link rel="stylesheet" href="/assets/styles/main.css"/>'
}) {
    return `
        <!doctype html>
        <html lang="">

        <head>
            ${head.title}

            ${head.meta}

            ${head.link}
        </head>
        <body>
        <div id="app">${renderedContent}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
        </body>
        </html>
    `;
}

export default function render(req, res) {
    const history = createMemoryHistory();

    const store = configureStore(initialState, history);
    const routes = createRoutes(store);

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const InitialView = (
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
            .then(() => {
                const componentHTML = renderToString(InitialView);
                const initialState = store.getState();
                res.status(200).end(renderFullPage(componentHTML, initialState, {
                    title: headconfig.title,
                    meta: headconfig.meta,
                    link: headconfig.link
                }));
            })
            .catch(() => {
                res.end(renderFullPage('', {}));
            });
        } else {
            res.status(404).send('Not Found');
        }
    });
}
