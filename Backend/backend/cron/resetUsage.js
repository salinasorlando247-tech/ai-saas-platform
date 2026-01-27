import fs from "fs"

export function resetUsage(){

  fs.writeFileSync("./usage.json", JSON.stringify({},null,2))

  console.log("Monthly usage reset")
}
