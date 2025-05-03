const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU84Rm9JMVZBdnpYR1c0SUZCK1FmTUtvMXdCSTQwVEEvcUVBaUhHRXoxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYlpPLzJJZGZ5V3B4SEMxclJWVGgxNEROTEs4S0djQWtVbFRnaGpJbjVVOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHSlpEdm1uQlBDTyt0aktER2F2R0RZRVlmWndBZFVOWHdyOGUrN2o2QUVFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFa21yekRHcytkRjg1RzAvOURvZ0M0MXFwOWJPVTdhQWtjUU5mN0ppQnlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitGUjhCRTB5ZzZBVk1XLzBuTE1TR1dHY0paUkRqT3p0TFplVmF3amVJbjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllpdjF6U1h2NEl6V0dQK2FIOFNNVERIR0kyMnZlQmE2QzVJOFJsdlBrR1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUgzU3JkUzlhM1ZWemJBZ3VhaHZld1Y3YzZ2czZWeXpoOE1vUVBoQmxYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVBJOUlPVjVCc0NYTmVtRE54L3BLM3I3dFcyMStwRlFRcWttcnphZGVDTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlyaWo4bSszWWNPYjRSUVRKcE9qeWRpbEdnbFlNZlI3KzRZYTk1YTFxaTNxZ1RISkZTNHhYaUJEMTdRdVl3K0tFV2kwa00ydTNqblAybjVTMGRVZ2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzQsImFkdlNlY3JldEtleSI6IjhQQ3NpVUR4UzY4aFd1QVBiM0dnVTBDZG9QczZpQ3NiSGxGd3AzT1NyVkE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3Njg1MDY1MjhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRkZFRDUwMkRGRUE0NDEyRUM1OEY1NjIwNTVGRkMzNzgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NjI5MzQ0NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiRlFEVktZSkUiLCJtZSI6eyJpZCI6Ijk0NzY4NTA2NTI4OjdAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMzMyNTIwMTQ3MTQ5OTY6N0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ00vNmlKb0ZFTFNsMmNBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlRyZnlLTUNmV251NTZWZHJrL0hDVCs0RytYdzJPcHFIZjlxTUhLRGVOeTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZjR1ZjK0ZVL3lLcC9KcllranFHSVRFRTFYdlgxV2JsT0ZBMWxYaFNDWVUxUEx5UnZSeUlRbnVNL0J4alloWkJtS1AycUlDeUN0eEIvdk9mZkE0bUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJhS0ltRzlZUGNDM3oxcmVYeWpFb3A1M3Z3MWxaWEplRUprMVVFdDRRNEUrWTcrQW4zeGVpNGpVc09tK3JkVWJ2aWVZRXl2MmhubFl1M2lsbkRUUm9qQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzY4NTA2NTI4OjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVTYzOGlqQW4xcDd1ZWxYYTVQeHdrL3VCdmw4TmpxYWgzL2FqQnlnM2pjdCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2MjkzNDQyLCJsYXN0UHJvcEhhc2giOiIyVjc3cVUifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
