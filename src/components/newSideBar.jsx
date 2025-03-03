import React, { useState } from "react";
import styled from "styled-components";

const SidebarWrapper = styled.aside`
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ active }) => (active ? "150px" : "100px")};
  background-color: #2f323a;
  color: #fff;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s ease;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 10px;
  right: -20px;
  background-color: #2f323a;
  border: 1px solid rgb(117, 109, 109);
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 3px;
  color: rgb(188, 186, 186);
  transition: all 0.5 ease;
  display: flex;
  align-items: center;
  justify-content: ${({ active }) => (active ? "flex-start" : "center")};
  &:hover {
    background: rgb(117, 109, 109);
    color: #fff;
  }
  span {
    margin-left: 10px;
    display: ${({ active }) => (active ? "block" : "none")};
  }
`;

export function newSidebar(){
  const [active, setActive] = useState(false);

  return (
    <SidebarWrapper active={active}>
      <div className="logo">
        <i className="bx bx-cube-alt"></i>
      </div>
      <Menu>
        <MenuItem active={active}>
          <i className="bx bx-home-smile"></i>
          <span>Home</span>
        </MenuItem>
        <MenuItem active={active}>
          <i className="bx bx-bar-chart-alt-2"></i>
          <span>Stats</span>
        </MenuItem>
        <MenuItem active={active}>
          <i className="bx bx-message-square-dots"></i>
          <span>Chat</span>
        </MenuItem>
      </Menu>
      <div className="logout">
        <i className="bx bx-log-out"></i>
        <span style={{ display: active ? "block" : "none" }}>Logout</span>
      </div>
      <ToggleButton onClick={() => setActive(!active)}>
        {active ? <i className="bx bxs-left-arrow"></i> : <i className="bx bxs-right-arrow"></i>}
      </ToggleButton>
    </SidebarWrapper>
  );
};
