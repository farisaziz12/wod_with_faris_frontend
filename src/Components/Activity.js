import React from 'react';
import dateFormat from 'dateformat'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './MyActivities.css'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'block', 
      marginLeft: 'auto', 
      marginRight: 'auto'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

export default function Activity(props) {
    const classes = useStyles();
    const  { activity_type, calories_burned, date, name, workout } = props.activity

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading}>{name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <p className='activity-txt'><strong>{dateFormat(date, "fullDate")}</strong></p>
                        <p className='activity-txt'><strong>Type:</strong> {activity_type}</p>
                        <p className='activity-txt'><strong>Calories Burned:</strong> {calories_burned}</p>
                        <p className='activity-txt'><strong>Workout:</strong> {workout.split('\n').map(sentence => (
                        <p className='activity-txt'>{sentence}</p> 
                        ))}</p>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
    </div>
    )
}
