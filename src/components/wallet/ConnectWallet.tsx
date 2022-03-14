import React, { useEffect, useState } from "react";
import { useConnect, useAccount } from "wagmi";
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Image,
  Link,
  Text,
  Center,
} from "@chakra-ui/react";

import metamaskLogo from "@/images/metamask-logo.png";
import walletConnectLogo from "@/images/walletconnect-logo.png";

export const ConnectWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [
    {
      data: { connector, connectors },
      loading,
    },
    connect,
  ] = useConnect();

  const [{ data: accountData }, disconnect] = useAccount();

  useEffect(() => {
    if (accountData) {
      setIsWalletConnected(true);
    }
  }, [accountData]);

  const handleLogout = async () => {
    if (accountData?.address) {
      disconnect();
      setIsWalletConnected(false);
    }
  };

  const handleConnectWallet = async (x: any) => {
    setIsProcessing(true);

    try {
      await connect(x);
      setIsProcessing(false);
      onClose();
    } catch (e) {
      console.log(e);
      setIsProcessing(false);
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setIsProcessing(false);
    }
  }, [isOpen]);

  return (
    <div>
      {isProcessing ? (
        <Button disabled>Processing...</Button>
      ) : (
        <>
          {!isWalletConnected ? (
            <Button
              onClick={() => {
                onOpen();
                setIsProcessing(true);
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button onClick={() => handleLogout()}>Logout</Button>
          )}
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            {connectors.map((x) => (
              <Box
                key={x.name}
                onClick={() => handleConnectWallet(x)}
                as="button"
                w="100%"
                p="4"
              >
                <Center>
                  {x.name === "MetaMask" && (
                    <Image
                      src={metamaskLogo}
                      boxSize={"100px"}
                      alt="MetaMask"
                    />
                  )}
                  {x.name === "WalletConnect" && (
                    <Image
                      src={walletConnectLogo}
                      boxSize={50}
                      alt="Wallet Connect"
                    />
                  )}
                </Center>
                <Text fontSize="3xl">{x.name}</Text>
                <Text fontSize="2xl">
                  {x.name === "MetaMask" && "Connect to your MetaMask Wallet"}
                  {x.name === "WalletConnect" &&
                    "Scan with WalletConnect to connect"}
                </Text>
                <Text>
                  {!x.ready && " (unsupported)"}
                  {loading && x.name === connector?.name && "…"}
                </Text>
              </Box>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
