import React, { useEffect, useState } from "react";

type InfoData = {
  user_ip: string;
};
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";

export default function UserIPInfo({ user_ip }: InfoData) {
  const [userIPData, setUserIPData] = useState({
    ip: "",
    city: "",
    country: "",
    time: "",
    isp: "",
    lat: "",
    lng: "",
  });
  useEffect(() => {
    async function getInfoIp() {
      try {
        const apiCall = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=${process.env.NEXT_PUBLIC_GEO_IPIFY_API_KEY}&ipAddress=` +
            String(user_ip)
        );
        const response = await apiCall.json();
        setUserIPData({
          ip: response.ip,
          city: response.location.city,
          country: response.location.country,
          time: response.location.timezone,
          isp: response.isp,
          lat: response.location.lat,
          lng: response.location.lng,
        });
      } catch (error) {
        console.error(error);
      }
    }

    getInfoIp();
  }, [user_ip]);

  return (
    <div className="ip_detail">
      <div className="ip_address">
        <h5>IP ADDRESS</h5>
        <h2>{userIPData.ip}</h2>
      </div>
      <div className="location">
        <h5>LOCATION</h5>
        <h2>
          {userIPData.city}, {userIPData.country}
        </h2>
      </div>
      <div className="timezone">
        <h5>TIMEZONE</h5>
        <h2>UTC {userIPData.time}</h2>
      </div>
      <div className="isp">
        <h5>ISP</h5>
        <h2>{userIPData.isp}</h2>
      </div>

      <div className="lat_lng">
        <h5>Lat, Long</h5>
        <h2>
          {userIPData.lat}, {userIPData.lng}
        </h2>
      </div>
    </div>
  );
}
