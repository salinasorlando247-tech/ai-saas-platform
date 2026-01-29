import { useState } from "react"

export default function BrandSwitcher(){
  const [brand,setBrand] = useState("Default")
  const brands = ["Default","Brand A","Brand B","Brand C"]
  return (
    <div>
      <label style={{ marginRight:"1rem" }}>Switch Brand:</label>
      <select value={brand} onChange={e=>setBrand(e.target.value)}>
        {brands.map(b=><option key={b} value={b}>{b}</option>)}
      </select>
    </div>
  )
}
