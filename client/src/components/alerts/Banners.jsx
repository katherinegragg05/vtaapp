import { useState } from "react";
import BannerAlert from "./BannerAlert";

function Banners({ type, message }) {
  const [banner, setBannerOpen] = useState(true);
  return (
    <BannerAlert type={type} open={banner} setOpen={setBannerOpen}>
      {message || "Error"}
    </BannerAlert>
  );
}

export default Banners;
