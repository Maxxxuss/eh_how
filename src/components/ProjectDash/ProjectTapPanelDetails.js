import React from 'react';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TabDetailsProDetails from './TabDetails/ProjectDetails';
import ProjectJournal from './TabDetails/ProjectJournal';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: propTypes.node,
  index: propTypes.any.isRequired,
  value: propTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ProjectTabPanelDetails(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Project Details" {...a11yProps(0)} />
          <Tab label="Journal" {...a11yProps(1)} />
          <Tab label="Decisions" {...a11yProps(2)} />
          <Tab label="Risks" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>

        <TabDetailsProDetails
          activeCategorie={props.activeCategorie}
          setCategorie={props.setCategorie}
          editCategorie={props.editCategorie}
          removeCategorie={props.removeCategorie}
          actHistroyCategorie={props.actHistroyCategorie}


        />

      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProjectJournal
          activeCategorie={props.activeCategorie}
          journalExpenses={props.journalExpenses}


        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Decisions
      </TabPanel>
      <TabPanel value={value} index={3}>
        Risks
      </TabPanel>

    </div>
  );
}
