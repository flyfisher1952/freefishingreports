import "../../App.css";
import "./banner.css";
import "bootstrap/dist/css/bootstrap.min.css";
import image0 from "./../../images/pexels-azwar-ipank-1133086.jpg";

const Banner = () => {
    return (
        <div className="banner-container">
            <img className="banner-image" alt="Let's go Fishing" src={image0} />
        </div>
    );
};

export default Banner;
