import fs from 'fs';
import path from 'path';
import * as core from '@actions/core';
import * as proc from 'process';
import { downloadSpatialCli, getDownloadUrl, getSpatialOauthConfigDir } from './spatial';

async function run() {
  const version = core.getInput("version");
  const url = getDownloadUrl(version);

  const homeDir = proc.env['HOME'] || "~/";
  const destDir = path.join(homeDir, ".spatial");
  fs.mkdirSync(destDir, {recursive: true});

  await downloadSpatialCli(url, destDir);
  core.addPath(destDir);

  // Setup configuration
  const configDir = getSpatialOauthConfigDir();
  fs.mkdirSync(configDir, { recursive: true });

  const oauthTokenFile = path.join(configDir, "oauth2_refresh_token");
  const oauthToken = core.getInput("refresh_token");
  fs.writeFileSync(oauthTokenFile, oauthToken);
}

async function main() {
  try {
      await run();
  } catch (error) {
      core.setFailed(error.message);
  }
}

main();
