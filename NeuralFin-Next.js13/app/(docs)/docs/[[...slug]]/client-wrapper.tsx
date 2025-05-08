"use client";

// This file has been modified to work in production without contentlayer
// In development, it would use the actual Doc type and contentlayer

import { FC } from "react"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import DocPageClient from "./page.client"

// Interface for the component props
interface DocClientWrapperProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  doc?: any;
}

const DocClientWrapper: FC<DocClientWrapperProps> = ({ source, doc }) => {
  // Create a simplified doc object if none is provided
  const docData = doc || {
    title: "Documentation",
    description: "",
    frontmatter: {
      title: "Documentation",
      description: ""
    }
  };
  
  return <DocPageClient doc={docData} source={source} />;
}

export default DocClientWrapper; 