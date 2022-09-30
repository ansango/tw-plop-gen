const postcssJs = require("postcss-js")
const postcssPrefix = require('./lib/postcss-prefixer')

const twuiInfo = require("../package.json")
const colors = require("./colors/index");
const utilities = require("../dist/utilities");
const base = require("../dist/base");
const unstyled = require("../dist/unstyled");
const unstyledRtl = require("../dist/unstyled.rtl");
const styled = require("../dist/styled");
const styledRtl = require("../dist/styled.rtl");
const utilitiesUnstyled = require("../dist/utilities-unstyled");
const utilitiesStyled = require("../dist/utilities-styled");
const themes = require("./colors/themes");
const colorFunctions = require("./colors/functions");

const mainFunction = ({ addBase, addComponents, addUtilities, config, postcss }) => {
  let optionsIncluded = [];
  let logs = false;
  if (config("twui.logs") != false) {
    logs = true
  }
  if (logs) {
    console.log();
    console.log("\x1b[35m%s\x1b[0m", "🀄 TWUI Components " + twuiInfo.version, "\x1b[0m", twuiInfo.homepage)
    console.group();
  }

  // inject @base style
  if (config("twui.base") != false) {
    addBase(base)
    optionsIncluded.push("base")
  }

  // inject components
  // because rollupjs doesn't supprt dynamic require
  let file = styled;
  if (config("twui.styled") == false && config("twui.rtl") != true) {
    optionsIncluded.push("unstyled components")
    file = unstyled
  } else if (config("twui.styled") == false && config("twui.rtl") == true) {
    optionsIncluded.push("unstyled components")
    console.log("\x1b[36m%s\x1b[0m", " Direction:", "\x1b[0m", "RTL")
    file = unstyledRtl
  } else if (config("twui.styled") != false && config("twui.rtl") != true) {
    optionsIncluded.push("components")
    file = styled
  } else if (config("twui.styled") !== false && config("twui.rtl") == true) {
    optionsIncluded.push("components")
    console.log("\x1b[36m%s\x1b[0m", " Direction:", "\x1b[0m", "RTL")
    file = styledRtl
  }

  // add prefix to class names if specified
  const prefix = config("twui.prefix")
  let postcssJsProcess
  if (prefix) {
    try {
      postcssJsProcess = postcssJs.sync(postcssPrefix({ prefix, ignore: [] }))
    } catch (error) {
      logs && console.error(`Error occurred and prevent applying the "prefix" option:`, error)
    }
  }
  const shouldApplyPrefix = prefix && postcssJsProcess;
  if (shouldApplyPrefix) {
    file = postcssJsProcess(file)
  }

  addComponents(file);

  const themeInjector = colorFunctions.injectThemes(addBase, config, themes)
  themeInjector;

  optionsIncluded.push("themes[" + themeInjector.themeOrder.length + "]");

  // inject @utilities style needed by components
  if (config("twui.utils") != false) {
    addComponents(utilities, { variants: ["responsive"] })

    let toAdd = utilitiesUnstyled // shadow clone here to avoid mutate the original
    if (shouldApplyPrefix) {
      toAdd = postcssJsProcess(toAdd)
    }
    addComponents(toAdd, { variants: ["responsive"] })

    toAdd = utilitiesStyled
    if (shouldApplyPrefix) {
      toAdd = postcssJsProcess(toAdd)
    }
    addComponents(toAdd, { variants: ["responsive"] })
    optionsIncluded.push("utilities")
  }
  if (logs) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      "✔︎ Including:",
      "\x1b[0m",
      "" + optionsIncluded.join(", ")
    );
    console.log();
    console.groupEnd();
  }
};

module.exports = require("tailwindcss/plugin")(mainFunction, {
  theme: { extend: { colors } },
});
