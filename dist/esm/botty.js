import { p as promiseResolve, b as bootstrapLazy } from './index-1ebf1a85.js';
export { s as setNonce } from './index-1ebf1a85.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

/*
 Stencil Client Patch Browser v4.22.2 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["my-component",[[1,"my-component",{"chatMessages":[32],"isLoading":[32],"errorMessage":[32]}]]]], options);
});

//# sourceMappingURL=botty.js.map