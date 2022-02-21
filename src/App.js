import { useState, useEffect } from "react";
import Header from "./components/Header";
import tokensGif from "./images/banner/tokens.gif";
import CustomMarquee from "./components/common/CustomMarquee";
import Catalog from "./components/Catalog";
import Desc from "./components/Desc";
import Footer from "./components/Footer";
import { ethers } from "ethers";
import Quantity from "./components/common/Quantity";

const NODE_URL = "https://rinkeby-light.eth.linkpool.io/";
const nftAddress = "0x66A736175224240E9754dfd1C69A471ce3702Cb8";

export default function App() {
  const [userAddress, setUserAddress] = useState("");
  const [userNFTs, setUserNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(1);
  const [minted, setMinted] = useState("0");

  const connectWallet = async () => {
    console.log("hola");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);

      window.localStorage.setItem("userAddress", accounts[0]);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      console.log(chainId);

      if (chainId !== "0x4") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }],
        });
      }

      window.ethereum.on("accountsChanged", function (accounts) {
        setUserAddress(accounts[0]);
      });

      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkMinted = async () => {
    let provider = new ethers.providers.JsonRpcProvider(NODE_URL);
    let contractInstance = new ethers.Contract(
      nftAddress,
      ["function totalSupply() public view returns(uint256)"],
      provider
    );
    let supply = await contractInstance.totalSupply();
    if (supply) {
      setMinted(Number(supply));
    }
  };

  const handleMint = async () => {
    setIsLoading(true);
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner(0);

      let contractInstance = new ethers.Contract(
        nftAddress,
        ["function publicSaleMint(uint256 _amount) public payable"],
        signer
      );

      let price = (value * 0.25 * 10 ** 18).toString();

      let tx = await contractInstance.publicSaleMint(value, {
        value: price,
      });

      let receipt = await tx.wait();
      if (receipt) {
        console.log(receipt);
        checkMinted();
      }
    } catch (error) {
      console.log(error, "handleMint");
      if (error.data) {
        window.alert(error.data.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkMinted();
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <div className="banner">
          <h1 className="banner__title">
            INVISIBLE <br /> FRIENDS
          </h1>
          <img src={tokensGif} alt="Tokens" className="banner__gif" />
          <div className="banner__minted">
            <h2 className="banner__minted-value">{minted}/5000</h2>
            <h6 className="banner__minted-title">MINTED</h6>
          </div>
          {userAddress ? (
            <div className="banner__mint">
              <h4 className="banner__mint-title">Amount</h4>
              <Quantity
                className="quantity--mint"
                value={value}
                setValue={setValue}
              />
              <button onClick={handleMint} className="button banner__button">
                Mint
              </button>
            </div>
          ) : (
            <button onClick={connectWallet} className="button banner__button">
              Connect wallet
            </button>
          )}
        </div>
        <CustomMarquee direction="left" />
        <Catalog />
        <CustomMarquee>
          <span>Nice to unsee you ·&nbsp;</span>
          <span>Nice to unsee you ·&nbsp;</span>
          <span>Nice to unsee you ·&nbsp;</span>
          <span>Nice to unsee you ·&nbsp;</span>
          <span>Nice to unsee you ·&nbsp;</span>
          <span>Nice to unsee you ·&nbsp;</span>
          <span>Nice to unsee you ·&nbsp;</span>
          <span>Nice to unsee you ·&nbsp;</span>
          <span>Nice to unsee you ·&nbsp;</span>
          <span>Nice to unsee you ·&nbsp;</span>
        </CustomMarquee>
        <Desc />
      </main>
      <Footer />
    </>
  );
}
