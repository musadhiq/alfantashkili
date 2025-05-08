import FacebookIcon from "../../assets/social/facebook.svg";
import InstagramIcon from "../../assets/social/instagram.svg";
import TwitterIcon from "../../assets/social/x.svg";
import GoogleTranslate from "./GoogleTranslate";

const TopSocialBar = () => {
    return (
        <div className="w-full bg-zinc-900 text-white text-sm">
            <div className="max-w-[1440px] mx-auto px-4 py-2 flex items-center justify-between">
                <p className="text-xs md:text-sm">👋 Welcome to our store</p>
                <div className="flex gap-4 items-center">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src={FacebookIcon}
                            alt="Facebook"
                            className="w-4 h-4 filter invert"
                        />
                    </a>
                    <a href="https://www.instagram.com/t_shakili" target="_blank" rel="noopener noreferrer">
                        <img
                            src={InstagramIcon}
                            alt="Instagram"
                            className="w-4 h-4 filter invert"
                        />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img
                            src={TwitterIcon}
                            alt="Twitter"
                            className="w-4 h-4 filter invert"
                        />
                    </a>
                    <GoogleTranslate/>
                </div>
            </div>
        </div>
    );
};

export default TopSocialBar;
