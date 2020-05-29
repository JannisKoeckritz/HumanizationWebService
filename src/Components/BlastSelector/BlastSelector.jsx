import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


const chipsArray = (props) => {
  const classes = useStyles();
  const chipData = props.selectedBlastResults
  console.log(chipData)

  return (
    <div className="blast-selector-container">
      {chipData.map((data) => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <li key={data.key}>
            <Chip
                size="small"
                icon={icon}
                label={data.value}
                onDelete={props.deleteBlastResult(data)}
                className={classes.chip}
            />
          </li>
        );
      })}
        </div>
  );
}

export default chipsArray;