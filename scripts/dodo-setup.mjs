// One-time setup: creates the ₹499 "Founder Starter Kit" product in Dodo Payments
// and prints the product id to paste into .env.local.
//
//   npm run dodo:setup
//
// Reads DODO_PAYMENTS_API_KEY and DODO_MODE from the environment or .env.local.

import fs from "node:fs";

function loadEnvLocal() {
  const env = {};
  try {
    const text = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m) env[m[1]] = m[2];
    }
  } catch {
    /* no .env.local */
  }
  return env;
}

const fileEnv = loadEnvLocal();
const key = process.env.DODO_PAYMENTS_API_KEY || fileEnv.DODO_PAYMENTS_API_KEY;
const mode = process.env.DODO_MODE || fileEnv.DODO_MODE || "test";

if (!key) {
  console.error("✗ Set DODO_PAYMENTS_API_KEY in .env.local first.");
  process.exit(1);
}

const base = mode === "live" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";

const body = {
  name: "Hyroo — Founder Starter Kit (12 documents)",
  description: "Editable, India-ready HR & legal document kit, customised to your company.",
  tax_category: "digital_products",
  price: {
    type: "one_time_price",
    currency: "INR",
    price: 49900, // ₹499 in paise
    discount: 0,
    purchasing_power_parity: false,
    tax_inclusive: true,
  },
};

console.log(`Creating product in ${mode} mode at ${base} …`);

const res = await fetch(`${base}/products`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
  body: JSON.stringify(body),
});

const text = await res.text();
if (!res.ok) {
  console.error(`✗ Failed (${res.status}):`, text);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(text);
} catch {
  console.error("✗ Unexpected response:", text);
  process.exit(1);
}

const productId = data.product_id || data.id;
console.log("\n✓ Product created.");
console.log("\nAdd these to .env.local, then restart the dev server:\n");
console.log(`  DODO_PRODUCT_ID=${productId}`);
console.log(`  NEXT_PUBLIC_DODO_ENABLED=1\n`);
