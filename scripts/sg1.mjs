import fs from "node:fs";
import { rowsToBusinesses, getPlace, toWhatsApp } from "./sg-lib.mjs";
const row = JSON.parse(fs.readFileSync("/home/user/work/row.json","utf8"));
const [b] = rowsToBusinesses([row]);
const pl = await getPlace(b);
const phone = b.phone || (pl && pl.place && pl.place.internationalPhoneNumber) || "";
let wa = null; try { wa = phone ? toWhatsApp(phone) : null; } catch (e) {}
fs.writeFileSync("/home/user/work/biz.json", JSON.stringify({ b, place: (pl && pl.place) || null, matched: Boolean(pl && pl.matched) }));
console.log(JSON.stringify({ slug: b.slug, name: b.name, city: b.city, matched: Boolean(pl && pl.matched), photos: ((pl && pl.place && pl.place.photos) || []).length, phone, wa }));
