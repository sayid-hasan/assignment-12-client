import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CiCalendar, CiMenuBurger } from "react-icons/ci";
import { FaBook, FaHome, FaList, FaSchool, FaUsers } from "react-icons/fa";
import { MdContactMail, MdOutlinePayment, MdShoppingBag } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const drawerWidth = 270;
const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // TDO : get admin value from database
  const [isAdmin] = useAdmin();
  // refetch();
  console.log(isAdmin);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div className="bg-[#D1A054] min-h-svh font-Cinzel p-5">
      <Toolbar>
        <Typography
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { xs: "block", sm: "block" },
            textAlign: "left",
          }}
        >
          <span className="uppercase font-Cinzel">
            {" "}
            <span className="  text-lg leading-[31px] md:text-2xl  font-black">
              AwsScholar
            </span>{" "}
            <br />
            <span className="text-base mt-[3px] font-bold tracking-[7px] leading-[24px]">
              find your Desire
            </span>
          </span>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {isAdmin ? (
          <>
            {" "}
            {/* adminhome */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/adminprofile"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaHome></FaHome>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Admin Profile
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* Add schoalrship */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/addscholarship"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaSchool></FaSchool>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    add Schoalarship
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* manage Schoalarship */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/manageSchoalarships"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaList></FaList>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    manage Schoalarship
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/*manageappliedApplications */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/manageappliedApplications"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaBook></FaBook>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Manage Applied Applications
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* Manage Users*/}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/manageusers"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaUsers></FaUsers>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Manage Users
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* Manage Reviews*/}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/manageReviews"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaUsers></FaUsers>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    Manage Reviews
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
          </>
        ) : (
          <>
            {" "}
            {/* my profile /userhome*/}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/userhome"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <FaHome></FaHome>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    My Profile
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* myapplications */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/myapplications"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <CiCalendar></CiCalendar>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    My Applications
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
            {/* My Reviews */}
            <ListItem>
              <NavLink
                style={({ isActive }) => {
                  return isActive ? { color: "white" } : {};
                }}
                to="/dashboard/myreviews"
              >
                <ListItemButton
                  sx={{
                    display: "flex",
                    gap: "15px",
                    textDecoration: "uppercase",
                  }}
                >
                  <span className="text-2xl">
                    <MdOutlinePayment></MdOutlinePayment>
                  </span>
                  <span className="font-Cinzel  text-base font-bold leading-[22px]">
                    My Reviews
                  </span>
                </ListItemButton>
              </NavLink>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <List>
        {/* Home */}
        <ListItem>
          <NavLink
            style={({ isActive }) => {
              return isActive ? { color: "white" } : {};
            }}
            to="/"
          >
            <ListItemButton
              sx={{ display: "flex", gap: "15px", textDecoration: "uppercase" }}
            >
              <span className="text-2xl">
                <FaHome></FaHome>
              </span>
              <span className="font-Cinzel  text-base font-bold leading-[22px]">
                Home
              </span>
            </ListItemButton>
          </NavLink>
        </ListItem>
        {/* all Scholarship */}
        <ListItem>
          <NavLink
            style={({ isActive }) => {
              return isActive ? { color: "white" } : {};
            }}
            to="/"
          >
            <ListItemButton
              sx={{ display: "flex", gap: "15px", textDecoration: "uppercase" }}
            >
              <span className="text-2xl">
                <CiMenuBurger></CiMenuBurger>
              </span>
              <span className="font-Cinzel  text-base font-bold leading-[22px]">
                menu
              </span>
            </ListItemButton>
          </NavLink>
        </ListItem>
        {/* shop */}
        <ListItem>
          <NavLink
            style={({ isActive }) => {
              return isActive ? { color: "white" } : {};
            }}
            to="/"
          >
            <ListItemButton
              sx={{ display: "flex", gap: "15px", textDecoration: "uppercase" }}
            >
              <span className="text-2xl">
                <MdShoppingBag></MdShoppingBag>
              </span>
              <span className="font-Cinzel  text-base font-bold leading-[22px]">
                shop
              </span>
            </ListItemButton>
          </NavLink>
        </ListItem>

        {/* contact */}
        <ListItem>
          <NavLink
            style={({ isActive }) => {
              return isActive ? { color: "white" } : {};
            }}
            to="/dashboard/cart"
          >
            <ListItemButton
              sx={{ display: "flex", gap: "15px", textDecoration: "uppercase" }}
            >
              <span className="text-2xl">
                <MdContactMail></MdContactMail>
              </span>
              <span className="font-Cinzel  text-base font-bold leading-[22px]">
                contact
              </span>
            </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#F6F6F6", padding: "20px" }}>
      <Toolbar
        sx={{ position: "absolute", top: "10px", left: "10px", zIndex: "1000" }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{}}
        >
          <CiMenuBurger />
        </IconButton>
      </Toolbar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,

          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default Dashboard;
