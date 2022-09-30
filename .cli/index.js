const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
module.exports = (plop) => {
  clear();
  console.log(
    chalk.red(
      figlet.textSync("Blocks", {
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  plop.setHelper("splitCapitalize", (text) => {
    return text
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  });
  plop.setHelper("lowercase", (text) => text.toLowerCase());
  plop.setGenerator("React Tailwind Blocks CLI", {
    description: "Create a React Tailwind Blocks CLI",
    prompts: [
      {
        type: "list",
        name: "kind",
        message: "What you want to create?",
        choices: [
          {
            name: "Component",
            value: "component",
          },
        ],
      },
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
        when: (answers) => answers.kind === "component",
      },
    ],
    actions: (data) => {
      let actions = [];
      if (data.kind === "component") {
        actions.push({
          type: "add",
          path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
          templateFile: "./templates/component/component.tsx.hbs",
        });
        actions.push({
          type: "add",
          path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
          templateFile: "./templates/component/stories.tsx.hbs",
        });
        actions.push({
          type: "add",
          path: "../src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
          templateFile: "./templates/component/test.tsx.hbs",
        });
      } else {
        throw new Error("Unknown kind in", data);
      }

      return actions;
    },
  });
};
