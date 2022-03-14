import React, { useState, useEffect } from "react";
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
  Input,
} from "@chakra-ui/react";
import { useContract, useSigner } from "wagmi";
import GreeterABI from "@/abis/Greeter.json";

// Rinkeby Testnet Contract Address
const contractAddress = "0x7e1D33FcF1C6b6fd301e0B7305dD40E543CF7135";

export const Greeter = () => {
  const [{ data: signerData }] = useSigner();
  const [greeterMsg, setGreeterMsg] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const greeterContract = useContract({
    addressOrName: contractAddress,
    contractInterface: GreeterABI,
    signerOrProvider: signerData,
  });

  // automatically get greeter message on mount
  useEffect(() => {
    if (greeterContract.signer) {
      const getGreeter = async () => {
        const greeter = await greeterContract.greet();
        setGreeterMsg(greeter);
      };
      getGreeter();
    }
  }, [greeterContract]);

  const handleGetGreet = async () => {
    if (greeterContract.signer) {
      const greeter = await greeterContract.greet();
      setGreeterMsg(greeter);
    }
  };

  const handleSetGreet = async () => {
    if (greeterContract.signer) {
      const tx = await greeterContract.setGreeting(userMsg);
      await tx.wait();
      handleGetGreet();
    }
  };

  return (
    <Box
      my="4"
      p="4"
      border="1px"
      borderColor="gray.200"
      rounded="lg"
      boxShadow="lg"
    >
      <Box mb="8">
        <Text fontSize="sm" color="tomato">
          Rinkeby Network Only
        </Text>
        <Text py="2">Greeter Message : {greeterMsg}</Text>
        <Button onClick={() => handleGetGreet()}>
          Refresh Greeter Message
        </Button>
      </Box>

      <div>
        <Text py="2">Set Greeter Meesage</Text>
        <Input
          mb="4"
          type="text"
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          placeholder="type your message"
        />
        <Button onClick={() => handleSetGreet()}>Set Greeter Message</Button>
      </div>
    </Box>
  );
};
