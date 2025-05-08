"use client";

// This file has been modified to work in production without contentlayer
// In development, it would use the actual Doc type and contentlayer

import { FC } from "react"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import MDXContent from "@/components/docsComponents/mdx-content"

// Interface for the component props
interface DocClientWrapperProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}

const DocClientWrapper: FC<DocClientWrapperProps> = ({ source }) => {
  return <MDXContent source={source} />;
}

export default DocClientWrapper; 