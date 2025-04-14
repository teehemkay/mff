# MFF

## GitHub Content Update Workflow

### Excel files upload

1. Go to https://github.com/teehemkay/mff/
2. [Switch](docs/workflow.png) to the appropriate *release* branche (e.g release/v1). N.B. the worflow only works from a *release* branch.
3. [Click](docs/workflow.png) on the `_imports` link to enter that folder. N.B. the worflow only works within the `_imports` folder.
4. [Click](docs/_imports.png) on the 'Add file' button in the upper right corner and select the 'Upload files' options
5. [Select](file-upload.png) the Excel files to upload
6. [Add](file-upload.png) a commit message and a description. 
7. [Select](file-upload.png) the 'commit directly to the release/xxx branch' (should be selected by default)
8. [Click](file-upload.png) the "Commit" button
9. [Click](docs/workflow.png) on the commits link, the workflow has successfully completed when a green checkmark appears next to "Update content MOREIRA VERISSIMO Joao Filipe [via GitHub Action]..." commit.
10. The logs of all the workflow runs can be consulted by clicking on the 'Actions' button of the top toolbar. A green checkmark denotes a success and a red cross failure [see](docs/actions.png).
11. Open https://staging-mff.livepreview.website/en/ to see the generated website
12. A ZIP archive of the site is available at https://staging-mff.livepreview.website/site.zip

### Images upload

1. Go to https://github.com/teehemkay/mff/
2. Switch to the appropriate *release* branche (e.g release/v1).
3. Click on the `public/assets/img` link to enter that folder.
4. Click on the '+' icon and select the `Upload files` options
5. Select the image(s) to upload
6. Add a commit message and a description. 
7. Select the `commit directly to the release/xxx branch` (should be selected by default)
8. Click the "Commit" button

The images will automatically be optimized next time the site is built.

### PDFs upload

1. Go to https://github.com/teehemkay/mff/
2. Switch to the appropriate *release* branche (e.g release/v1).
3. Navigate to the `public/assets/pdf/` folder.
4. Click on the '+' icon and select the `Upload files` options
5. Select the PDF file(s) to upload
6. Add a commit message and a description. 
7. Select the `commit directly to the release/xxx branch` (should be selected by default)
8. Click the "Commit" button

## Development Setup

### Install pnpm

If pnpm is not yet installed in your computer do the following:

```
npm i -g pnpm
pnpm install
```

**DO NOT EVER USE NPM AGAIN**

### Prototype-Only development

```
cd apps/prototypes
pnpm dev
```

Open http://localhost:8080/

## Run in development mode (including prototypes)

*All* assets changes (tailwind, scss, js, img) *MUST* be done in the prototypes package, and they'll be automatically picked up by the site dev server.
Thus you *MUST* first run the prototypes dev server.

```
cd packages/prototypes
pnpm dev

```

```
cd packages/site
pnpm dev
```

Prototypes:
http://localhost:8080/

Site:
http://localhost:4321/

## Development preview

A preview of the develop branch is generated for each push to github.
The preview URL is

https://dev-mff.livepreview.website/

## Generate production build

1. Run the following command:

```sh
pnpm -w site
```

2. The static version of the site will be generated in `_site` folder and a compressed archive of the site can be found in `_site/site.zip`
3. Check the production build by running the command below

```sh
pnpm -w preview
```

## Batch imports of XLS data file

1. Put the `XLSX` files in the  `_imports` folder.
2. Run the following command:

```sh
pnpm -w data
```

3. With the exception of `languages.yml`, all the files and folders in the `lib/data/repository` folder will be regenerated.

