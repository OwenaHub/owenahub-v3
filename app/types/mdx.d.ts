declare module "*.mdx" {
    import { ComponentType } from "react";

    export const meta: {
        title: string;
        slug: string;
        excerpt: string;
        image?: string;
    };

    const MDXComponent: ComponentType;
    export default MDXComponent;
}
