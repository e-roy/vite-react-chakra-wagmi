import React from "react";
import { useNetwork, useAccount } from "wagmi";
import { Button } from "@chakra-ui/react";
import config from "../../../config.json";

export const SwitchNetwork = () => {
  const [{ data: networkData }, switchNetwork] = useNetwork();

  const [{ data: accountData }] = useAccount();

  if (!accountData) return null;

  const handleSwitch = async () => {
    if (switchNetwork) switchNetwork(config.network.id);
  };

  if (networkData.chain?.id === config.network.id) return null;

  return (
    <Button mr="4" colorScheme="red" size="sm" onClick={() => handleSwitch()}>
      change to network {config.network.id}
    </Button>
  );
};
