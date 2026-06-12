import JSZip from "jszip";
import { saveAs } from "file-saver";
import { CompanyData, DocumentDef } from "../types";
import { buildDocxBlob, slugFilename } from "./docx";
import { DISCLAIMER } from "../templates/shared";

export async function downloadOne(def: DocumentDef, company: CompanyData) {
  const blob = await buildDocxBlob(def, company);
  saveAs(blob, slugFilename(def, company));
}

export async function downloadBundle(defs: DocumentDef[], company: CompanyData) {
  const zip = new JSZip();
  const folderName = (company.brandName || company.legalName || "Hyroo")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "");
  const folder = zip.folder(`${folderName}-document-kit`) ?? zip;

  for (const def of defs) {
    const blob = await buildDocxBlob(def, company);
    folder.file(slugFilename(def, company), blob);
  }

  folder.file("README.txt", readme(defs, company));

  const out = await zip.generateAsync({ type: "blob" });
  saveAs(out, `${folderName}-document-kit.zip`);
}

function readme(defs: DocumentDef[], c: CompanyData): string {
  const lines = [
    `${(c.brandName || c.legalName || "Your company")} - Document Kit by Hyroo`,
    `Generated on ${new Date().toLocaleString("en-IN")}`,
    "",
    "This kit contains the following editable Word (.docx) documents:",
    "",
    ...defs.map((d, i) => `  ${i + 1}. ${d.name}  →  ${d.id}.docx`),
    "",
    "HOW TO USE",
    "  1. Open each document in Microsoft Word, Google Docs or any editor.",
    "  2. Replace anything in [square brackets] with your specific details.",
    "  3. Have key contracts reviewed by an advocate and execute on appropriate",
    "     stamp paper / e-stamp before relying on them.",
    "",
    "DISCLAIMER",
    "  " + DISCLAIMER,
    "",
    "Made with Hyroo, HR & legal paperwork for Indian startups.",
  ];
  return lines.join("\n");
}
