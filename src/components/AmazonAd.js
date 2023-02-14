const React = require("react");

export default class AmazonAd extends React.Component {
    constructor(props) {
        super(props);

        this.amazonScript = () => {
            return `<div class="alignleft"> 
                        <script type="text/javascript"> 
                            amzn_assoc_ad_type = "banner"; 
                            amzn_assoc_marketplace = "amazon"; 
                            amzn_assoc_region = "US"; 
                            amzn_assoc_placement = "assoc_banner_placement_default"; 
                            amzn_assoc_campaigns = "kuft"; 
                            amzn_assoc_banner_type = "category"; 
                            amzn_assoc_p = "48"; 
                            amzn_assoc_isresponsive = "false"; 
                            amzn_assoc_banner_id = ID; 
                            amzn_assoc_width = "728"; 
                            amzn_assoc_height = "90"; 
                            amzn_assoc_tracking_id = "reater-20"; 
                            amzn_assoc_linkid = "asoc_linked"; 
                        </script> 
                        <script src="//z-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1"></script> 
                    </div>`;
        };

        this.render = () => {
            return (
                <div>
                    functionality data goes here.... ...
                    <div className="advertisement">
                        <div dangerouslySetInnerHTML={{ __html: this.amazonScript() }}></div>
                    </div>
                </div>
            );
        };
    }
}
