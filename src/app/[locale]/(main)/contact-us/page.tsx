import LayoutOtherPagesComponent from "@/components/layout-other-pages/LayoutOtherPages.component";
import ContactForm from "./contactForm/ContactForm";
import { useTranslations } from "next-intl";
import contactUsImage from "@/assets/images/contact-us/image-7@3x.jpg";
import { AiOutlinePhone } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./contact-us.module.css";

export default function Page() {
  const t = useTranslations();

  return (
    <div className={styles["contact-us"]}>
      <LayoutOtherPagesComponent image={contactUsImage} title={t("contact-us.title")}>
        <div className={styles.contactUsDescription}>
          <ul>
            <li className={styles["title-desc"]}>
              <span className={styles.title}>
                <AiOutlinePhone size={24} className="me-1 text-primary" />
                {t("contact-us.tellphoneTitle")}
              </span>
              <span className={styles.desc}>02177415954</span>
            </li>
            <li className={styles["title-desc"]}>
              <span className={styles.title}>
                <HiOutlineMail size={24} className="me-1 text-primary" />
                {t("contact-us.emailTitle")}
              </span>
              <span className={styles.desc}>contactus.gashtook@gmail.com</span>
            </li>
            <li className={styles["title-desc"]}>
              <span className={styles.title}>
                <MdOutlineLocationOn size={24} className="me-1 text-primary" />
                {t("contact-us.addressTitle")}
              </span>
              <span className={styles.desc}>{t("contact-us.exactAddress")}</span>
            </li>
          </ul>
          <div className={styles.form}>
            <ContactForm />
          </div>
        </div>
      </LayoutOtherPagesComponent>
    </div>
  );
}
