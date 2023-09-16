import { readdirSync, copyFileSync, unlinkSync } from 'fs';

const baseDirectory = './prisma/migrations/';

// get the last directory created
const lastDirectory = (source) =>
  readdirSync(source, {
    withFileTypes: true,
  })
    .reduce((a, c) => {
      c.isDirectory() && a.push(c.name);
      return a;
    }, [])
    .slice(-1)[0];

// copy the down script from prisma to the last directory created
copyFileSync(
  baseDirectory + 'down.sql',
  baseDirectory + lastDirectory(baseDirectory) + '/down.sql',
);

// delete the down script from the root folder
unlinkSync(baseDirectory + 'down.sql');
