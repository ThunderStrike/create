# Vite+ organization template picker scaffold

This package is the Vite+ organization template picker package.

This copy is configured for the `@thunderstrikeco` npm scope, so users will run:

```bash
vp create @thunderstrikeco
```

Vite+ maps that command to this package:

```text
@thunderstrikeco/create
```

Vite+ then reads `createConfig.templates` from this package's `package.json`.

## Testing the templates

First run:

```bash
pnpm start:registry
```

Then, in a separate terminal: 
```bash
pnpm registry:add-user  
# Username: test
# Password: test
# Email: test@test.co
```

Then create a `.npmrc` file in the root of this package with the following content:

```ini
@thunderstrikeco:registry=http://localhost:4873/
//registry.example.com/:_authToken=${NPM_TOKEN}
```

Then, in a separate terminal, run:
```bash
pnpm publish:local
```

From here you can now verify the templates are working by running:

```bash
pnpm verify:tanstack-start-solid
```

## What to edit first

Open `package.json` and update:

- each external `@thunderstrikeco/...` template package to point to the real template packages you publish
- each `name`, `description`, and `template` entry under `createConfig.templates`

The `name` field is what users type after the colon:

```bash
vp create @thunderstrikeco:web-react
```

That selects the manifest entry whose name is `web-react`.

## Recommended shape for several web templates

Do this:

```json
{
  "name": "web-react",
  "description": "React web app template",
  "template": "@thunderstrikeco/template-web-react"
}
```

and add one entry per selectable template.

Avoid assuming Vite+ will discover nested templates inside one package like `@thunderstrikeco/templates-web`. The organization picker reads the entries listed directly in `@thunderstrikeco/create`'s `createConfig.templates` manifest.

## Bundled templates

The `demo` and `monorepo` entries point at folders inside this package:

```json
{
  "name": "demo",
  "description": "Bundled demo template included in this package",
  "template": "./templates/demo"
}
```

Relative paths such as `./templates/demo` are resolved relative to the root of this package, not relative to the user's current directory.

## External package templates

Entries like this point to separate npm packages:

```json
{
  "name": "web-react",
  "description": "React web app template",
  "template": "@thunderstrikeco/template-web-react"
}
```

Here, this package contains the picker, while `@thunderstrikeco/template-web-react` contains the actual template files.

## Private registry example

If your packages live in a private npm registry, configure npm with a project or user `.npmrc` file. For example:

```ini
@thunderstrikeco:registry=https://registry.example.com
//registry.example.com/:_authToken=${NPM_TOKEN}
```

## Verify

Before publishing, from this package folder:

```bash
npm pack --dry-run
```

After publishing:

```bash
vp create @thunderstrikeco --no-interactive
vp create @thunderstrikeco:web-react --no-interactive
vp create @thunderstrikeco
```

The first command should print the available template table. The second should scaffold a specific template without prompts. The third should open the interactive picker.

## Optional repo default

To make `vp create` open your organization picker by default in a repo, copy `examples/vite.config.ts` into that repo. It is already configured with `@thunderstrikeco`.
