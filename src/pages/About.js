import React from "react";
import SolunarDay from "../components/SolunarDay";
import Adds from "../components/Adds";

const About = () => {
    return (
        <div className="container-fluid">
            <div className="row h-100">
                <div className="col-2">
                    <SolunarDay />
                </div>
                <div className="col-8">
                    <div className="row text-center">
                        <div className="col-12">
                            <h4>What this web-site is all about.</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="bordered-component">
                                <p>
                                    This website is a work-in-progress. I'm a retired software engineer who loves to fish. I prefer flyfishing to any other
                                    approach, but grew up in the mid-west fishing for warm-water species with whatever caught fish and still love a worm under a
                                    bobber or throwing hardware depending on conditions. I fish in the ocean whenever I get the chance where live bait or big
                                    lures are what I usually employ.
                                </p>
                                <p>
                                    So I got a bit frustratede when I was going somewhere I'd never been and couldn't find out what conditions were in local
                                    waters without calling some shop up and sometimes wading past the often ignorant clerk to get to someone who had a clue. I
                                    wondered if there might be a need for a website that would offer local fishing contitions for wherever I wanted to go.
                                </p>
                                <p>
                                    Since I couldn't find such a site I decided to see if I couldn't come up with one. Maybe people would find it useful and I'd
                                    pickup a little income from the ads I'd put there. I decided to make it a wiki-style site where the users were responsible
                                    for creating and consuming the information on the site. After all, I'm retired, I've done my 40 years of sitting at a desk
                                    while the green drakes were hatching and the fish were rising on the Henry's Fork.
                                </p>
                                <p>
                                    So I'm hoping to minimize my maintenance effort so I can fish and still provide something useful to anglers. I'm also hoping
                                    that I won't have to deal with trolls who get off by putting crap on the site. We'll see.
                                </p>
                                <p>Good Luck and tight lines. -- flyfisher</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <Adds />
                </div>
            </div>
        </div>
    );
};

export default About;
