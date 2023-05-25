import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface NavBarProps {
    onToggleLanguageClick: (locale: string) => void,
}

const NavBar: React.FC<NavBarProps> = ({ onToggleLanguageClick }) => {
    const { t } = useTranslation("common");

    return (
        <>
            <div className=" nook-logo">
                <Link className="logo-web" href="/">
                    <Image
                        src="/images/logo.svg"
                        alt=""
                        width={226}
                        height={32}
                        priority={true}
                        quality={100}
                    />
                </Link>
                <Link className="logo-mobile" href="/">
                    <Image
                        src="/images/logo.svg"
                        alt=""
                        width={172}
                        height={24}
                        priority={true}
                        quality={100}
                    />
                </Link>
            </div>
            <div
                className="collapse navbar-collapse show clearfix"
                id="navbarSupportedContent"
            >
                <ul className="navigation clearfix">
                    <li className="current dropdown">
                        <Link href="#experience-section">
                            {t("experience")}
                        </Link>
                    </li>
                    <li className="dropdown">
                        <Link href="#gallery-section">{t("menu")}</Link>
                    </li>
                    <li className="dropdown">
                        <Link
                            data-en="LOOK BOOK"
                            data-vn="XEM MẪU"
                            href="#gallery-section"
                        >
                            {t("lookbook")}
                        </Link>
                    </li>
                    <li className="dropdown">
                        <Link
                            data-en="BLOG"
                            data-vn="BLOG"
                            href="https://blog.workwithnook.com"
                            target="_blank"
                        >
                            BLOG
                        </Link>
                    </li>
                    <li className="location-container">
                        <div className="location">
                            <span
                                className="switchlang"
                                data-lang="vn"
                                onClick={() => onToggleLanguageClick("vi")}
                            >
                                VN
                            </span>
                            <span
                                className="switchlang"
                                data-lang="en"
                                onClick={() => onToggleLanguageClick("en")}
                            >
                                EN
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavBar