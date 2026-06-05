import { writeFileSync } from "fs";
import { DOCUMENTS } from "../lib/documents";
import { buildDocxBlob } from "../lib/render/docx";
import { CompanyData } from "../lib/types";

const company: CompanyData = {
  legalName: "Acme Technologies Private Limited",
  brandName: "Acme",
  entityType: "Private Limited Company",
  cin: "U72900KA2024PTC000000",
  industry: "Fintech",
  address: "2nd Floor, 14 MG Road",
  city: "Bengaluru",
  state: "Karnataka",
  pincode: "560001",
  email: "founder@acme.com",
  phone: "+91 98765 43210",
  website: "https://acme.com",
  signatoryName: "Riya Sharma",
  signatoryDesignation: "Director",
  headcount: "10-50",
  logoDataUrl: "",
  logoW: 0,
  logoH: 0,
  candidateName: "Arjun Mehta",
  candidateRole: "Software Engineer",
  candidateCtc: "₹12,00,000",
};

async function main() {
  let total = 0;
  for (const def of DOCUMENTS) {
    const blocks = def.build(company);
    const blob = await buildDocxBlob(def, company);
    const buf = Buffer.from(await blob.arrayBuffer());
    // .docx is a zip — first two bytes must be "PK".
    const isZip = buf[0] === 0x50 && buf[1] === 0x4b;
    if (!isZip) throw new Error(`${def.id}: not a valid docx (no PK header)`);
    total += buf.length;
    console.log(
      `✓ ${def.name.padEnd(42)} blocks=${String(blocks.length).padStart(3)}  bytes=${buf.length}`
    );
  }
  // Write one sample to inspect manually if needed.
  const sample = await buildDocxBlob(DOCUMENTS[1], company);
  writeFileSync("/tmp/hyroo-sample.docx", Buffer.from(await sample.arrayBuffer()));
  console.log(`\nAll ${DOCUMENTS.length} documents generated. Total ${total} bytes.`);
  console.log("Sample appointment letter → /tmp/hyroo-sample.docx");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
