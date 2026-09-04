import test from "node:test";
import assert from "node:assert/strict";
import { calculateSoftenerIndex, constants } from "../src/softenerIndex.js";

test("computes sizing for a typical hard-water household", () => {
  const result = calculateSoftenerIndex({ hardness: 12, people: 4 });

  assert.equal(result.hardnessGpg, 12);
  assert.equal(result.effectiveHardnessGpg, 12);
  assert.equal(result.classification, "Very hard");
  assert.equal(result.dailyUsageGallons, 300);
  assert.equal(result.dailyGrains, 3600);
  assert.equal(result.requiredCapacityGrains, 25200);
  assert.equal(result.recommendedCapacityGrains, 32000);
  assert.equal(result.softenerIndex, 60);
});

test("converts ppm to grains per gallon", () => {
  const result = calculateSoftenerIndex({
    hardness: constants.PPM_PER_GRAIN * 10,
    hardnessUnit: "ppm",
    people: 2,
  });

  assert.equal(result.hardnessGpg, 10);
});

test("iron increases effective hardness", () => {
  const withoutIron = calculateSoftenerIndex({ hardness: 5, people: 3 });
  const withIron = calculateSoftenerIndex({ hardness: 5, people: 3, ironPpm: 2 });

  assert.ok(withIron.effectiveHardnessGpg > withoutIron.effectiveHardnessGpg);
  assert.equal(
    withIron.effectiveHardnessGpg,
    5 + 2 * constants.IRON_HARDNESS_EQUIVALENT_GPG,
  );
});

test("index is clamped to 0-100", () => {
  const extreme = calculateSoftenerIndex({ hardness: 500, people: 6 });
  assert.equal(extreme.softenerIndex, 100);

  const soft = calculateSoftenerIndex({ hardness: 0.5, people: 1 });
  assert.equal(soft.classification, "Soft");
  assert.ok(soft.softenerIndex >= 0);
});

test("rejects invalid input", () => {
  assert.throws(() => calculateSoftenerIndex({ hardness: -1, people: 4 }));
  assert.throws(() => calculateSoftenerIndex({ hardness: 10, people: 0 }));
  assert.throws(() =>
    calculateSoftenerIndex({ hardness: 10, people: 4, hardnessUnit: "bogus" }),
  );
});
