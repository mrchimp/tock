import esbuild from "esbuild";

// console.log("Building includable file...");

// esbuild
//   .build({
//     bundle: true,
//     entryPoints: ["src/wrapper.ts"],
//     // minify: true,
//     platform: "browser",
//     outfile: "dist/tock.min.js",
//     target: ["es2020"],
//   })
//   .catch(() => process.exit(1));

console.log("Building IIFE module...");

esbuild
  .build({
    entryPoints: ["src/tock.ts"],
    format: "iife",
    // minify: true,
    outfile: "dist/tock.iife.min.js",
    target: ["esnext"],
  })
  .catch(() => process.exit(1));

console.log("Building ESM module...");

esbuild
  .build({
    entryPoints: ["src/tock.ts"],
    format: "esm",
    // minify: true,
    outfile: "dist/tock.esm.min.js",
    target: ["esnext"],
  })
  .catch(() => process.exit(1));

console.log("Building CommonJS module...");

esbuild
  .build({
    entryPoints: ["src/tock.ts"],
    format: "cjs",
    // minify: true,
    outfile: "dist/tock.commonjs.min.js",
    target: ["esnext"],
  })
  .catch(() => process.exit(1));

console.log("Building demo file...");

esbuild
  .build({
    bundle: true,
    entryPoints: ["src/demo.ts"],
    format: "iife",
    // minify: true,
    outfile: "dist/demo.min.js",
    target: ["esnext"],
  })
  .catch(() => process.exit(1));
