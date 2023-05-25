import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Loader from "./Loader";
import NavBar from "./navBar";

interface MenuProps {
    onToggleLanguageClick: (locale: string) => void
}

const Menu: React.FC<MenuProps> = ({ onToggleLanguageClick }) => {
    const { t } = useTranslation("common");

    return (
        <>
            {/* main header */}
            <header className="main-header">
                <div className="auto-container">
                    {/* header-lower */}
                    <div className="header-lower ">
                        <div className="outer-box clearfix">
                            <div className="menu-area clearfix">
                                {/*Mobile Navigation Toggler*/}
                                <div className="menu-right-content mobile-container clearfix pull-right">
                                    <div className="mobile-nav">
                                        <div className="nook-logo ver-desktop">
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
                                        <div className="more-btn centred ver-mobile">
                                            <div className="btn-center-container">
                                                <Link href="/booking">
                                                    <Image
                                                        src="/images/icons/sparkle.gif"
                                                        alt=""
                                                        width={40}
                                                        height={40}
                                                    />
                                                    <button className="btn-typeform-menu">
                                                        {t("book_noww")}
                                                    </button>
                                                    <Image
                                                        src="/images/icons/sparkle.gif"
                                                        alt=""
                                                        width={40}
                                                        height={40}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="location-container">
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
                                    </div>
                                </div>
                                <div className="mobile-nav-toggler">
                                    <i className="icon-bar" />
                                    <i className="icon-bar" />
                                    <i className="icon-bar" />
                                </div>
                                <nav className="main-menu navbar-expand-md navbar-light">
                                    <NavBar onToggleLanguageClick={onToggleLanguageClick} />
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* main-header end */}

            {/* Mobile Menu  */}
            <div className="mobile-menu">
                <div className="menu-backdrop" />
                <div className="close-btn">
                    <i className="fas fa-times" />
                </div>
                <nav className="menu-box">
                    <div className="menu-outer">
                        <NavBar onToggleLanguageClick={onToggleLanguageClick} />
                    </div>
                    <div className="contact-menu">
                        <div className="social-mobile-menu">
                            <div className="zalo social-item">
                                <Link href="https://zalo.me/g/aiveia597" target="_blank">
                                    <Image
                                        src="/images/icons/zalo.svg"
                                        alt=""
                                        width={25}
                                        height={24}
                                        quality={100}
                                    />
                                </Link>
                            </div>
                            <div className="facebook social-item">
                                <Link
                                    href="https://www.facebook.com/nailswithnook"
                                    target="_blank"
                                >
                                    <Image
                                        src="/images/icons/facebook.svg"
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="phone">
                            <Link target="_blank" href="tel:1900633897">
                                <Image
                                    src="/images/icons/phone.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                                <span>1900 633 897</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            {/* End Mobile Menu */}
        </>
    );
}

export default Menu