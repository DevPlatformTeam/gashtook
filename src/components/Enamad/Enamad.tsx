import React from "react";
// import styles from "./EnamadSeal.module.css";

// import Link from "next/link";
// import Image from "next/image";

const EnamadSeal = () => {
    const enamadCode=`<img class="cursor-pointer" src="https://parspng.com/wp-content/uploads/2023/01/ENAMADpng.parspng.com_.png" width="120" height="auto"
onclick="window.open(&quot;https://trustseal.enamad.ir/?id=133782&Code=wV145IAJunvJ3gIcRA04&quot;, &quot;Popup&quot;,&quot;toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30&quot;)"
alt="enamad">`
 
  return (
    <div dangerouslySetInnerHTML={{ __html: enamadCode }} />
    // <Link
    //   referrerPolicy="origin"
    //   target="_blank"
    //   href="https://trustseal.enamad.ir/?id=133782&Code=wV145IAJunvJ3gIcRA04"
    // >
        
    //   <Image
    //     referrerPolicy="origin"
    //     src="https://trustseal.enamad.ir/logo.aspx?id=133782&Code=wV145IAJunvJ3gIcRA04"
    //     alt="e-namad"
    //     className={styles.enamadLogo}
    //     style={{ cursor: "pointer" }}
    //     loading="lazy"
    //     // code="wV145IAJunvJ3gIcRA04"
    //   />
    // </Link>
  );
};

export default EnamadSeal;
