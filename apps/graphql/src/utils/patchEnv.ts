/**
 * Patch the environment variables (un-escape "quoted" variables, remove double \\n escapes).
 * @param {Record<string, string | undefined>} env The original process.env-like object. This will be modified **in-place**.
 * @return {Record<string, string | undefined>} The patch environment.
 */
export default function patchEnv(
  env: Record<string, string | undefined>,
): Record<string, string | undefined> {
  for (const [key, raw] of Object.entries(env)) {
    if (!raw) continue;

    let parsed = raw;
    const isQuoted = raw.match(/"(.*)"$/);

    if (isQuoted) {
      parsed = isQuoted[1];
    }

    parsed = parsed.replaceAll('\\n', '\n');
    env[key] = parsed;
  }

  return env;
}
