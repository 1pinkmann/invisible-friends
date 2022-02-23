import { useState, useEffect } from "react";
import Header from "./components/Header";
import tokensGif from "./images/banner/tokens.gif";
import CustomMarquee from "./components/common/CustomMarquee";
import Catalog from "./components/Catalog";
import Desc from "./components/Desc";
import Footer from "./components/Footer";
import { ethers } from "ethers";
import Quantity from "./components/common/Quantity";
import ConnectPopup from "./components/ConnectPopup";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

const NODE_URL = "https://rinkeby-light.eth.linkpool.io/";
const nftAddress = "0xD2B7D5acCD7EAA79b54967dff9247D791aB300cc";
// const nftAddress = "0x66A736175224240E9754dfd1C69A471ce3702Cb8";
let ABI = [
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "publicSaleMint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export default function App() {
  const [userAddress, setUserAddress] = useState("");
  const [userNFTs, setUserNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [walletType, setWalletType] = useState("");
  const [popupShowed, setPopupShowed] = useState(false);
  const [value, setValue] = useState(1);
  const [minted, setMinted] = useState("1468");

  const connectMetamask = async () => {
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
      setPopupShowed(false);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletConnect = async () => {
    try {
      console.log("hola");
      const provider = new WalletConnectProvider({
        rpc: {
          1: NODE_URL,

          // 97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        chainId: 1,
        infuraId: null,
      });

      await provider.enable();
      const web3 = new Web3(provider);

      // const accounts = await ethers.listAccounts();
      const accounts = await web3.eth.getAccounts();

      setUserAddress(accounts[0]);
      setWalletType("WALLET_CONNECT");
      setPopupShowed(false);
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
      let provider;
      let signer;
      let contractInstance;
      let price = (value * 0.25 * 10 ** 18).toString();
      let receipt;

      if (walletType === "WALLET_CONNECT") {
        provider = new WalletConnectProvider({
          rpc: {
            1: NODE_URL,
          },
        });

        await provider.enable();
        let web3 = new Web3(provider);

        contractInstance = new web3.eth.Contract(ABI, nftAddress);

        receipt = await contractInstance.methods
          .publicSaleMint(value)
          .send({ from: userAddress, value: price });
      } else {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner(0);

        contractInstance = new ethers.Contract(
          nftAddress,
          ["function publicSaleMint(uint256 _amount) public payable"],
          signer
        );
        let tx = await contractInstance.publicSaleMint(value, {
          value: price,
        });
        receipt = await tx.wait();
      }

      if (receipt) {
        console.log(receipt);
        setMinted(minted + 1);
        // checkMinted();
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
    // checkMinted();
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
            <button
              onClick={() => setPopupShowed(true)}
              className="button banner__button"
            >
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
      <ConnectPopup
        connectMetamask={connectMetamask}
        connectWalletConnect={connectWalletConnect}
        popupShowed={popupShowed}
        setPopupShowed={setPopupShowed}
        className="popup--connect"
      />
    </>
  );
}
