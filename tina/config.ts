import { Form, TinaCMS, defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD ?? process.env.VERCEL_GIT_COMMIT_REF ?? "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Get this from tina.io
  token: process.env.NEXT_PUBLIC_TINA_TOKEN, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "about",
        label: "About",
        path: "content/about",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        ui: {
          beforeSubmit: async ({
            form,
            cms,
            values,
          }: {
            form: Form;
            cms: TinaCMS;
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            values: Record<string, any>;
            // eslint-disable-next-line @typescript-eslint/require-await
          }) => {
            if (form.crudType === "create") {
              return {
                ...values,
                createdAt: new Date().toISOString(),
              };
            }
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "datetime",
            name: "createdAt",
            label: "Created at (no need to touch)",
            required: true,
          },
        ],
        //ui: {
        // This is an DEMO router. You can remove this to fit your site
        //  router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        // },
      },
    ],
  },
});
