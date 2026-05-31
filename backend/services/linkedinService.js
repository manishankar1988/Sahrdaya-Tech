import Opportunity from '../models/Opportunity.js';
import { fallbackOpportunities } from '../data/fallbackData.js';

export async function fetchLinkedInOpportunities() {
  if (!process.env.LINKEDIN_ACCESS_TOKEN) return fallbackOpportunities;

  // LinkedIn jobs data requires approved LinkedIn API access. Keep this adapter isolated
  // so the approved endpoint can be connected without changing controllers or UI code.
  return fallbackOpportunities;
}

export async function syncOpportunities() {
  const items = await fetchLinkedInOpportunities();
  await Promise.all(
    items.map((item) =>
      Opportunity.findOneAndUpdate(
        { role: item.role, company: item.company, type: item.type },
        item,
        { upsert: true, new: true },
      ),
    ),
  );
  return items;
}
