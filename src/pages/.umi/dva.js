import dva from "dva";
import { Component } from "react";
import createLoading from "dva-loading";
import history from "@tmp/history";

let app = null;

export function _onCreate() {
  const plugins = require("umi/_runtimePlugin");
  const runtimeDva = plugins.mergeConfig("dva");
  app = dva({
    history,

    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {})
  });

  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });

  app.model({
    namespace: "global",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/models/global.ts")
      .default
  });
  app.model({
    namespace: "login",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/models/login.ts")
      .default
  });
  app.model({
    namespace: "setting",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/models/setting.ts")
      .default
  });
  app.model({
    namespace: "user",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/models/user.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/user/login/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/user/register/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/dashboard/analysis/model.tsx")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/dashboard/monitor/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/dashboard/workplace/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/backend/configuration/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/backend/logs/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/cmpnts/setting/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/entities/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/intents/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/intents/marks/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/regex/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/synonyms/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/responses/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/chat/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/chatmodels/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/stories/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/training/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/intents/expressions/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/stories/storyitem/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/rasa/rasabot/robotitem/responses/actions/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/form/basic-form/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/form/step-form/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/form/advanced-form/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/list/search/articles/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/list/table-list/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/list/basic-list/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/list/card-list/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/profile/basic/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/profile/advanced/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/account/center/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/account/settings/model.ts")
      .default
  });
  app.model({
    namespace: "model",
    ...require("/Users/enzofilangeri/Desktop/ant-design-pro/src/pages/editor/flow/model.ts")
      .default
  });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
