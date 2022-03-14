import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
// import logo from "./logo.svg";
import { ConnectWallet } from "@/components/wallet";
import { LandingPage } from "@/pages";

import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";

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
      <Box className="">
        <ConnectWallet />
      </Box>
      <main>
        <Box m="4">
          <Outlet />
        </Box>
      </main>
    </Box>
  );
};
