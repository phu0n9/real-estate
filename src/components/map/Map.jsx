import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import './map.css'
import { useEnv } from '../../context/env.context'

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" style={{ width: '5rem' }} />
    <p className="pin-text">{text}</p>
  </div>
)

export default function Map({ location, zoomLevel }) {
  const { api_key } = useEnv()

  return (
    <div className="map">

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: api_key }}
        center={location}
        defaultZoom={zoomLevel}
        options={{ scrollwheel: false}}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div>
  )
}
