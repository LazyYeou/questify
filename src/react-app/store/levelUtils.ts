/**
 * Leveling formula constants
 */
export const BASE_XP = 10;
export const XP_MULTIPLIER = 1.3;

/**
 * Calculates level data from total experience.
 * Formula: 
 * Level 1 -> 2: 10 XP
 * Level 2 -> 3: 13 XP (10 * 1.3)
 * Level 3 -> 4: 17 XP (13 * 1.3)
 */
export function getLevelData(totalExp: number) {
  let level = 1;
  let nextLevelReq = BASE_XP;
  
  // Track how much XP we've "spent" on previous levels
  let cumulativeXp = 0;

  while (totalExp >= cumulativeXp + nextLevelReq) {
    cumulativeXp += nextLevelReq;
    level++;
    nextLevelReq = Math.floor(BASE_XP * Math.pow(XP_MULTIPLIER, level - 1));
  }

  const xpInCurrentLevel = totalExp - cumulativeXp;
  const progressPercent = (xpInCurrentLevel / nextLevelReq) * 100;

  return {
    level,
    xpInCurrentLevel,
    nextLevelReq,
    progressPercent,
    totalExp
  };
}
