export const SITE = {
  name: "IW4x",
  url: "https://iw4x.io",
} as const;

export const LINKS = {
  download: "https://docs.iw4x.io/get-started/quickstart/",
  docs: "https://docs.iw4x.io/",
  discord: "https://discord.com/invite/pV2qJscTXf",
  github: "https://github.com/iw4x",
  releases: "https://github.com/iw4x/iw4x-client/releases",
} as const;

export type LinkName = keyof typeof LINKS;
