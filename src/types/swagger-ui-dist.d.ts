declare module "swagger-ui-dist/swagger-ui-bundle" {
  interface SwaggerUIBundleOptions {
    spec?: object;
    url?: string;
    domNode?: HTMLElement;
    presets?: unknown[];
    plugins?: unknown[];
    layout?: string;
  }

  interface SwaggerUIBundleType {
    (options: SwaggerUIBundleOptions): unknown;
    presets: {
      apis: unknown;
    };
    SwaggerUIStandalonePreset: unknown;
  }

  const SwaggerUIBundle: SwaggerUIBundleType;
  export default SwaggerUIBundle;
}

declare module "swagger-ui-dist/swagger-ui.css";
