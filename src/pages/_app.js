import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/syne";
import { defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { tooltipTheme } from "components/Tooltip";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { Chain } from "wagmi";

const mantleChain = {
  id: 5001,
  name: 'Mantle',
  network: 'Mantle',
  iconUrl: 'mantle_logo.png',
  iconBackground: '#000',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle',
    symbol: 'BIT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.mantle.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer Testnet', url: 'https://explorer.testnet.mantle.xyz' },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [mantleChain],
  [
    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    components: {
      Tooltip: tooltipTheme,
    },
  });

  return (
    <>
      <Head>
        <title>aimint.fun | mantle </title>

        <link rel="shortcut icon" href="favicon.png" />

        <meta
          name="viewport"
          key="main"
          content="width=device-width, initial-scale=1.0"
        />

        <meta
          name="title"
          content="AI Mint x Mantle — generative art meets digital wallets"
        />
        <meta
          name="description"
          content="ai creativity meets web3, mint gasless nft's on mantle chain"
        />

        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:url" content="https://mantle.aimint.fun/" key="og-url" />
        <meta
          property="og:title"
          content="AI Mint x Mantle — generative art meets digital wallets"
          key="og-title"
        />
        <meta
          property="og:description"
          content="ai creativity meets web3, mint gasless nft's on mantle chain"
          key="og-desc"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/V26PQnX/aimint-mantle.png"
          key="og-image"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://aimint.fun/"
          key="twt-url"
        />
        <meta
          property="twitter:title"
          content="AI Mint x Mantle — generative art meets digital wallets"
          key="twt-title"
        />
        <meta
          property="twitter:description"
          content="ai creativity meets web3, mint gasless nft's on mantle chain"
          key="twt-desc"
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/V26PQnX/aimint-mantle.png"
          key="twt-img"
        />
      </Head>
      <div>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-SC89JTD45T"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SC89JTD45T');
        `}
        </Script>
      </div>

      <ChakraProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={lightTheme({
              accentColor: "#EDF2F7",
              accentColorForeground: "black",
              borderRadius: "small",
              fontStack: "system",
            })}
            coolMode
          >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
