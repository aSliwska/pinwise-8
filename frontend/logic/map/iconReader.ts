"use server";

import fs from 'fs';

export async function getIconFileList(): Promise<Set<string>> {
  const files = await fs.promises.readdir("public/service_icons", {recursive: true});
  return new Set([...files.filter((file) => file.indexOf("/") > -1).map((file) => file.split(".")[0])]);
}