import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["node_modules/**"],
  },
  {
    rules: {
      // Allow setState in effects for initialization patterns
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
