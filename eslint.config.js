import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // plugins: { "react-hooks": reactHooks },
    // rules: {
    //   // 检查 Hooks 的使用规则
    //   "react-hooks/rules-of-hooks": "error",
    //   // 检查依赖项的声明
    //   "react-hooks/exhaustive-deps": "warn",
    // },
  },
]);
