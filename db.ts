export const kv = await Deno.openKv();

export async function incrementCounter(key: string[]) {
  const result = await kv.get<bigint>(key);
  const newValue = (result.value || 0n) + 1n;
  await kv.set(key, newValue);
  return newValue;
}

export async function initializeCounters() {
  const taskRuns = await kv.get<bigint>(["task_runs"]);
  const successRuns = await kv.get<bigint>(["success"]);
  const transaction = kv.atomic();

  if (!taskRuns.value) {
    transaction.set(["task_runs"], 0n, { ifNotExists: true });
  }
  if (!successRuns.value) {
    transaction.set(["success"], 0n, { ifNotExists: true });
  }

  await transaction.commit();
}