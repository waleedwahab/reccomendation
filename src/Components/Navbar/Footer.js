import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "./Footer.css";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import MdPhone from "@mui/icons-material/Phone";
import { Chip, Icon, createTheme } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#1f1f1f",
    color: "#bdbdbd",
    padding: theme.spacing(4),
    marginTop: "120px",
    position: "relative",
    left: 0,
    bottom: 0,
    width: "100%",
  },
  footerColumn: {
    marginBottom: theme.spacing(3),
  },
  link: {
    color: "#bdbdbd",
    textDecoration: "none",
    transition: "color 0.3s",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  socialIcon: {
    marginRight: theme.spacing(2),
    color: "#bdbdbd",
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));
const theme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
        },
        icon: {
          marginRight: "0.5rem",
          display: "flex",
          alignItems: "coloumn",
        },
        label: {
          color: "#bdbdbd",
        },
      },
    },
  },
});
function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} className={classes.footerColumn}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>

            <Link to="#" className={classes.link}>
              About Us
            </Link>

            <Link to="#" className={classes.link}>
              Contact Us
            </Link>

            <Link to="#" className={classes.link}>
              Jobs
            </Link>

            <Link to="#" className={classes.link}>
              Help & Support
            </Link>

            <Link to="#" className={classes.link}>
              Advertise On Zameen
            </Link>

            <Link to="#" className={classes.link}>
              Terms Of Use
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={5} className={classes.footerColumn}>
            <Typography variant="h6" gutterBottom>
              Connect
            </Typography>

            <Link href="#" className={classes.link}>
              Blog
            </Link>

            <Link href="#" className={classes.link}>
              News
            </Link>

            <Link href="#" className={classes.link}>
              Forum
            </Link>

            <Link href="#" className={classes.link}>
              Expo
            </Link>

            <Link href="#" className={classes.link}>
              Real Estate Agents
            </Link>

            <Link href="#" className={classes.link}>
              Add Property
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.footerColumn}>
            <Typography variant="h6" gutterBottom>
              Head Office
            </Typography>
            <ThemeProvider theme={theme}>
              <Chip
                icon={<FmdGoodIcon />}
                label="  Pearl One, Gulberg III, Lahore, Pakistan"
              />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Chip icon={<MdPhone />} label="0800-ZAMEEN (92633)" />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Chip
                icon={<AccessTimeIcon />}
                label="Monday To Sunday 9AM To 6PM"
              />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Chip icon={<EmailIcon />} label="Email Us" />
            </ThemeProvider>
          </Grid>
        </Grid>
        <div className={classes.socialIcons}>
          <FacebookIcon className={classes.socialIcon} />
          <TwitterIcon className={classes.socialIcon} />
          <InstagramIcon className={classes.socialIcon} />
          <LinkedInIcon className={classes.socialIcon} />
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
