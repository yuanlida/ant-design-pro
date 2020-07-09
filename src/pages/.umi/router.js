import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/lidayuan/Documents/antd/new-old/ant-design-pro/src/pages/.umi/LocaleWrapper.jsx';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: require('../../layouts/BlankLayout').default,
    routes: [
      {
        path: '/user',
        component: require('../../layouts/UserLayout').default,
        routes: [
          {
            path: '/user',
            redirect: '/user/login',
            exact: true,
          },
          {
            name: 'login',
            icon: 'smile',
            path: '/user/login',
            component: require('../user/login').default,
            exact: true,
          },
          {
            name: 'register-result',
            icon: 'smile',
            path: '/user/register-result',
            component: require('../user/register-result').default,
            exact: true,
          },
          {
            name: 'register',
            icon: 'smile',
            path: '/user/register',
            component: require('../user/register').default,
            exact: true,
          },
          {
            component: require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/',
        component: require('../../layouts/BasicLayout').default,
        Routes: [require('../Authorized').default],
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            routes: [
              {
                name: 'analysis',
                icon: 'smile',
                path: '/dashboard/analysis',
                component: require('../dashboard/analysis').default,
                exact: true,
              },
              {
                name: 'monitor',
                icon: 'smile',
                path: '/dashboard/monitor',
                component: require('../dashboard/monitor').default,
                exact: true,
              },
              {
                name: 'workplace',
                icon: 'smile',
                path: '/dashboard/workplace',
                component: require('../dashboard/workplace').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/rasa',
            name: 'rasa',
            icon: 'dashboard',
            routes: [
              {
                name: 'backend',
                icon: 'smile',
                path: '/rasa/backend',
                routes: [
                  {
                    name: 'configuration',
                    icon: 'smile',
                    path: '/rasa/backend/configuration',
                    component: require('../rasa/backend/configuration').default,
                    exact: true,
                  },
                  {
                    name: 'logs',
                    icon: 'smile',
                    path: '/rasa/backend/logs/:key',
                    component: require('../rasa/backend/logs').default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                name: 'components',
                icon: 'smile',
                path: '/rasa/cmpnts',
                routes: [
                  {
                    name: 'setting',
                    icon: 'smile',
                    path: '/rasa/cmpnts/setting',
                    component: require('../rasa/cmpnts/setting').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                name: 'rasabot',
                icon: 'smile',
                path: '/rasa/rasabot',
                routes: [
                  {
                    path: '/rasa/rasabot',
                    component: require('../rasa/rasabot').default,
                    exact: true,
                  },
                  {
                    name: 'robotitem',
                    path: '/rasa/rasabot/robotitem/:key',
                    component: require('../rasa/rasabot/robotitem').default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'entities',
                    path: '/rasa/rasabot/entities/:key',
                    component: require('../rasa/rasabot/robotitem/entities')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'Intents',
                    path: '/rasa/rasabot/intents/:key',
                    component: require('../rasa/rasabot/robotitem/intents')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'Mark',
                    path: '/rasa/rasabot/marks/:key',
                    component: require('../rasa/rasabot/robotitem/intents/marks')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'regex',
                    path: '/rasa/rasabot/regex/:key',
                    component: require('../rasa/rasabot/robotitem/regex')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'synonyms',
                    path: '/rasa/rasabot/synonyms/:key',
                    component: require('../rasa/rasabot/robotitem/synonyms')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'responses',
                    icon: 'smile',
                    path: '/rasa/rasabot/responses/:key',
                    component: require('../rasa/rasabot/robotitem/responses')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'chat',
                    icon: 'smile',
                    path: '/rasa/rasabot/chat/:key',
                    component: require('../rasa/rasabot/robotitem/chat')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'models',
                    icon: 'smile',
                    path: '/rasa/rasabot/chatmodels/:key',
                    component: require('../rasa/rasabot/robotitem/chatmodels')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'stories',
                    icon: 'smile',
                    path: '/rasa/rasabot/stories/:key',
                    component: require('../rasa/rasabot/robotitem/stories')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'training',
                    icon: 'smile',
                    path: '/rasa/rasabot/training/:key',
                    component: require('../rasa/rasabot/robotitem/training')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'Expressions',
                    path: '/rasa/rasabot/expressions/:key',
                    component: require('../rasa/rasabot/robotitem/intents/expressions')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'robotStoryItem',
                    path: '/rasa/rasabot/robotstoryitem/:key',
                    component: require('../rasa/rasabot/robotitem/stories/storyitem')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    name: 'RasaActions',
                    path: '/rasa/rasabot/rasaactions/:key',
                    component: require('../rasa/rasabot/robotitem/responses/actions')
                      .default,
                    hideInMenu: true,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/form',
            icon: 'form',
            name: 'form',
            routes: [
              {
                name: 'basic-form',
                icon: 'smile',
                path: '/form/basic-form',
                component: require('../form/basic-form').default,
                exact: true,
              },
              {
                name: 'step-form',
                icon: 'smile',
                path: '/form/step-form',
                component: require('../form/step-form').default,
                exact: true,
              },
              {
                name: 'advanced-form',
                icon: 'smile',
                path: '/form/advanced-form',
                component: require('../form/advanced-form').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/list',
            icon: 'table',
            name: 'list',
            routes: [
              {
                path: '/list/search',
                name: 'search-list',
                component: require('../list/search').default,
                routes: [
                  {
                    path: '/list/search',
                    redirect: '/list/search/articles',
                    exact: true,
                  },
                  {
                    name: 'articles',
                    icon: 'smile',
                    path: '/list/search/articles',
                    component: require('../list/search/articles').default,
                    exact: true,
                  },
                  {
                    component: () =>
                      React.createElement(
                        require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                          .default,
                        { pagesPath: 'src/pages', hasRoutesInConfig: true },
                      ),
                  },
                ],
              },
              {
                name: 'table-list',
                icon: 'smile',
                path: '/list/table-list',
                component: require('../list/table-list').default,
                exact: true,
              },
              {
                name: 'basic-list',
                icon: 'smile',
                path: '/list/basic-list',
                component: require('../list/basic-list').default,
                exact: true,
              },
              {
                name: 'card-list',
                icon: 'smile',
                path: '/list/card-list',
                component: require('../list/card-list').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/profile',
            name: 'profile',
            icon: 'profile',
            routes: [
              {
                name: 'basic',
                icon: 'smile',
                path: '/profile/basic',
                component: require('../profile/basic').default,
                exact: true,
              },
              {
                name: 'advances',
                icon: 'smile',
                path: '/profile/advanced',
                component: require('../profile/advanced').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'result',
            icon: 'check-circle-o',
            path: '/result',
            routes: [
              {
                name: 'fail',
                icon: 'smile',
                path: '/result/fail',
                component: require('../result/fail').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'exception',
            icon: 'warning',
            path: '/exception',
            routes: [
              {
                name: '403',
                icon: 'smile',
                path: '/exception/403',
                component: require('../exception/403').default,
                exact: true,
              },
              {
                name: '404',
                icon: 'smile',
                path: '/exception/404',
                component: require('../exception/404').default,
                exact: true,
              },
              {
                name: '500',
                icon: 'smile',
                path: '/exception/500',
                component: require('../exception/500').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'account',
            icon: 'user',
            path: '/account',
            routes: [
              {
                name: 'center',
                icon: 'smile',
                path: '/account/center',
                component: require('../account/center').default,
                exact: true,
              },
              {
                name: 'settings',
                icon: 'smile',
                path: '/account/settings',
                component: require('../account/settings').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            name: 'editor',
            icon: 'highlight',
            path: '/editor',
            routes: [
              {
                name: 'flow',
                icon: 'smile',
                path: '/editor/flow',
                component: require('../editor/flow').default,
                exact: true,
              },
              {
                name: 'mind',
                icon: 'smile',
                path: '/editor/mind',
                component: require('../editor/mind').default,
                exact: true,
              },
              {
                name: 'koni',
                icon: 'smile',
                path: '/editor/koni',
                component: require('../editor/koni').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/',
            redirect: '/dashboard/analysis',
            authority: ['admin', 'user'],
            exact: true,
          },
          {
            component: require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/lidayuan/Documents/antd/new-old/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
