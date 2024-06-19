"use server";

import fs from 'fs';

export async function getIconFileList(): Promise<Set<string>> {
  const files = await fs.promises.readdir("public/service_icons", {recursive: true});
  let filepath = [];
  for (const file of files) {
    const normalizedPath = file.replace(/\\/g, '/');
    filepath.push(normalizedPath);}
  const filteredFiles = filepath.filter((file) => file.indexOf("/") > -1);
  const fileNamesWithoutExtension = filteredFiles.map((file) => file.split(".")[0]);
  return new Set([...files.filter((file) => file.indexOf("/") > -1).map((file) => file.split(".")[0])]);
}