// utils/sanitizePrompt.ts
export function sanitizePrompt(original: string): string {
  if (!original || typeof original !== "string") return original;

  let prompt = original;

  // Blocked keywords (celebrity names etc.)
  const bannedNames = [
    // Soccer
    "messi", "ronaldo", "neymar", "beckham", "pele", "maradona",
    // Basketball
    "lebron", "kobe", "jordan", "curry", "shaq",
    // Tennis
    "serena williams", "venus williams", "federer", "nadal", "djokovic",
    // Other
    "tiger woods", "michael phelps", "usain bolt", "tom brady"
  ];

  for (const name of bannedNames) {
    const re = new RegExp(`\\b${name}\\b`, "ig");
    prompt = prompt.replace(re, "a famous athlete");
  }
  
  // Blocked team names
  const bannedTeams = [
    // Soccer
    "real madrid", "barcelona", "manchester united", "liverpool", "psg", "bayern munich",
    // Basketball
    "lakers", "warriors", "bulls", "celtics", "nets",
    // American Football
    "patriots", "cowboys", "packers"
  ];

  for (const team of bannedTeams) {
    const re = new RegExp(`\\b${team}\\b`, "ig");
    prompt = prompt.replace(re, "a professional sports team");
  }

  // Replace sensitive event names
  prompt = prompt.replace(/fifa world cup/gi, "a major championship");
  prompt = prompt.replace(/world cup/gi, "a championship final");
  prompt = prompt.replace(/champions league/gi, "a championship match");
  prompt = prompt.replace(/super bowl/gi, "the grand final game");
  prompt = prompt.replace(/olympics/gi, "the international games");

  // Add style for safety and consistency
  if (!/realistic|photorealistic|high[- ]resolution|cinematic|dynamic/i.test(prompt)) {
    prompt = `${prompt.trim()}, dynamic action shot, photorealistic, cinematic lighting, high detail, high-resolution`;
  }

  return prompt;
}
