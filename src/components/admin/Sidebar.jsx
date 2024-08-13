import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
    const [openProducts, setOpenProducts] = useState(false);

    const handleClick = () => {
        setOpenProducts(!openProducts);
    };

    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <List>
                <ListItem button component={Link} to="/admin/dashboard">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <ImportExportIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                    {openProducts ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openProducts} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to="/admin/products">
                            <ListItemIcon>
                                <PostAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="All" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin/product">
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button component={Link} to="/admin/orders">
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>

                <ListItem button component={Link} to="/admin/users">
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>

                <ListItem button component={Link} to="/admin/reviews">
                    <ListItemIcon>
                        <RateReviewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reviews" />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;
