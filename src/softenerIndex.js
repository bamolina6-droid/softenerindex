const PPM_PER_GRAIN = 17.1;

const DEFAULT_GALLONS_PER_PERSON_PER_DAY = 75;

const IRON_HARDNESS_EQUIVALENT_GPG = 5;

const STANDARD_CAPACITIES_GRAINS = [24000, 32000, 40000, 48000, 64000, 80000, 96000];

const SALT_PER_1000_GRAINS_LBS = 0.5;

function classifyHardness(hardnessGpg) {
  if (hardnessGpg < 1) return "Soft";
  if (hardnessGpg < 3.5) return "Slightly hard";
  if (hardnessGpg < 7) return "Moderately hard";
  if (hardnessGpg < 10.5) return "Hard";
  return "Very hard";
}

function toGrainsPerGallon({ hardness, hardnessUnit }) {
  if (hardnessUnit === "ppm") {
    return hardness / PPM_PER_GRAIN;
  }
  return hardness;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Compute water-softener sizing recommendations and a normalized hardness index.
 *
 * @param {object} input
 * @param {number} input.hardness - Water hardness value.
 * @param {"gpg"|"ppm"} [input.hardnessUnit="gpg"] - Unit of the hardness value.
 * @param {number} input.people - Number of people in the household.
 * @param {number} [input.gallonsPerPersonPerDay=75] - Daily water usage per person.
 * @param {number} [input.ironPpm=0] - Dissolved iron in ppm (adds to effective hardness).
 * @param {number} [input.regenerationDays=7] - Target days between regenerations.
 */
export function calculateSoftenerIndex(input) {
  const {
    hardness,
    hardnessUnit = "gpg",
    people,
    gallonsPerPersonPerDay = DEFAULT_GALLONS_PER_PERSON_PER_DAY,
    ironPpm = 0,
    regenerationDays = 7,
  } = input;

  if (!Number.isFinite(hardness) || hardness < 0) {
    throw new Error("hardness must be a non-negative number");
  }
  if (!Number.isFinite(people) || people <= 0) {
    throw new Error("people must be a positive number");
  }
  if (hardnessUnit !== "gpg" && hardnessUnit !== "ppm") {
    throw new Error('hardnessUnit must be "gpg" or "ppm"');
  }
  if (!Number.isFinite(ironPpm) || ironPpm < 0) {
    throw new Error("ironPpm must be a non-negative number");
  }
  if (!Number.isFinite(regenerationDays) || regenerationDays <= 0) {
    throw new Error("regenerationDays must be a positive number");
  }

  const baseHardnessGpg = toGrainsPerGallon({ hardness, hardnessUnit });
  const effectiveHardnessGpg = baseHardnessGpg + ironPpm * IRON_HARDNESS_EQUIVALENT_GPG;

  const dailyUsageGallons = people * gallonsPerPersonPerDay;
  const dailyGrains = Math.round(effectiveHardnessGpg * dailyUsageGallons);
  const requiredCapacityGrains = dailyGrains * regenerationDays;

  const recommendedCapacityGrains =
    STANDARD_CAPACITIES_GRAINS.find((size) => size >= requiredCapacityGrains) ??
    STANDARD_CAPACITIES_GRAINS[STANDARD_CAPACITIES_GRAINS.length - 1];

  const actualRegenerationDays =
    dailyGrains > 0 ? Math.floor(recommendedCapacityGrains / dailyGrains) : Infinity;

  const estimatedSaltPerRegenLbs =
    Math.round((recommendedCapacityGrains / 1000) * SALT_PER_1000_GRAINS_LBS * 10) / 10;

  const index = clamp(Math.round((effectiveHardnessGpg / 20) * 100), 0, 100);

  return {
    hardnessGpg: Math.round(baseHardnessGpg * 100) / 100,
    effectiveHardnessGpg: Math.round(effectiveHardnessGpg * 100) / 100,
    classification: classifyHardness(effectiveHardnessGpg),
    dailyUsageGallons,
    dailyGrains,
    requiredCapacityGrains,
    recommendedCapacityGrains,
    regenerationFrequencyDays: Number.isFinite(actualRegenerationDays)
      ? actualRegenerationDays
      : null,
    estimatedSaltPerRegenLbs,
    softenerIndex: index,
  };
}

export const constants = {
  PPM_PER_GRAIN,
  DEFAULT_GALLONS_PER_PERSON_PER_DAY,
  IRON_HARDNESS_EQUIVALENT_GPG,
  STANDARD_CAPACITIES_GRAINS,
};
