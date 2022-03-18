import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ConnectWallet, SwitchNetwork } from "@/components/wallet";
import { LandingPage } from "@/pages";

import { Box, Flex, Spacer, Heading } from "@chakra-ui/react";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default App;

const AppLayout = () => {
  return (
    <Box m="4">
      <Flex>
        <Box p="2">
          <Heading size="md">App</Heading>
        </Box>
        <Spacer />
        <Box>
          <Flex>
            <SwitchNetwork />
            <ConnectWallet />
          </Flex>
        </Box>
      </Flex>

      <main>
        <Box m="4">
          <Outlet />
        </Box>
      </main>
    </Box>
  );
};
