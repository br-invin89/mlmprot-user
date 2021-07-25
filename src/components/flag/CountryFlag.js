import ReactCountryFlag from "react-country-flag"

export default ({ countryCode }) => {
  return (
    <ReactCountryFlag countryCode={countryCode} svg size={150} style={{fontSize: '1.8em' }} />
  )
}