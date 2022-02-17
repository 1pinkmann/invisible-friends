import Marquee from "react-fast-marquee";

export default function CustomMarquee({ direction = "right", className, children }) {

    return (
        <Marquee direction={direction} gradient={false} className={"marquee " + (className ? className : "")}>
            <div className="marquee__wrapper">
                {children ? children :
                    <>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                        <span>· Minting in February · still hiding in the metaverse&nbsp;</span>
                    </>
                }
            </div>
        </Marquee>
    )
}
