






export default function getCoordsDistance(distance,coords){

  // const distance = 70000
  const R = 6378000 // metters
  const C = Math.PI*R*2
  const lat = coords[0]
  const long = coords[1]
  const rFraction = Math.cos(lat*(Math.PI/180))
  const lat1 = 111320 // 1.111 metter // 1000*1.111 = distance in lat meaning 1km...
  const long1 =  (C/360)*rFraction// ? metter
  const latDis = [lat-(distance/lat1),lat+(distance/lat1)]
  const longDis = [long-(distance/long1),long+(distance/long1)]
  return {latDis:latDis[0]?latDis:[-90,90],longDis:longDis[0]?longDis:[-180,180]}
}